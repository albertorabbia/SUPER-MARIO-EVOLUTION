let player;
let ostacoli = [];
let gameState = "menu"; // Stato del gioco: "menu", "livello1", "livello2"
let timer = 0;
let punteggio = 0; // Punteggio corrente
let punteggioMigliore = 0; // Punteggio migliore
let sfondoMenu;
let gameOverScreen;
let vittoriaScreen;
let cont = 0;


let ominoImg;
let ominoDx;
let ominoSx;

function preload() {
  sfondoMenu = loadImage("./img/sfondoliv2.gif"); // Load the uploaded image
  gameOverScreen = loadImage("./img/gameOverScreen.jpg"); // Load the game over screen image
  vittoriaScreen = loadImage("./img/vittoriaScreen.jpg");
  ominoImg = loadImage('./img/mario.gif');
  ominoDx = loadImage("img/mario.gif");
  ominoSx = loadImage("./img/marioSinistra.gif");
}

function setup() {
  createCanvas(1450, 720);
  frameRate(50);
  
  player = new Player();
  player.preload();
  
}

function keyPressed() {
  if (gameState === "vittoria1" && keyCode === 51) { // ASCII code for '3'
    gameState = "livello2";
    timer = 0; // Reimposta il timer per il nuovo livello
  }
  player.keyPressed();
}

function draw() {
  if (gameState === "menu") {
    startMenu();
  } else if (gameState.startsWith("livello")) {
    if (gameState === "livello1") {
      playLivello(gameState);
    } else if (gameState === "livello2") {
      playLivello2(gameState);
    }
  
    // Aggiorna e disegna il timer solo quando si è in un livello
    updateTimer();
    drawTimer();
    
    // Verifica la condizione di vittoria
    if (gameState === "livello1" && timer >= 30){
      gameState = "vittoria1";
    } else if (gameState === "livello2" && timer >=35) {
      gameState = "vittoria2";
    }
  } else if (gameState === "vittoria1") {
    background(vittoriaScreen);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Premi 3 per passare al livello successivo", width / 2, height / 2 + 100);
  } else if(gameState==="vittoria2"){
    background(vittoriaScreen);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    drawRestartButton();
 
}
}
  
function startMenu() {
  background(sfondoMenu);
  fill(0,0,0);
  textSize(50);
  textAlign(CENTER);
  text("SUPER MARIO EVOLUTION", width / 2, height / 2 -180);
  text("Benvenuto! Per iniziare a giocare seleziona un livello", width / 2, height / 2 - 100);
  
  // Pulsante Livello 1
  drawButton(width / 2 - 400, height / 2, "Livello 1", "livello1");
  
  // Pulsante Livello 2
  drawButton(width / 2 - 30, height / 2, "Livello 2", "livello2");
  
  // Pulsante Exit
  drawButton(width / 2 + 300, height / 2, "Exit", "exit");
}

function drawButton(x, y, label, nextState) {
  // Disegna il pulsante con un rettangolo e il testo al centro
  fill(0, 250, 0);
  rectMode(CENTER);
  rect(x, y, 200, 60, 10); // Aggiungo 10 per gli angoli rotondi
  
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text(label, x, y + 10); // Sposto il testo leggermente verso il basso
  
  // Controlla se il mouse è sopra il pulsante
  if (
    mouseX > x - 100 &&
    mouseX < x + 100 &&
    mouseY > y - 40 &&
    mouseY < y + 40 &&
    mouseIsPressed
  ){
    // Cambia lo stato del gioco al prossimo stato
    if (nextState==="livello1") {
      gameState = nextState;
    } else if(nextState==="livello2"){
      gameState=nextState;
    }
    else if(nextState==="exit"){
    let conferma = confirm("Sei sicuro di voler uscire?");
    if (conferma) {
      // Se l'utente conferma, chiudi il gioco
      closeGame();
    }
  }
  }
}
function mousePressed() {
  if (gameState === "vittoria2") {
    // Gestisci il click del mouse nella schermata di vittoria del livello 2
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 150 &&
      mouseY < height / 2 + 250
    ) {
      restartGame(); // Chiamata a restartGame() solo quando si clicca sul pulsante "Restart"
    }
  }
}

function closeGame() {
  window.close(); // Chiudi la finestra
}

function playLivello(livello1) {
  background(255);
  player.update();
  player.draw();
  
  if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }
  
  generateOstacolo(); // Genera un nuovo ostacolo
  updateOstacoli(); // Aggiorna gli ostacoli
  drawOstacoli(); // Disegna gli ostacoli
}
function playLivello2(livello2) {
  background(255);
  player.update();
  player.draw();
  
  if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }
  
  generateOstacolo2(); // Genera un nuovo ostacolo
  updateOstacoli(); // Aggiorna gli ostacoli
  drawOstacoli(); // Disegna gli ostacoli
  
 
}

function generateOstacolo() {
 
  if (ostacoli <= 10 && frameCount % 35 === 0) { // Genera un nuovo ostacolo ogni secondo (35 frameRate)
    const ostacolo = new Ostacolo();
    ostacolo.preload();
    ostacolo.initialize();
    ostacoli.push(ostacolo);
    cont++;
  }
  
}
function generateOstacolo2(){
  if (frameCount % 20 === 0) { // Genera un nuovo ostacolo ogni secondo (20 frameRate)
    const ostacolo = new Ostacolo();
    ostacolo.preload();
    ostacolo.initialize();
    ostacoli.push(ostacolo);
  }

}


const diametroCollisione = 50; // Imposta il diametro di collisione desiderato

function updateOstacoli() {
  let collisione = false;  //tiene traccia della presenza della collisione

  for (let i = ostacoli.length - 1; i >= 0; i--) {  //parte dall'ultimo elemento dell'array terminando con il primo
    const ostacolo = ostacoli[i];
    ostacolo.update();

    // Calcola il centro del giocatore e dell'ostacolo
    const centroGiocatore = createVector(   //Queste calcolano il centro del giocatore e dell'ostacolo 
      player.x + player.omino.width * 0.2 / 2,  //utilizzando vettori e le dimensioni degli oggetti.
      player.y + player.omino.height * 0.2 / 2
    );
    const centroOstacolo = createVector(
      ostacolo.x + ostacolo.width / 2,
      ostacolo.y + ostacolo.height / 2
    );

    // Calcola la distanza tra i due centri
    const distanza = p5.Vector.dist(centroGiocatore, centroOstacolo);

    // Verifica la collisione in base alla distanza e al diametro di collisione
    if (distanza <= diametroCollisione) {
      collisione = true;
      break; // Esce dal ciclo se c'è una collisione
    }

    // Rimuovi gli ostacoli che sono usciti dallo schermo
    if (
      ostacolo.x > width ||
      ostacolo.y > height ||
      ostacolo.x + ostacolo.width < 0 ||
      ostacolo.y + ostacolo.height < 0
    ) {
      ostacoli.splice(i, 1);
    }
  }

  if (collisione) {
    gameOver = true;
    background(gameOverScreen); // Mostra lo schermo di game over
    drawRestartButton();
    noLoop();  //interrompe il loop principale
    ostacoli = []; // Rimuovi gli ostacoli quando appare la schermata di game over
      
    
    
  }
}



function drawOstacoli() {
  for (let i = 0; i < ostacoli.length; i++) {
    const ostacolo = ostacoli[i];
    ostacolo.draw();
  }
}


function updateTimer() {
  if ((gameState === "livello1" || gameState ==="livello2") && frameCount % 50 === 0) { // Aggiorna il timer solo se siamo nel livello1 ogni secondo (50 frameRate)
    timer++;
    punteggio=punteggio+5; // Incremento del punteggio ogni secondo
  } 
}

function drawTimer() {
  if (gameState === "livello1" || gameState === "livello2") { 
    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Timer: " + timer, 10, 10);
    text("Punteggio: " + punteggio, 10, 40);
    text("Punteggio Migliore: " + punteggioMigliore, 10, 70);
  }
}

function drawRestartButton() {
  fill(0, 255, 255);
  rectMode(CENTER);
  rect(width / 2, height / 2 + 200, 200, 50, 50); // Pulsante restart
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Restart", width /2 , height / 2 + 180 + 10); // Testo pulsante restart
}

function mouseClicked() {
  // Se clicchi sul pulsante restart durante il game over, riporta il gioco allo stato di menu
  if (gameOver && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 60 && mouseY < height / 2 + 250) {
    restartGame();
  } 
}

function restartGame() {
  if (punteggio > punteggioMigliore) {
    punteggioMigliore = punteggio; // Aggiorna il punteggio migliore se il punteggio attuale è maggiore
  }
  timer = 0;
  punteggio = 0; // Reimposta il punteggio a zero
  gameOver = false;
  gameState = "menu";
  loop();
  
}
