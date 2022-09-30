const totalCount = document.getElementById("total-count");
const cards = [0,0,0,0,0,0,0,0,0,0,0];
var count = 10;

totalCount.innerHTML = "Number of chips: " + count;

for(let i = 0; i < 11; i++){
    let temp = 'card' + i;
    document.getElementById(temp).innerHTML = cards[i];
}

function incrementValue(num){
    if(count != 0){
        let name = 'card' + num;
        let currCard = document.getElementById(name);
        cards[num]++;
        count--;
        currCard.innerHTML = cards[num];
        totalCount.innerHTML = "Number of chips: " + count;
    }
    if(count == 0){
        let button = document.getElementById("play");
        button.removeAttribute("hidden");
    }
}

function decrementValue(num){
    if(count != 10){
        let name = 'card' + num;
        let currCard = document.getElementById(name);
        if(cards[num] != 0){
            cards[num]--;
            count++;
            currCard.innerHTML = cards[num];
            totalCount.innerHTML = "Number of chips: " + count;
        }
    }
    if(count != 0){
        let button = document.getElementById("play");
        button.setAttribute("hidden", "hidden");
    }
}

function play(){
    document.getElementById("play").setAttribute("hidden", "hidden");
    document.getElementById("roll").removeAttribute("hidden");
    document.getElementById("dice").removeAttribute("hidden");

    let cardButton = document.getElementsByClassName("cardButton");
    for(let i = 0; i < cardButton.length; i++){
        cardButton[i].setAttribute("hidden", "hidden");
    }
}

function roll(){
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice1").setAttribute("src", "images/dice" + num1 + ".png");
    document.getElementById("dice2").setAttribute("src", "images/dice" + num2 + ".png");
    
    let card = num1 + num2 - 2;
    let currCard = document.getElementById("card" + card);
    if(cards[card] != 0){
        cards[card]--;
        count++;
        currCard.innerHTML = cards[card];
    }
    totalCount.innerHTML = "Points: " + count;
    if(count == 10){
        document.getElementById("roll").setAttribute("hidden", "hidden");
        
    }
}