//kliknięcie ikony rozszerzenia spowoduje ładowanie pliku tylko raz na odświerzenie strony  
//  if (window.hasRun) {
//	window.stop;
//  }
//  window.hasRun = true;


//sprawdzenie, czy załadowało jQuery
jQueryCheck();

function jQueryCheck(){
	if (window.jQuery) {
		console.log('jquery added :)');
	} else {
		console.log('Failed to load jquery :(');
	}
   
}

// zbieranie wyników
alert('Lets paint \'em!');
const ballsBoxes = document.getElementsByClassName('recent-result-item Lotto');
console.log('ballsBoxes: ' + JSON.stringify(ballsBoxes));
const draws = [];
for(let i = 0; i < ballsBoxes.length; i++) {
	let singleBox = ballsBoxes[i].getElementsByClassName('scoreline-item circle');
	for(let j = 0; j < singleBox.length; j++) {
		let singleNumberString = singleBox[j].textContent.trim();
		draws.push(singleNumberString);
	}
}
console.log('draws: ' + draws); 

//kolory
const colors = {
	1: "#ff5733",
	2: "#ff8a33",
	3: "#ffbd33",
	4: "#fff033",
	5: "#dbff33",
	6: "#a8ff33"
}
//zliczanie
const counter = {};
draws.forEach(element => {
	if(counter[element]) {
		counter[element] += 1;
	} else {
		counter[element] = 1;
	}
})
console.log('counter:' + JSON.stringify(counter));

const map = new Map(Object.entries(counter));
console.log('map\'s entries:');
printMap(map);

//sortowanie
const sortedMap = new Map([...map].sort((a, b) => b[1] - a[1]));
console.log('sorted map\'s entries:')
printMap(sortedMap);
console.log('sorted map\'s size: ' + sortedMap.size);

//mapowanie numerów do kolorów
let iterator = sortedMap.keys();
let colorMap = new Map();
for(let i = 0; i < 6; i++) {
	colorMap.set(iterator.next().value, colors[i + 1]);
}
console.log('colorMap\'s entries:');
printMap(colorMap);

//kolorowanie
paintBalls();
 
//doczepienie html'a z innego pliku 
let url = chrome.runtime.getURL("popup/summary.html");	//jaki typ zostanie zwrócony?
let stickyEl = $('#__layout > div > div.layout-games > div > div.menu-sticky');
stickyEl.load(url); 

function paintBalls() {
	for(let i = 0; i < ballsBoxes.length; i++) {
		let singleBox = ballsBoxes[i].getElementsByClassName('scoreline-item circle');
		for(let j = 0; j < singleBox.length; j++) {
			let ballText = singleBox[j].textContent.trim();
			//console.log(JSON.stringify(singleBox[j]));
			//break;
			if(colorMap.has(ballText)) {
				singleBox[j].style.backgroundColor = colorMap.get(ballText);
			}
		}
	}
}

function printMap(map) {
	map.forEach ((value, key) => {
    console.log(key + ': ' + value);
	});
}