// do not remove, allowes autocomplete
/// <reference path="./../p5.global-mode.d.ts" />

let meals = ["🍗", "🥩", "🥓", "🌮", "🍱", "🍞", "🍦"];

let canvassize = 600;
let imgsize = 30;

let sytost = 150;
let hladoveni = 0.6;
let jidloGain = 40;
let jidloRychlost = 2;
let pooLoss = 80;
let pooHranice = 200;

let jidlo = [];
let poos = {};

function setup() {
	createCanvas(canvassize, canvassize);
	angleMode(DEGREES);
	pozadi = loadImage("pozadi.png");

	for (let i = 0; i < 4; i++)
		jidlo[i] = randomJidlo();
}

function randomJidlo() {
	return {
		offset: Math.random() * canvassize / 4,
		img: meals[Math.floor(Math.random() * meals.length)]
	};
}

function spawnPoo() {
	poos[Math.random()] = {offset: canvassize / 2};
	sytost -= pooLoss;
}

function draw() { 
	sytost -= hladoveni;
	if (sytost < 0)
		sytost = 0;

	image(pozadi, 0, 0, canvassize, canvassize);

	textSize(imgsize);
	textAlign(CENTER);

	for (let j in jidlo) {
		text(jidlo[j].img, jidlo[j].offset, (canvassize + imgsize) / 2);

		jidlo[j].offset += jidloRychlost;
		if (jidlo[j].offset + sytost / 2 > canvassize * 3 / 4) {
			sytost += jidloGain;
			jidlo[j] = randomJidlo();
		}
	}

	if (sytost > pooHranice)
		spawnPoo();

	for (let p in poos) {
		text("💩", canvassize * 3 / 4, poos[p].offset);

		poos[p].offset += jidloRychlost;
		if (poos[p].offset > canvassize)
			delete poos[p];
	}


	stroke("brown");
	strokeWeight(3);
	fill("pink");
	textSize(sytost / 2);
	line(canvassize * 3 / 4 - sytost / 2, canvassize / 2 - sytost / 2 - 10, canvassize * 3 / 4 + sytost / 2, canvassize / 2 + sytost / 2 + 10)
	line(canvassize * 3 / 4 - sytost / 2, canvassize / 2 + sytost / 2 + 10, canvassize * 3 / 4 + sytost / 2, canvassize / 2 - sytost / 2 - 10)
	ellipse(canvassize * 3 / 4, canvassize / 2, sytost, sytost);
	text("😋", canvassize * 3 / 4, canvassize / 2 - sytost / 2);
}
