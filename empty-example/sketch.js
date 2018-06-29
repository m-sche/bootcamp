// do not remove, allowes autocomplete
/// <reference path="./../p5.global-mode.d.ts" />

let img;

let canvassize = 600;
let imgsize = 30;

let sytost = 100;
let hladoveni = 0.6;
let jidloGain = 40;
let jidloRychlost = 2;
let pooLoss = 80;
let pooHranice = 200;

let jidlo = {};
let poos = {};

function setup() {
	createCanvas(canvassize, canvassize);
	angleMode(DEGREES);
	img = loadImage("chicken-512.png");
	imgpoo = loadImage("poo.png");

	spawn(0);
	spawn(canvassize / 2);
	spawn(canvassize / 3);
	spawn(canvassize / 4);
}

function spawn(offset) {
	jidlo[Math.random()] = {offset};
}

function spawnPoo() {
	poos[Math.random()] = {offset: canvassize / 2};
	sytost -= pooLoss;
}

function draw() { 
	sytost -= hladoveni;
	if (sytost < 0)
		sytost = 0;

	background("gray");

	for (let j in jidlo) {
		image(img, jidlo[j].offset, (canvassize - imgsize) / 2, imgsize, imgsize);

		jidlo[j].offset += jidloRychlost;
		if (jidlo[j].offset + sytost / 2 > canvassize * 3 / 4) {
			sytost += jidloGain;
			delete jidlo[j];
			spawn(Math.random() * canvassize / 4);
		}
	}

	if (sytost > pooHranice)
		spawnPoo();

	for (let p in poos) {
		image(imgpoo, canvassize * 3 / 4 - imgsize / 2, poos[p].offset, imgsize, imgsize);

		poos[p].offset += jidloRychlost;
		if (poos[p].offset > canvassize)
			delete poos[p];
	}


	stroke("brown");
	strokeWeight(3);
	fill("pink");
	ellipse(canvassize * 3 / 4, canvassize / 2, sytost, sytost);

	// textSize()
	// text("", x, y)
}
