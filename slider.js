
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

// Noun Complexity
let noun = document.getElementById("nounRange");
let nounValue = document.getElementById("nounValue");

noun.oninput = function() {
  nounValue.innerHTML = this.value;
}

function getNounValue() {
	return noun.value
}

// Adjective Complexity
let adj = document.getElementById("adjRange");
let adjValue = document.getElementById("adjValue");

adj.oninput = function() {
  adjValue.innerHTML = this.value;
}

function getAdjValue() {
	return adj.value
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
}
advancedTab.onclick = function() {
	promptValue.innerHTML = prompt.value;
	styleValue.innerHTML = style.value;
	techValue.innerHTML = tech.value;
	nounValue.innerHTML = noun.value;
	adjValue.innerHTML = adj.value;
}