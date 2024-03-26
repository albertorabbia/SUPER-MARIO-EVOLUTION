class Player {
    constructor() {
      this.bgimg;
      this.omino = ominoDx
      this.x = 100;
      this.y = 600;
      this.speed = 10; // Velocità di movimento
      this.salto = false;
      this.jumpForce = 30;
      this.gravity = 2;
    }
  
    preload() {
      this.bgimg = loadImage('./img/sfondoliv1.gif');
      
    }
  
    keyPressed() {
      if (keyCode === 32) { // Spazio
        if (!this.salto) {
          this.salto = true;
          this.y -= this.jumpForce;
        }
      }
    }
  
    moveLeft() {
      if (this.x > 0) {
        this.x -= this.speed; // Sposta il personaggio a sinistra se non è vicino al bordo sinistro
        this.omino = ominoSx
      }
    }
  
    moveRight() {
      let scaledWidth = this.omino.width * 0.2;
      this.omino = ominoDx
      if (this.x < width - scaledWidth) {
        this.x += this.speed; // Sposta il personaggio a destra se non è vicino al bordo destro
      }
    }
  
    update() {
      if (this.salto) {
        this.y -= this.jumpForce;
        this.jumpForce -= this.gravity;
  
        if (this.y >= 560) { // Se il personaggio è tornato a terra
          this.y = 560;
          this.salto = false;
          this.jumpForce = 30;
        }
      }
    }
    /*if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      gameOver = true;
      sfondo(gameOverScreen); // Mostra la schermata di game over
      drawRestartButton();
      noLoop(); // Interrompe il loop principale
      ostacoli = []; // Rimuove gli ostacoli quando appare la schermata di game over
    }*/
  
    draw() {
      background(this.bgimg);
  
      // Disegna l'immagine del personaggio con dimensioni ridotte
      let scaledWidth = this.omino.width * 0.2; // Riduci la larghezza dell'omino al 50%
      let scaledHeight = this.omino.height * 0.2; // Riduci l'altezza dell'omino al 50%
      image(this.omino, this.x, this.y, scaledWidth, scaledHeight);
    }
  }