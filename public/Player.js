/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    /**
     * Inicializa un jugador
     * @param game {Game} La instancia del juego al que pertenece el jugador
     */
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        // 3. Añadir un atributo nuevo lives a la clase Player que valga 3 inicialmente. Puedes definir el nº de vidas inicial en una constante en main.js.
        this.lives = PLAYER_INIT_LIVES;
    }

    /**
     * Actualiza los atributos de posición del jugador y los disparos en función de las teclas pulsadas
     */
    update() {
        if (!this.dead) {
            switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) {
                        this.x -= this.speed;
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) {
                        this.x += this.speed;
                    }
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this);
                    break;
            }
        }
    }

    /**
     * Mata al jugador
     */
    /*
    * 4. Modificar el código del método collide de la clase Player para que reste una vida cada vez que al jugador le alcance un disparo mientras esté vivo. 
        o	Si al jugador le quedan vidas, debe morirse durante dos segundos (llamando al método collide de su superclase Character) y renacer al cabo de ese tiempo. Para ello, el atributo src de this.image debe recuperar su valor original (el de this.myImage y poner a false el atributo this.dead.
        o	Si al jugador no le quedan vidas, debe morirse definitivamente (llamando al método collide de su superclase Character) y terminar el juego llamando al método endGame del juego.
    */
    collide() {
        if (!this.dead) { // Estaba vivo y le alcanzó un disparo o tuvo una colisión ...
            if (this.lives > 0) { // ... mientras le queden vidas ...
                --this.lives; // ... se pierde una vida ...
                super.collide(); // ... estará muerto ...
                setTimeout(() => { // ... durante 2 segundos ...
                    this.image.src = this.myImage; // ... recupera su forma viva ...
                    this.dead = false; //  ... y revive.
                }, 2000);
            } else { // ... si no le quedan vidas ...
                super.collide(); // ... estará definitivamente muerto ...
                setTimeout(() => { // ... y en 2 segundos ...
                    this.game.endGame(); // ... el juego termina.
                }, 2000);
            }
        }
    }
}