
let categories = {};
let recently_used = [];

window.onload = function onLoad() {
	// Store list of entries by category name
	for (let i = 0; i < category_names.length; i ++) {
		name = category_names[i];
		categories[name] = getCategory(name);
	}

}

function generate() {
	//reset();
	//let template = pickRandom('template');
	//let result = fillInTemplate(template);
	//result = formatOutput(result);
	let style = pickRandom("single-style", getStyleValue());
	let tech = pickRandom("technique", getTechValue());
	document.getElementById("style").innerHTML = style[0];
	document.getElementById("style").href = style[1];
	document.getElementById("technique").innerHTML = tech[0];
	document.getElementById("technique").href = tech[1];
}

// ------------------------------------ UTILITY ------------------------------------

// Returns list of lines between #category_name: and #end in the data file
function getCategory(category_name) {
	let start_tag = `#${category_name}:\n`;
	let end_tag = '\n#end';
	return getTextBetweenTags(data, start_tag, end_tag).split('\n');
}

// Returns random word & link in list
function pickRandom(category_name, complexity) {
	let category = categories[category_name];
	let random_index = -1; 
	
	while(random_index == -1) {
		let temp = Math.floor(Math.random() * category.length);
		if(category[temp].charAt(0) <= complexity) {
			random_index = temp
		}
	}

	var result = category[random_index];
	var link = result.substr(result.indexOf('= ')+1)
	result = result.substr(2,result.indexOf(' ', 2))

	// Avoid duplicates:
	/*let max_iterations = 5;
	for (let i = 0; i < max_iterations; i ++) {
		var result = resolveOptions(category[random_index]);
		if (recently_used.includes(result)) {
			random_index = (random_index + 1) % category.length;
		}
		else {
			recently_used.push(result);
			break;
		}
	}*/
	return [result, link];
}

function getTextBetweenTags(text, start_tag, end_tag) {
	return text.split(start_tag)[1].split(end_tag)[0];
}