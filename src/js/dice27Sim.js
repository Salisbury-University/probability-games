function simulate(){
    let stats = [];
    let userInput = document.getElementById("userInput").value;
    if(userInput == ""){}
    else{
        for(let i = 0; i < userInput; i++){
            let total = 27;
            let rollValue = 0;
            while(rollValue < total){
                rollValue = Math.floor(Math.random() * 6) + 1;
                let remainder = total % rollValue;
                total = total - remainder;
                stats[total]++;
            }
        }
        for (let i = 0; i < 27; i++) {
            document.getElementById("roll" + i).innerHTML = stats[i];
        }
    }
}