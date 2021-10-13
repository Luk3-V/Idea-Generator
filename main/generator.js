const fs = require('fs');
const pluralize = require('pluralize');
const { promptCategories, promptData} = require('./promptData');
const {nounCategories, nounData} = require('./nounData');
const {adjectiveCategories, adjectiveData} = require('./adjectiveData');
const {verbCategories, verbData} = require('./verbData');

let categories = {};
let recently_used = [];

// Store list of entries by category name 
module.exports.load = () => {
	for(let i = 0; i < promptCategories.length; i ++) {
		name = promptCategories[i];
		categories[name] = getCategory(name, 'prompt');
	}
	for(let i = 0; i < nounCategories.length; i ++) {
		name = nounCategories[i];
		categories[name] = getCategory(name, 'noun');
	}
	for(let i = 0; i < adjectiveCategories.length; i ++) {
		name = adjectiveCategories[i];
		categories[name] = getCategory(name, 'adj');
	}
	for(let i = 0; i < verbCategories.length; i ++) {
		name = verbCategories[i];
		categories[name] = getCategory(name, 'verb');
	}
}

// Generate prompt by picking a random template, then filled in by fillInTemplate()
// Then returning prompt in HTML
module.exports.generate = (settings) => { 
	let template = pickRandom('template', null, 1);
	let result = fillInTemplate(template, settings)+'<br>';
	if(settings.style != 0) {
		let style = fillInTemplate('In !a {style} art style.', settings);
		result += '<br>'+style;
	}
	if(settings.tech != 0) {
		let tech = fillInTemplate('Using {technique}.', settings);
		result += '<br>'+tech;
	}
	return result;
}

// Recursively fill in template parameters with random items, 
// fill in correct indefinite article
function fillInTemplate(template, settings) {
	// substitute '{category}' w/ a call to the appropriate generate function
	if (template.includes('{')) {
		let category = getTextBetweenTags(template, '{', '}');
		let args = getTextBetweenTags(category, '(', ')');
		let plural = false;
		let replacement = 'NULL';

		if(args) {
			category = category.substr(0, category.indexOf('('));
		}
		if(category.charAt(0) == '*') {
			category = category.replace('*', '');
			plural = true;
		}

		switch (category) {
			case 'style':
				replacement = generateItem(category, null, settings.style);
				break;
			case 'technique':
				replacement = generateItem(category, null, settings.tech);
				break;

			case 'NP':
			case 'PP':
			case 'AP':
			case 'VP':	
				replacement = generateItem(category, args, 1);
				break;
		}

		if(nounCategories.includes(category)) 
			replacement = generateItem(category, null, settings.noun);
		else if(adjectiveCategories.includes(category))
			replacement = generateItem(category, null, settings.adj);
		else if(verbCategories.includes(category))
			replacement = generateItem(category, args, settings.verb);

		if(plural)
			replacement = pluralize(replacement);

		template = replaceTextBetweenTags(template, replacement, '{', '}');
		
		return fillInTemplate(template, settings); // recursively fill all generators
	}

	// replace '(a)' w/ appropriate indefinite article based on context
	if (template.includes('!a')) {
		let word = template.substring(template.indexOf('!a') + 2);
		let replacement = indefiniteArticle(word);
		template = replaceTextBetweenTags(template, replacement, '!', 'a');

		return fillInTemplate(template, settings);
	}

	return template;
}

// ---------------------------------- GENERATORS -----------------------------------

// Generates random item using category & complexity
// Includes link if there is one
function generateItem(category, args, complexity){
	var text = pickRandom(category, args, complexity);
	if(text.includes('=')) {
		var link = text.substr(text.indexOf('= ')+1);
		text = text.substr(0,text.indexOf('= ')-1).trim();

		text = '<a href=' + link + ' target=\'_blank\'>' + text + '</a>';
	}
	return text;
}

// ------------------------------------ UTILITY ------------------------------------

// Returns list of lines between #category_name: and #end from data files
function getCategory(category_name, type) {
	let start_tag = `#${category_name}:\n`;
	let end_tag = '\n#end';

	if(type == 'noun' || type == 'adj' || type == 'verb')
		return fs.readFileSync(__dirname+'/data/'+type+'/'+category_name+'.txt', 'utf-8').split('\n');

	return getTextBetweenTags(promptData, start_tag, end_tag).split('\n');
}

// Returns random entry in list w/ less or equal complexity
// Except for template complexity 2+ which ignores complexity 1
function pickRandom(category_name, args, complexity) {
	let category = categories[category_name];
	let random_index = -1; 
	let result = "NULL";
	
	while(random_index == -1) {
		let temp = Math.floor(Math.random() * category.length);
		if(category_name == 'template' && category[temp].charAt(0) != complexity){
			continue;
		}
		if(args){
			if(category[temp].charAt(0) <= complexity && category[temp].includes('<'+args+'>')) {
				random_index = temp				
			}
		} else {
			if(category[temp].charAt(0) <= complexity) {
				random_index = temp
			}
		}
	}

	if(args)
		result = category[random_index].substr(category[random_index].indexOf('>')+1).trim();
	else
		result = category[random_index].substr(2).trim();

	
	
	return resolveOptions(result);
}

// Replace comma-separated entries inside square brackets with random entry
function resolveOptions(text) {
	if (text.includes('[')) {
		let options = getTextBetweenTags(text, '[', ']');
		let option = pickRandomFromList(options.split(','));
		text = replaceTextBetweenTags(text, option, '[', ']');
		
		return resolveOptions(text); // recursively fill all options
	}
	return text;
}

function pickRandomFromList(list) {
	let random_index = Math.floor(Math.random() * list.length); 
	return list[random_index];
}

// Note: must handle start and end tags being identical
function getTextBetweenTags(text, start_tag, end_tag) {
	if(text.includes(start_tag))
		return text.split(start_tag)[1].split(end_tag)[0];
	else
		return null;
}

function replaceTextBetweenTags(text, replacement, start_tag, end_tag) {
	let start_index = text.indexOf(start_tag);
	let end_index = start_index + text.substr(start_index + 1).indexOf(end_tag);
	return text.substr(0, start_index) + replacement + text.substr(end_index + 2);
}

// Returns indefinite article for given word.
// TODO: Exceptions for certain words.
function indefiniteArticle(word) {
	word = word.trim();

	// exceptions:
	if (word.startsWith('Ukiyo')) {
		return 'a';
	}
	// return 'an' word starts with vowel, otherwise 'a'
	let vowels = 'aeiou';
	if (vowels.includes(word[0].toLowerCase())) {
		return 'an';
	}
	
	return 'a';
}