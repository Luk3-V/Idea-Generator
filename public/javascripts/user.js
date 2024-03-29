// Generate Button
let generateBtn = document.getElementById('generateButton')

generateBtn.onclick = async function() {
	let settings =
 		"prompt=" + getPromptValue() +
 		"&style=" +((getStyleToggle()) ? getStyleValue() : 0) +
 		"&tech=" + ((getTechToggle()) ? getTechValue() : 0)  +
 		"&noun=" + getWordValue() +
 		"&adj=" + getWordValue() +
 		"&verb=" + getWordValue();
	const response = await fetch('/generate?' + settings);
	const data = await response.json();
	document.getElementById("result").innerHTML = data;
}


// Prompt Complexity
let prompt = document.getElementById("promptRange");
let promptValue = document.getElementById("promptValue");

prompt.oninput = function() {
  promptValue.innerHTML = this.value;
}

function getPromptValue() {
	return prompt.value
}

// Style Complexity
let style = document.getElementById("styleRange");
let styleValue = document.getElementById("styleValue");

style.oninput = function() {
  styleValue.innerHTML = this.value;
}

function getStyleValue() {
	return style.value
}

// Technique Complexity
let tech = document.getElementById("techRange");
let techValue = document.getElementById("techValue");

tech.oninput = function() {
  techValue.innerHTML = this.value;
}

function getTechValue() {
	return tech.value
}

//Word Complexity
let word = document.getElementById("wordRange");
let wordValue = document.getElementById("wordValue");

word.oninput = function() {
  wordValue.innerHTML = this.value;
}

function getWordValue() {
	return word.value
}


// Basic Complexity
let basic = document.getElementById("basicRange");
let basicValue = document.getElementById("basicValue");
basicValue.innerHTML = basic.value;

basic.oninput = function() {
  basicValue.innerHTML = this.value;
  prompt.value = this.value;
}

function getBasicValue() {
	return basic.value
}



// Update HTML when switching tabs
let basicTab = document.getElementById("basicTab");
let advancedTab = document.getElementById("advancedTab");

basicTab.onclick = function() {
	basicValue.innerHTML = basic.value;
	prompt.value = basic.value;
}
advancedTab.onclick = function() {
	promptValue.innerHTML = prompt.value;
	styleValue.innerHTML = style.value;
	techValue.innerHTML = tech.value;
	wordValue.innerHTML = word.value;
}

// Style Toggle
let styleToggle = true;
//styleRange.setAttribute("disabled", "");
//styleRange.setAttribute("style", "opacity + 0.4;");
//styleLabel.setAttribute("style", "opacity + 0.4;");

$(document).on('change','#styleToggle', function() {
	let styleRange = document.getElementById("styleRange");
	let styleLabel = document.getElementById("styleLabel");
	if($('#styleToggle').is(':checked')){
		styleToggle = true;
		styleRange.removeAttribute("disabled");
		styleRange.removeAttribute("style");
		styleLabel.removeAttribute("style");
	} else {
		styleToggle = false;
		styleRange.setAttribute("disabled", "");
		styleRange.setAttribute("style", "opacity + 0.4;");
		styleLabel.setAttribute("style", "opacity + 0.4;");
	}
});

function getStyleToggle() {
	return styleToggle;
}

// Technique Toggle
let techToggle = true;
//techRange.setAttribute("disabled", "");
//techRange.setAttribute("style", "opacity + 0.4;");
//techLabel.setAttribute("style", "opacity + 0.4;");

$(document).on('change','#techToggle', function() {
	let techRange = document.getElementById("techRange");
	let techLabel = document.getElementById("techLabel");
	if($('#techToggle').is(':checked')){
		techToggle = true;
		techRange.removeAttribute("disabled");
		techRange.removeAttribute("style");
		techLabel.removeAttribute("style");
	} else {
		techToggle = false;
		techRange.setAttribute("disabled", "");
		techRange.setAttribute("style", "opacity + 0.4;");
		techLabel.setAttribute("style", "opacity + 0.4;");
	}
});

function getTechToggle() {
	return techToggle;
}