
 
class Nemico {
  constructor() {
    this.x = 10;
    this.y =500;
    this.speed = 3;
    this.width = 100;
    this.height = 200;
  }
  
  preload() {
    // Carica l'immagine del nemico
    this.image = loadImage("./img/nemicoo.gif");
  }
  
  initialize() {
    // Imposta la posizione iniziale del nemico
    this.x = width;
  }
  
  update(player) {
    // Muovi il nemico verso il giocatore
    if (player.x > this.x) {
      this.x += this.speed;
    } else if (player.x < this.x) {
      this.x -= this.speed;
    }
  }
  
  draw() {
    // Disegna il nemico
    image(this.image, this.x, this.y, this.width, this.height);
  
  }
  
  checkCollision(player) {
    // Controlla la collisione tra il nemico e il giocatore
    if (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    ) {
      return true; // Collisione avvenuta
    }
    return false; // Nessuna collisione
  }
  
}