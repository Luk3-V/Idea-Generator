const fs = require('fs');
const pluralize = require('pluralize');
const { promptCategories, promptData} = require('./promptData');
const {nounCategories, nounData} = require('./nounData');
const {adjectiveCategories, adjectiveData} = require('./adjectiveData');
const {verbCategories, verbData} = require('./verbData');

let categories = {}; // list, 1, 2, 3 (all lists)
let phrases = {}; // str, 1, 2, 3 (all values)
//let recently_used = [];

// Store list of category & phrase objects
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

	//load phrase data
	for(phrase of categories['AP'].list){
		let args = getTextBetweenTags(phrase,'<','>');
		let call = 'AP('+args+')';
		phrases[call] = {};

		count = getCount(phrase);
		phrases[call].str = phrase;
		phrases[call]['1'] = count[0]
		phrases[call]['2'] = count[1]
		phrases[call]['3'] = count[2]
	}
	for(phrase of categories['NP'].list){
		let args = getTextBetweenTags(phrase,'<','>');
		let call = 'NP('+args+')';
		phrases[call] = {};

		count = getCount(phrase);
		phrases[call].str = phrase;
		phrases[call]['1'] = count[0]
		phrases[call]['2'] = count[1]
		phrases[call]['3'] = count[2]
	}
	console.log(phrases);

	/*for(t of categories['template'].list){
		let i = 0;
		while(t.includes('[', i)){
			let start = i;
			i = t.indexOf(']', i);
			let options = getTextBetweenTags(t.substr(start,i+1), '[', ']').split(',');
			for(o of options){
				phrases[o] = getPhrase(o);
			}
		}
	}*/
}

// Generate prompt by picking a random template, then filled in by fillInTemplate()
// Then returning prompt in HTML
module.exports.generate = (settings) => { 
	let template = pickRandom('template', null, 1);
	let result = fillInTemplate(template, settings)+'<br>';
	result = capitalizeFirst(result);
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


// ---------------------------------- GENERATORS -----------------------------------

// Recursively fill in template parameters with random items, 
// fill in correct indefinite article
function fillInTemplate(template, settings) {
	// substitute '{category}' w/ a call to the appropriate generate function
	if (template.includes('{')) {
		let category = getTextBetweenTags(template, '{', '}').split(',');
		let args = null; 
		let plural = false;
		let combine = false;
		let replacement = 'NULL';

		if(category.length == 1){  // SINGLE CATEGORY
			category = category[0];
			args = getTextBetweenTags(category, '(', ')');


			if(category.charAt(0) == '*') {
				category = category.replace('*', '');
				plural = true;
			}
			if(args) {
				category = category.substr(0, category.indexOf('('));
			}

			switch (category) {
				case 'style':
					replacement = generateItem(category, null, settings.style);
					break;
				case 'technique':
					replacement = generateItem(category, null, settings.tech);
					break;

				case 'NP':
				case 'AP':
					replacement = generatePhrase(category, args);
					break;
				case 'PP':
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
		}
		else { // COMBINED CATEGORIES
			if(category[0].charAt(0) == '*') {
				category[0] = category[0].replace('*', '');
				plural = true;
			}

			replacement = generateFromCombined(category);
		}

		
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


function generatePhrase(category, args){
	var text = phrases[category+'('+args+')'].str;
	text = text.substr(text.indexOf('>')+2);

	return resolveOptions(text, 1);
}

// Generates random item using category & complexity
// Includes link if there is one
function generateFromCombined(category_names){
	//console.log(category_names.toString());
	if(!(category_names.toString() in categories)) { // if combined list doesnt exist, create one
		let combined = {};
		combined['1'] = [];
		combined['2'] = [];
		combined['3'] = [];

		for (const c of category_names) {
			combined['1'] = combined['1'].concat(categories[c.trim()]['1']);
			combined['2'] = combined['2'].concat(categories[c.trim()]['2']);
			combined['3'] = combined['3'].concat(categories[c.trim()]['3']);
		}
		combined['2'] = combined['2'].concat(combined['1']);
		combined['3'] = combined['3'].concat(combined['2']);
		//console.log(list);
		categories[category_names.toString()] = combined;
	}

	var text = pickRandom(category_names.toString(), null, 1);
	if(text.includes('=')) {
		var link = text.substr(text.indexOf('= ')+1);
		text = text.substr(0,text.indexOf('= ')-1).trim();

		text = '<a href=' + link + ' target=\'_blank\'>' + text + '</a>';
	}
	return text;
}

// ------------------------------------ UTILITY ------------------------------------

// Returns category object of the lines between #category_name: and #end from data files
function getCategory(category_name, type) {
	let start_tag = `#${category_name}:\n`;
	let end_tag = '\n#end';
	let category = {};

	if(type == 'noun' || type == 'adj' || type == 'verb'){
		let list = fs.readFileSync(__dirname+'/data/'+type+'/'+category_name+'.txt', 'utf-8').split('\n');
		category['list'] = list;
	}
	else {
		category['list'] = getTextBetweenTags(promptData, start_tag, end_tag).split('\n');
	}

	let split = splitList(category['list']);
	category['1'] = split[0];
	category['2'] = split[1];
	category['3'] = split[2];

	return category;
}

// Returns line count for each complexity of phrase
function getCount(phrase){
	let count = [1,1,1];

	while(phrase.includes('{')) {
		if(phrase.includes('[')) {
			let options = getTextBetweenTags(phrase, '[', ']').split(',');
			let optionsCount = [0,0,0];

			for(o of options) {
				let temp = getCount(o);
				optionsCount[0] += temp[0];
				optionsCount[1] += temp[1];
				optionsCount[2] += temp[2];
			}
			count[0] *= optionsCount[0];
			count[1] *= optionsCount[1];
			count[2] *= optionsCount[2];

			phrase = phrase.substr(phrase.indexOf((']')+1));
		} else {	
			let category = getTextBetweenTags(phrase, '{', '}').split(',');
			let args = null; 
			let plural = false;
			//console.log(category);

			if(category.length == 1){  // SINGLE CATEGORY
				category = category[0];
				args = getTextBetweenTags(category, '(', ')');

				if(category.charAt(0) == '*') {
					category = category.replace('*', '');
					plural = true;
				}

				switch(category.substr(0,2)) {
					case 'NP':
					case 'AP':
						count[0] *= phrases[category]['1'];
						count[1] *= phrases[category]['2'];
						count[2] *= phrases[category]['3'];
						break;
				}
				if(Object.keys(categories).includes(category)){
					count[0] *= categories[category]['1'].length;
					count[1] *= categories[category]['2'].length;
					count[2] *= categories[category]['3'].length;
				}
			}
			else { // COMBINED CATEGORIES
				if(category[0].charAt(0) == '*') {
					category[0] = category[0].replace('*', '');
					plural = true;
				}
				if(!(category.toString() in categories)){
					generateFromCombined(category); // change to loadCombined?
				}

				count[0] *= categories[category.toString()]['1'].length;
				count[1] *= categories[category.toString()]['2'].length;
				count[2] *= categories[category.toString()]['3'].length;
			}

			phrase = phrase.substr(phrase.indexOf(('}')+1));
		}
	}

	return count;
}

// Returns list split by max complexity
function splitList(list) {
	let split = [[],[],[]];
	for(l of list) {
		if(l.charAt(0) == '1'){
			split[0].push(l);
			split[1].push(l);
			split[2].push(l);
		}
		if(l.charAt(0) == '2'){
			split[1].push(l);
			split[2].push(l);
		}
		if(l.charAt(0) == '3')
			split[2].push(l);
	}

	return split;
}

// Returns random entry in list w/ less or equal complexity
// Except for template complexity 2+ which ignores complexity 1
function pickRandom(category_name, args, complexity) {
	let category = categories[category_name][complexity.toString()];
	let random_index = -1; 
	let result = "NULL";
	//console.log(category);
	
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
			//console.log(temp + " " + category[temp]);
			if(category[temp].charAt(0) <= complexity) {
				random_index = temp
			}
		}
	}

	if(args)
		result = category[random_index].substr(category[random_index].indexOf('>')+1).trim();
	else
		result = category[random_index].substr(2).trim();

	
	
	return resolveOptions(result, complexity);
}

// Replace comma-separated entries inside square brackets with random entry 
// based on the count of each option
function resolveOptions(text, complexity) {
	if (text.includes('[')) {
		let options = getTextBetweenTags(text, '[', ']').split(',');
		let count = [];
		let total = 0;
		for(o of options){
			let temp = getCount(o)[complexity-1];
			count.push(temp);
			total += temp;
		}

		let random = Math.random()*total;
		let sum = 0; 
		for(c in count){
			sum += count[c];
			if(random < sum){
				text = replaceTextBetweenTags(text, options[c], '[', ']');	
				return resolveOptions(text); // recursively fill all options
			}
		}
		console.log('ERROR: resolveOptions');	
	}
	return text;
}

function pickRandomFromList(list) {
	// let options, amounts = fillInList(list);
	// pick random option based on array of amounts
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

function capitalizeFirst(string) {
	string = string.trim();
	return string.charAt(0).toUpperCase() + string.slice(1);
}