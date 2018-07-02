// do not remove, allowes autocomplete
/// <reference path="./../p5.global-mode.d.ts" />

var threshold = 200;
var time = 0;
var fullness = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
}

function draw() {
  fill(random(0, 100), 100, 100);
  textSize(30);
  textStyle(BOLD);
  time = time +1;

  znalost();
  znalost();
  if (time > 600) {titul();}

}

function znalost() {
  push();
  translate(random(0, windowWidth), random(0, windowHeight));
  rotate(random(0, 10));
  text("znalosti, omg", 0, 0);
  pop();
}

function titul(){
fill("black");
textSize(100);
textStyle(BOLD);
textAlign(CENTER);
text ("Mgr.",windowWidth/2,windowHeight/2);
}
