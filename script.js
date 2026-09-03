function startGame() {

    let randomNumber = Math.floor(Math.random() * 11);

    let guess = prompt("Guess a number between 0 and 10:");

    while (guess != randomNumber) {

        if (guess < randomNumber) {
            alert("Too low, try again!");
        } else {
            alert("Too high, try again!");
        }

        let playAgain = confirm("Do you want to try again?");

        if (!playAgain) {
            alert("Game over!");
            return;
        }

        guess = prompt("Guess a number between 0 and 10:");
    }

    alert("Yeah, you guessed it!");
}