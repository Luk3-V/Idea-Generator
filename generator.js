
let categories = {};
let recently_used = [];

// Store list of entries by category name
window.onload = function onLoad() {
	for (let i = 0; i < category_names.length; i ++) {
		name = category_names[i];
		categories[name] = getCategory(name);
	}
}

function generate() {
	//reset();
	let template = pickRandom('template', 1);
	let result = fillInTemplate(template);
	document.getElementById("result").innerHTML = result;
	//result = formatOutput(result);
	//document.getElementById("style").innerHTML = style[0];
	//document.getElementById("style").href = style[1];
	//document.getElementById("technique").innerHTML = tech[0];
	//document.getElementById("technique").href = tech[1];
}

function fillInTemplate(template) {
	// replace '@category@' w/ a call to the appropriate generate function
	if (template.includes('@')) {
		let category = getTextBetweenTags(template, '@', '@');
		let replacement = 'NaN';
		//let generator = command.split(':')[0];
		// let parameters = [];
		//if (command.includes(':')) {
		//	parameters = command.split(':')[1].split(',');
		//}
		switch (category) {
			case 'single-style':
				replacement = generateLink(category, getStyleValue());
				break;
			case 'technique':
				replacement = generateLink(category, getTechValue());
				break;
		}

		template = replaceTextBetweenTags(template, replacement, '@', '@');
		
		return fillInTemplate(template); // recursively fill all generators
	}

	// replace '<a>' w/ appropriate indefinite article based on context
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

function generateLink(category, complexity) {
	var text = pickRandom(category, complexity);
	var link = text.substr(text.indexOf('= ')+1);
	text = text.substr(0,text.indexOf(' ', 2)).trim();

	text = '<a href=' + link + '>' + text + '</a>';

	return text;
}

// ------------------------------------ UTILITY ------------------------------------

// Returns list of lines between #category_name: and #end in the data file
function getCategory(category_name) {
	let start_tag = `#${category_name}:\n`;
	let end_tag = '\n#end';
	return getTextBetweenTags(data, start_tag, end_tag).split('\n');
}

// Returns random entry in list
function pickRandom(category_name, complexity) {
	let category = categories[category_name];
	let random_index = -1; 
	
	while(random_index == -1) {
		let temp = Math.floor(Math.random() * category.length);
		if(category[temp].charAt(0) <= complexity) {
			random_index = temp
		}
	}

	var result = resolveOptions(category[random_index].substr(2));

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
