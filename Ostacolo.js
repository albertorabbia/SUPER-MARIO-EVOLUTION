class Ostacolo {
    constructor() {
      this.img;
      this.x;
      this.y;
      this.speed;
      this.direction;
      this.width=80;
      this.height=150;
   
    }
  
    preload() {
      this.img = loadImage('./img/palla.png');
      this.wdt = this.img.width
      this.hgt = this.img.height
     
    }
  
    initialize() {
      // Imposta le coordinate iniziali dell'ostacolo (bordo casuale) e la direzione di movimento
      const border = random(["top", "bottom", "left", "right"]);
  
      if (border === "top") {
        this.x = random(width);
        this.y = -this.img.height;
        this.direction = createVector(0, 1);
        
      } else if (border === "bottom") {
        this.x = random(width);
        this.y = height + this.img.height;
        this.direction = createVector(0, -1);
      } else if (border === "left") {
        this.x = -this.img.width;
        this.y = random(height);
        this.img = loadImage("./img/pallaSx.png");
        this.direction = createVector(1, 0);
      } else if (border === "right") {
        this.x = width + this.img.width;
        this.y = random(height);
        this.direction = createVector(-1, 0);
      }
  
      // Imposta la velocità dell'ostacolo
      this.speed = random(8, 8);
    }
  
    update() {
      // Aggiorna la posizione dell'ostacolo in base alla direzione e alla velocità
      this.x += this.direction.x * this.speed;
      this.y += this.direction.y * this.speed;
    }
  
    draw() {
      // Disegna l'immagine dell'ostacolo
      image(this.img, this.x, this.y, 100, 100);
    }
  }