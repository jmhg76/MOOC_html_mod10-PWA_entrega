const OPPONENT_HEIGHT = 5,
    OPPONENT_PICTURE = "assets/malo.png",
    OPPONENT_PICTURE_DEAD = "assets/malo_muerto.png",
    OPPONENT_SPEED = 5,
    OPPONENT_WIDTH = 5,
    // 6.	Crear una clase nueva llamada Boss en un nuevo fichero llamado Boss.js (no te olvides de importarlo en index.html). Esta clase debe heredar los métodos y atributos necesarios de la clase Opponent sobreescribiendo aquellos que sean necesarios para lograr la funcionalidad requerida. Para representar al jefe final puedes usar las imágenes jefe.png y jefe_muerto.png de la carpeta assets.
    BOSS_PICTURE = "assets/jefe.png",
    BOSS_PICTURE_DEAD = "assets/jefe_muerto.png",
    BOSS_SPEED = 10,
    GAME_OVER_PICTURE = "assets/game_over.png",
    // 8.	Modificar el código de la función endGame (no modificar la cabecera) para que, si el jugador consigue derrotar al jefe final, es decir, gane la partida con mas de 0 vidas, aparezca la imagen you_win.png de la carpeta assets, en vez de game_over.png.
    YOU_WIN_PICTURE = "assets/you_win.png",
    KEY_LEFT = "LEFT",
    KEY_RIGHT = "RIGHT",
    KEY_SHOOT = "SHOOT",
    MIN_TOUCHMOVE = 20,
    PLAYER_HEIGHT = 5,
    PLAYER_PICTURE = "assets/bueno.png",
    PLAYER_PICTURE_DEAD = "assets/bueno_muerto.png",
    PLAYER_SPEED = 20,
    PLAYER_WIDTH = 5,
    // 3. Añadir un atributo nuevo lives a la clase Player que valga 3 inicialmente. Puedes definir el nº de vidas inicial en una constante en main.js.
    PLAYER_INIT_LIVES = 3,
    SHOT_HEIGHT = 1.5,
    SHOT_SPEED = 20,
    SHOT_PICTURE_PLAYER = "assets/shot1.png",
    SHOT_PICTURE_OPPONENT = "assets/shot2.png",
    SHOT_WIDTH = 1.5;

function getRandomNumber(range) {
    return Math.floor(Math.random() * range);
}

function collision(div1, div2) {
    const a = div1.getBoundingClientRect(),
        b = div2.getBoundingClientRect();
    return !(a.bottom < b.top || a.top > b.bottom || a.right < b.left || a.left > b.right);

}
var game;
document.addEventListener("DOMContentLoaded", () => {
    game = new Game();
    game.start();
});