window.onload = () => {
    alert("Enjoy the game!");
    // create game world
    createGameWorld();
    // create current and next generations
    createGenerationArrays();
    // set all to be dead
    initGenerationArrays();
}