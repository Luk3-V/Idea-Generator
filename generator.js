let categories = {};
let recently_used = [];

// Store list of entries by category name 
window.onload = function onLoad() {
	for (let i = 0; i < category_names.length; i ++) {
		name = category_names[i];
		categories[name] = getCategory(name);
	}
}

// Generate prompt by picking a random template, then filled in by fillInTemplate()
// Then returning prompt in HTML
function generate() {
	let template = pickRandom('template', getPromptValue());
	let result = fillInTemplate(template)+'<br>';
	if(getStyleToggle()) {
		let style = fillInTemplate('In (a) {style} art style.');
		result += '<br>'+style;
	}
	if(getTechToggle()) {
		let tech = fillInTemplate('Using {technique}.');
		result += '<br>'+tech;
	}
	document.getElementById("result").innerHTML = result;
	/*if(getToggleValue()) {
		let template = pickRandom('template2', getPromptValue());
		let result = fillInTemplate(template);
		document.getElementById("result").innerHTML = result;
	} else {
		let template = pickRandom('template1', getPromptValue());
		let result = fillInTemplate(template);
		document.getElementById("result").innerHTML = result;
	}*/
}

// Recursively fill in template parameters with random items, 
// fill in correct indefinite article
function fillInTemplate(template) {
	// substitute '{category}' w/ a call to the appropriate generate function
	if (template.includes('{')) {
		let category = getTextBetweenTags(template, '{', '}');
		let replacement = 'NaN';

		switch (category) {
			case 'style':
				replacement = generateItem(category, getStyleValue());
				break;
			case 'technique':
				replacement = generateItem(category, getTechValue());
				break;

			case 'NP':
			case 'AP':
			case 'PP':
			case 'VP':
				replacement = generateItem(category, 1);
				break;
			case 'object':
			case 'person':
			case 'animal':
			case 'setting':
				replacement = generateItem(category, getNounValue());
				break;
			case 'adjective':
				replacement = generateItem(category, getAdjValue());
				break;
			case 'verb':
				replacement = generateItem(category, getVerbValue());
				break;
		}

		template = replaceTextBetweenTags(template, replacement, '{', '}');
		
		return fillInTemplate(template); // recursively fill all generators
	}

	// replace '(a)' w/ appropriate indefinite article based on context
	if (template.includes('(')) {
		let word = template.substring(template.indexOf(')') + 2);
		let replacement = indefiniteArticle(word);
		template = replaceTextBetweenTags(template, replacement, '(', ')');
		
		return fillInTemplate(template); // recursively fill all commands
	}

	// replace '(v1, v2)' w/ conjugation of verb based on category being singular or plural.
	//if (template.includes('(')) {
	//	let options_list = getTextBetweenTags(template, '(', ')').split(',');
	//	let index = (character_is_group)?1:0;
	//	let option = options_list[index].trim();

	//	template = replaceTextBetweenTags(template, option, '(', ')');
	//	return fillInTemplate(template)
	//}

	return template;
}

// ---------------------------------- GENERATORS -----------------------------------

// Generates random item using category & complexity
// Includes link if there is one
function generateItem(category, complexity){
	var text = pickRandom(category, complexity);
	if(text.includes('=')) {
		var link = text.substr(text.indexOf('= ')+1);
		text = text.substr(0,text.indexOf('= ')-1).trim();

		text = '<a href=' + link + ' target=\'_blank\'>' + text + '</a>';
	}
	return text;
}

// ------------------------------------ UTILITY ------------------------------------

// Returns list of lines between #category_name: and #end from data files
function getCategory(category_name) {
	let start_tag = `#${category_name}:\n`;
	let end_tag = '\n#end';

	switch(category_name) {
		case 'object':
		case 'person':
		case 'animal':
		case 'setting':
			return getTextBetweenTags(nounData, start_tag, end_tag).split('\n');
		case 'adjective':
			return getTextBetweenTags(adjectiveData, start_tag, end_tag).split('\n');
		case 'verb':
			return getTextBetweenTags(verbData, start_tag, end_tag).split('\n');
	}

	return getTextBetweenTags(data, start_tag, end_tag).split('\n');
}

// Returns random entry in list w/ less or equal complexity
// Except for template complexity 2+ which ignores complexity 1
function pickRandom(category_name, complexity) {
	let category = categories[category_name];
	let random_index = -1; 
	
	while(random_index == -1) {
		let temp = Math.floor(Math.random() * category.length);
		if(category[temp].charAt(0) <= complexity) {
			random_index = temp
		}
	}

	var result = resolveOptions(category[random_index].substr(2).trim());  //-------------------- NOTE: only used for template?

	return result;
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
	return text.split(start_tag)[1].split(end_tag)[0];
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
	if (vowels.includes(word[0])) {
		return 'an';
	}
	
	return 'a';
}