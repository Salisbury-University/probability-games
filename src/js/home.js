const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    let name = card.dataset.name;
    //hover over
    card.addEventListener('mouseover', () => {
        document.getElementById(name).hidden = false;
        card.style.transform = "scale(1.2)";
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

