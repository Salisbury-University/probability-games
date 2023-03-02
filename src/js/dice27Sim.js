var stats = [];
var numbers = [];

for(let i = 0; i < 28; i++){
    stats[i] = 0;
    numbers[i] = "Number " + i;
}



function simulate(){
    let userInput = document.getElementById("userInput").value;
    if(userInput == ""){}
    else{
        for(let i = 0; i < userInput; i++){
            let total = 27;
            let rollValue = 0;
            while(total != 0){
                rollValue = Math.floor(Math.random() * 6) + 1;
                let remainder = total % rollValue;
                stats[total]++;
                total = total - remainder;
                stats[0]++;
            }
        }
        for(let i = 0; i < 28; i++){
            document.getElementById("roll" + i).innerHTML = stats[i];
        }
        makeGraph();
    }
}

function makeGraph(){

d3.select(".graph")
  .selectAll("div")
  .data(stats)
    .enter()
    .append("div")
    .style("width", function(d) { return d + "px"; })
    .text(function(d) { return d; });
}