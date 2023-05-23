class CoinSimulation {
    #flips;
    #numberGames;
    #numberFlips

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
        this.#numberFlips = document.getElementById("numberFlips").value;
        this.#numberGames = document.getElementById("numberGames").value;

        //check if user inputted
        if (isNaN(this.#numberFlips) || isNaN(this.#numberGames)) {
            return;
        }

        //create the array
        this.#flips = new Array(2);
        for (let i = 0; i < 2; i++) {
            this.#flips[i] = new Array(this.#numberGames);
            for (let j = 0; j < this.#numberGames; j++) {
                this.#flips[i][j] = 0;
            }
        }

        //simulates the coin for each game
        for (let i = 0; i < this.#numberGames; i++) {
            for (let j = 0; j < this.#numberFlips; j++) {
                this.#flips[Math.random() < 0.5 ? 0 : 1][i]++;
            }
        }
        //update graphs heads = 0 and tails = 1
        this.#updateChart(0);
        this.#updateChart(1);

        this.#flips = null;
    }
    #updateChart(coinSide) {
        // Define the size of the chart
        const margin = { top: 20, right: 20, bottom: 50, left: 75 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Select the SVG element with ID "chart0" and remove all its child elements
        var svg = d3.select(`#chart${coinSide}`);
        svg.selectAll("*").remove();

        // Append the SVG element to the DOM
        svg = svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Define the data for the histogram
        var data = this.#flips[coinSide];

        // Number of bins for histogram
        var numBins = 100;

        // Define the scale for the x-axis (the data range)
        var xScale = d3.scaleLinear()
            .domain([0, this.#numberFlips])
            .range([0, width]);


        // Define the histogram generator
        var histogram = d3.histogram()
            .domain(xScale.domain())
            .thresholds(xScale.ticks(numBins))
            .value(function (d) { return d; });

        // Generate the histogram data from the input data
        var histogramData = histogram(data);

        // Define the scale for the y-axis (the frequency range)
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(histogramData, function (d) { return d.length; })])
            .range([height, 0]);

        // Define the bars for the histogram
        var bars = svg.selectAll("rect")
            .data(histogramData)
            .enter()
            .append("rect")
            .attr("x", function (d) { return xScale(d.x0); })
            .attr("y", function (d) { return yScale(d.length); })
            .attr("width", function (d) {
                var barWidth = xScale(d.x1) - xScale(d.x0) - 1;
                return barWidth < 0 ? 0 : barWidth;
            })
            .attr("height", function (d) { return height - yScale(d.length); });


        // Add the x-axis to the chart
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        // Add the y-axis to the chart
        svg.append("g")
            .call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5)
            .text("Number of Times Landed");
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("transform", `rotate(-90)`)
            .text("Number of Games");
    }
    #reset() {
        // Clear the flips array
        this.#flips = null;

        // Clear the input values
        document.getElementById("numberFlips").value = "";
        document.getElementById("numberGames").value = "";

        // Clear the chart elements
        var svg = d3.select("#chart0");
        svg.selectAll("*").remove();

        svg = d3.select("#chart1");
        svg.selectAll("*").remove();
    }

}
class ScreenManagement {
    #color;

    constructor() {
        this.#color = document.getElementById("themeTypeSwitch");

        let theme = sessionStorage.getItem("theme");
        if (theme == "dark") {
            document.getElementById("themeTypeSwitch").checked = true;
            this.#changeColor();
        }

        this.#setup();
    }
    #setup() {
        this.#color.addEventListener('click', () => {
            this.#changeColor();
        });

    }
    #changeColor() {
        let text = document.querySelectorAll(".text");
        let menu = document.querySelectorAll(".menu");
        if (this.#color.checked) {//dark mode
            document.body.style.backgroundColor = "#343a40";
            for (let i = 0; i < text.length; i++) {
                text[i].style.color = 'white';
            }
            for (let i = 0; i < menu.length; i++) {
                menu[i].style.backgroundColor = "#343a40";
            }
            sessionStorage.setItem("theme", "dark");
        } else {//light mode
            document.body.style.backgroundColor = "#ffffff";
            for (let i = 0; i < text.length; i++) {
                text[i].style.color = 'black';
            }
            for (let i = 0; i < menu.length; i++) {
                menu[i].style.backgroundColor = "#ffffff";
            }
            sessionStorage.setItem("theme", "light");
        }
    }
}

const screen = new ScreenManagement();
const simulator = new CoinSimulation();