
// Style Complexity
let style = document.getElementById("styleRange");
let styleValue = document.getElementById("styleValue");
styleValue.innerHTML = style.value;

style.oninput = function() {
  styleValue.innerHTML = this.value;
}

function getStyleValue() {
	return style.value
}

// Technique Complexity
let tech = document.getElementById("techRange");
let techValue = document.getElementById("techValue");
techValue.innerHTML = tech.value;

tech.oninput = function() {
  techValue.innerHTML = this.value;
}

function getTechValue() {
	return tech.value
}