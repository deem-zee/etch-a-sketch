const body = document.querySelector("body");
const container = document.createElement("div");
container.classList.add("container");
body.appendChild(container);
const header = document.createElement("div");
header.classList.add("header");
const canvas = document.createElement("div");
canvas.classList.add("canvas")
const footer = document.createElement("div");
footer.classList.add("footer")
container.appendChild(header);
container.appendChild(canvas);
container.appendChild(footer);

const newSketchBtn = document.createElement("button");
newSketchBtn.textContent = "create new sketch";
const eraseBtn = document.createElement("button");
eraseBtn.textContent = "erase";
const clearBtn = document.createElement("button");
clearBtn.textContent = "clear canvas";
clearBtn.addEventListener("click", () => {
	clearCanvas();
})
const gradientBtn = document.createElement("button");
gradientBtn.textContent = "gradient";
gradientBtn.addEventListener("click", () => {
	currentOpacity = 0;
	if(isGradient) {
		isGradient = false;
	} else if(!isGradient) {
		isGradient = true;
	}
})
const randomColorBtn = document.createElement("button");
randomColorBtn.textContent = "random color";
randomColorBtn.addEventListener("click", () => {
	if(isRandomColor) {
		isRandomColor = false;
	} else {
		isRandomColor = true;
	}
})
header.appendChild(newSketchBtn);
header.appendChild(eraseBtn);
header.appendChild(clearBtn);
header.appendChild(gradientBtn);
header.appendChild(randomColorBtn);
newSketchBtn.addEventListener("click", () => {
	clearCanvas();
	canvasSize = prompt("enter size of canvas. min=0 max=100", 4);
	if(canvasSize < 0) {
		canvasSize = 1;
	} else if(canvasSize > 100) {
		canvasSize = 100;
	}
	pickedColor = "white";
	renderCanvas(Number(canvasSize))
})

eraseBtn.addEventListener("click", () => {
	pickedColor = "white";
})

let isRandomColor = false;
let isGradient = false;
let currentOpacity = 0;
let canvasSize = 4;
let isMouseDown = false;
let colors = [ "IndianRed", "LightCoral", "Salmon", "DarkSalmon", "LightSalmon", "Crimson",
	"Red", "FireBrick", "DarkRed", "Pink", "LightPink", "HotPink", "DeepPink", "MediumVioletRed",
	"PaleVioletRed", "LightSalmon", "Coral", "Tomato", "OrangeRed", "DarkOrange", "Orange",
	"Gold", "Yellow", "LightYellow", "LemonChiffon", "LightGoldenrodYellow", "PapayaWhip",
	"Moccasin", "PeachPuff", "PaleGoldenrod", "Khaki", "DarkKhaki", "Lavender", "Thistle",
	"Plum", "Violet", "Orchid", "Fuchsia", "Magenta", "MediumOrchid", "MediumPurple", "RebeccaPurple",
	"BlueViolet", "DarkViolet", "DarkOrchid", "DarkMagenta", "Purple", "Indigo", "SlateBlue",
	"DarkSlateBlue", "MediumSlateBlue", "GreenYellow", "Chartreuse", "LawnGreen", "Lime",
	"LimeGreen", "PaleGreen", "LightGreen", "MediumSpringGreen", "SpringGreen", "MediumSeaGreen",
	"SeaGreen", "ForestGreen", "Green", "DarkGreen", "YellowGreen", "OliveDrab", "Olive",
	"DarkOliveGreen", "MediumAquamarine", "DarkSeaGreen", "LightSeaGreen", "DarkCyan",
	"Teal", "Aqua", "Cyan", "LightCyan", "PaleTurquoise", "Aquamarine", "Turquoise",
	"MediumTurquoise", "DarkTurquoise", "CadetBlue", "SteelBlue", "LightSteelBlue",
	"PowderBlue", "LightBlue", "SkyBlue", "LightSkyBlue", "DeepSkyBlue", "DodgerBlue",
	"CornflowerBlue", "MediumSlateBlue", "RoyalBlue", "Blue", "MediumBlue", "DarkBlue",
	"Navy", "MidnightBlue", "	Cornsilk", "BlanchedAlmond", "Bisque", "NavajoWhite", "Wheat",
	"BurlyWood", "Tan", "RosyBrown", "SandyBrown", "Goldenrod", "DarkGoldenrod", "Peru",
	"Chocolate", "SaddleBrown", "Sienna", "Brown", "Maroon", "White", "Snow", "HoneyDew",
	"MintCream", "Azure", "AliceBlue", "GhostWhite", "WhiteSmoke", "SeaShell", "Beige",
	"OldLace", "FloralWhite", "Ivory", "AntiqueWhite", "Linen", "LavanderBlush", "MistyRose",
	"Gainsboro", "LightGray", "Silver", "DarkGray", "Gray", "DimGray", "LightSlateGray",
	"SlateGray", "DarkSlateGray", "Black"

]

let opacityCounter = 0;
let pickedColor = colors[1]
function renderCanvas(canvasSize) {
	for(let i = 0; i < canvasSize ** 2; i++) {
	const pixel = document.createElement("div");
	pixel.classList.add("pixel");
	pixel.style.width = `${1000 / canvasSize}px`;
	pixel.addEventListener("mousedown", (e) => {
		e.preventDefault();
		isMouseDown = true;
		pixel.style.background = pickedColor;
		if(isGradient) {
			currentOpacity += 0.1;
			pixel.style.opacity = currentOpacity;
		}
	})
	pixel.addEventListener("mouseup", () => {
		isMouseDown = false;
	})
	pixel.addEventListener("mouseover", (e) => {
		if(isMouseDown) {
			e.target.style.background = pickedColor;
		}
	})
	pixel.addEventListener("mouseout", (e) => {
		if(isMouseDown) {
			if(isGradient) {
				e.target.style.background = pickedColor;
				e.target.style.opacity = currentOpacity;
				currentOpacity += 0.1;
				if(currentOpacity >= 1) {
					isGradient = false;
					currentOpacity = 0;
				}
			}
			if(isRandomColor) {
				e.target.style.background = colors[getRandomColor(colors)];
			}
		}
	})
	canvas.appendChild(pixel);
}
}


for(let i = 0; i < colors.length; i++) {
	const color = document.createElement("div");
	color.classList.add("color");
	color.style.backgroundColor = colors[i];
	color.addEventListener("click", (e) => {
		pickedColor = e.target.style.backgroundColor;
	})
	footer.appendChild(color);
}


function clearCanvas() {
	canvas.innerHTML = "";
	pickedColor = "white";
}

function getRandomColor(colors) {
	return Math.round(Math.random() * colors.length);
}

renderCanvas(10)