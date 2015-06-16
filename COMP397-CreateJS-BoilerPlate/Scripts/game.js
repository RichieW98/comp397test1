/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage;
var stats;
var itera = 0;
var disp1;
var disp2;
var label1;
var label2;
var assets;
var manifest = [
    { id: "d1", src: "assets/images/d1.png" },
    { id: "d2", src: "assets/images/d2.jpg" },
    { id: "d3", src: "assets/images/d3.jpg" },
    { id: "d4", src: "assets/images/d4.jpg" },
    { id: "d5", src: "assets/images/d5.jpg" },
    { id: "d6", src: "assets/images/d6.jpg" },
    { id: "pinkButton", src: "assets/images/pinkButton.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];
// Game Variables
var helloLabel; // create a reference
var pinkButton;
// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}
// Callback function that initializes game objects
function init() {
    console.log("entered");
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop);
    // calling main game function
    main();
}
// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps
    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';
    document.body.appendChild(stats.domElement);
}
// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring
    stage.update();
    stats.end(); // end measuring
}
// Callback function that allows me to respond to button click events
function pinkButtonClicked(event) {
    createjs.Sound.play("clicked");
    display();
}
// Callback functions that change the alpha transparency of the button
// Mouseover event
function pinkButtonOver() {
    pinkButton.alpha = 0.8;
}
// Mouseout event
function pinkButtonOut() {
    pinkButton.alpha = 1.0;
}
// generate the number of dice
function Roll() {
    var betLine = [" ", " "];
    var outCome = [0, 0];
    for (var spin = 0; spin < 2; spin++) {
        outCome[spin] = Math.floor((Math.random() * 6) + 1);
        switch (outCome[spin]) {
            case 1:
                betLine[spin] = "d1";
                itera++;
                break;
            case 2:
                betLine[spin] = "d2";
                itera++;
                break;
            case 3:
                betLine[spin] = "d3";
                itera++;
                break;
            case 4:
                betLine[spin] = "d4";
                itera++;
                break;
            case 5:
                betLine[spin] = "d5";
                itera++;
                break;
            case 6:
                betLine[spin] = "d6";
                itera++;
                break;
        }
    }
    return betLine;
}
//display the rolls on screen
function display() {
    stage.removeAllChildren();
    var res = Roll();
    disp1 = new createjs.Bitmap(assets.getResult(res[0].toString()));
    disp2 = new createjs.Bitmap(assets.getResult(res[1].toString()));
    console.log(res[0] + " " + res[1]);
    disp1.scaleX = 0.3;
    disp1.scaleY = 0.3;
    disp1.x = 50;
    disp1.y = 60;
    disp1.regX = 60;
    disp1.regY = 100;
    disp2.regX = 200;
    disp2.regY = 100;
    disp2.x = 270;
    disp2.y = 60;
    disp2.scaleX = 0.3;
    disp2.scaleY = 0.3;
    stage.addChild(disp1);
    stage.addChild(disp2);
    var dc1;
    var dc2;
    label1 = new createjs.Text(res[0].charAt(1), "20px Consolas", "#000000");
    label1.regX = label1.getMeasuredWidth() * 1;
    label1.regY = label1.getMeasuredHeight() * 1;
    label1.x = 50;
    label1.y = 140;
    stage.addChild(label1);
    label2 = new createjs.Text(res[1].charAt(1), "20px Consolas", "#000000");
    label2.regX = label2.getMeasuredWidth() * 1;
    label2.regY = label2.getMeasuredHeight() * 1;
    label2.x = 250;
    label2.y = 140;
    stage.addChild(label2);
    pink();
}
// display roll button
function pink() {
    pinkButton = new createjs.Bitmap(assets.getResult("pinkButton"));
    pinkButton.regX = pinkButton.getBounds().width * 0.5;
    pinkButton.regY = pinkButton.getBounds().height * 0.3;
    pinkButton.x = 160;
    pinkButton.y = 270;
    stage.addChild(pinkButton);
    pinkButton.on("click", pinkButtonClicked);
    pinkButton.on("mouseover", pinkButtonOver);
    pinkButton.on("mouseout", pinkButtonOut);
}
// Our Main Game Function
function main() {
    console.log("Game is Running");
    pink();
}
//# sourceMappingURL=game.js.map