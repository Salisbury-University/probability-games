class ProbabilitySimulator {
    constructor() {
      this.stats = [];
      this.totalRolls = 0;
      for(let i = 0; i < 28; i++){
          this.stats[i] = 0;
      }
    }
  
    simulate(userInput) {
      if(userInput == "") {
        return;
      }
      for(let i = 0; i < userInput; i++) {
        let total = 27;
        let rollValue = 0;
        while(total != 0){
            rollValue = Math.floor(Math.random() * 6) + 1;
            let remainder = total % rollValue;
            this.stats[total]++;
            total = total - remainder;
            this.stats[0]++;
        }
        this.totalRolls++;
      }
    }
  
    resetStats() {
      this.totalRolls = 0;
      for(let i = 0; i < 28; i++){
          this.stats[i] = 0;
      }
    }
  
    displayStats() {
      for(let i = 0; i < 28; i++){
          document.getElementById("roll" + i).innerHTML = this.stats[i];
      }
      document.getElementById("totalRolls").innerHTML = this.totalRolls;
    }
  }
  
let simulator = new ProbabilitySimulator();

function simulate() {
  let userInput = document.getElementById("userInput").value;
  simulator.simulate(userInput);
  simulator.displayStats();
}

function reset() {
  simulator.resetStats();
  simulator.displayStats();
}