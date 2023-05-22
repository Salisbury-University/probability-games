const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    let name = card.dataset.name;
    //hover over
    card.addEventListener('mouseover', () => {
        document.getElementById(name).hidden = false;
        card.style.transform = "scale(1.2) translateY(-5vw)";
    });
    //hover out
    card.addEventListener('mouseout', () => {
        document.getElementById(name).hidden = true;
        card.style.transform = "scale(1)";
    });
    card.addEventListener('click', () => {
        window.location.href = name + ".html";
    });
});

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
        let card = document.querySelectorAll(".card");
        let menu = document.querySelectorAll(".menu");
        if (this.#color.checked) {//dark mode
            document.body.style.backgroundColor = "#343a40";
            for (let i = 0; i < text.length; i++) {
                text[i].style.color = 'white';
            }
            for (let i = 0; i < card.length; i++) {
                card[i].style.backgroundColor = "#6C757D";
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
            for (let i = 0; i < card.length; i++) {
                card[i].style.backgroundColor = "white"
            }
            for (let i = 0; i < menu.length; i++) {
                menu[i].style.backgroundColor = "#ffffff";
            }
            sessionStorage.setItem("theme", "light");
        }
    }
}

const screen = new ScreenManagement();