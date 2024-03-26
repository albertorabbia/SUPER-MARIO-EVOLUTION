class Proiettile {
    constructor(x, y) {
      this.x = x;
  this.y = y;
      this.width = 10;
      this.height = 20;
      this.speed = 5;
    }
  
    preload() {
      // Carica l'immagine del proiettile
      this.image = proiettileImg;
    }
  
    update() {
      this.y -= this.speed; // Muovi il proiettile verso l'alto
    }
  
    draw() {
      image(this.image, this.x, this.y, this.width, this.height);
    }
  }