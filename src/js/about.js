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