class CoinSimulation {
    #flips;
    #numberGames;
    #graph;

    constructor() {
        this.#setup();
    }

    #setup() {
        let simulate = document.getElementById("simulate");
        let inputField = document.querySelectorAll('.userInput');
        let reset = document.getElementById("reset");

        simulate.addEventListener('click', () => {
            this.#simulate();
        });
        inputField.forEach(input => {
            input.addEventListener('keypress', function (event) {
                let charCode = event.key;
                if (charCode < '0' || charCode > '9') {
                    event.preventDefault();
                }
            })
        });
        reset.addEventListener('click', () => {
            this.#reset();
        })
    }

    #simulate() {
        let numberFlips = document.getElementById("numberFlips").value;
        this.#numberGames = document.getElementById("numberGames").value;

        //check if user inputted
        if (isNaN(numberFlips) || isNaN(this.#numberGames)) {
            console.log("no input");
            return;
        }

        //create the array
        this.#flips = new Array(this.#numberGames);
        for (let i = 0; i < this.#numberGames; i++) {
            this.#flips[i] = new Array(2).fill(0);
        }

        //simulates the coin for each game
        for (let i = 0; i < this.#numberGames; i++) {
            for (let j = 0; j < numberFlips; j++) {
                this.#flips[i][Math.random() < 0.5 ? 0 : 1]++;
            }
        }

    }
    #reset() {

    }
}

let simulator = new CoinSimulation();