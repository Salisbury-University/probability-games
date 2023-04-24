const cards = document.querySelectorAll(".card");
const playButtons = document.querySelectorAll(".playButton");

cards.forEach(card => {
    let name = card.dataset.name;
    //hover over
    card.addEventListener('mouseover', () => {
        document.getElementById(name).hidden = false;
    });

    //hover out
    card.addEventListener('mouseout', () => {
        document.getElementById(name).hidden = true;
    });
});

playButtons.forEach(play => {
    play.addEventListener('click', () => {
        window.location.href = play.dataset.game + ".html";
    });
})