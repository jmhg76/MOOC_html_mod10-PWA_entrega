/*
6.	Crear una clase nueva llamada Boss en un nuevo fichero llamado Boss.js (no te olvides de importarlo en index.html). Esta clase debe heredar los métodos y atributos necesarios de la clase Opponent sobreescribiendo aquellos que sean necesarios para lograr la funcionalidad requerida. Para representar al jefe final puedes usar las imágenes jefe.png y jefe_muerto.png de la carpeta assets.
*/
/**
 * Monstruo AVANZADO al que tenemos que destruir
 */
class Boss extends Opponent {
    /**
     * @param game {Game} La instancia del juego al que pertenece el oponente
     */
    constructor(game) {
        const
            speed = BOSS_SPEED,
            myImage = BOSS_PICTURE,
            myImageDead = BOSS_PICTURE_DEAD;

        super(game);

        // Valores propios del BOSS
        this.speed = speed;
        this.myImage = myImage;
        this.myImageDead = myImageDead;
        this.image.src = this.myImage;
        this.image.className = 'Boss'; // Para que el BOSS gire igual que Opponent

        setTimeout(() => this.shoot(), 750 + getRandomNumber(2500));
    }

    /**
     * Crea un nuevo disparo
     */
    shoot() {
        if (!this.dead && !this.game.ended) {
            if (!this.game.paused) {
                this.game.shoot(this);
            }
            setTimeout(() => this.shoot(), 750 + getRandomNumber(2500)); // El jefe dispara más rápido
        }
    }

    /**
     * Mata al boss
     */
    collide() {
        if (!this.dead) {
            setTimeout(() => {
                this.game.removeOpponent();
            }, 2000);
            super.collide();
            // 8.	Modificar el código de la función endGame (no modificar la cabecera) para que, si el jugador consigue derrotar al jefe final, es decir, gane la partida con más de 0 vidas, aparezca la imagen you_win.png de la carpeta assets, en vez de game_over.png.
            this.game.endGame();
        }
    }

}