const btnMenu = document.querySelectorAll('.btn-m');
const navBar = document.querySelector('.navbar');
const btnMore = document.querySelectorAll('.btn-more');
const cardsProcess = document.querySelectorAll('.card-process');


const openMenu = () => {
    navBar.style.display = 'flex';
};

const closeMenu = () => {
    navBar.style.display = 'none';
};

btnMenu.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('btn-menu')) return openMenu();
        return closeMenu();
    });
});

const showProcess = (card, btn) => {
    btn.lastElementChild.innerText = 'remove';
    card.classList.add('active');
}

const hiddenProcess = (card, btn) => {
    btn.lastElementChild.innerText = 'add';
    card.classList.remove('active');
}

btnMore.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.parentNode.parentNode;

        cardsProcess.forEach(cardP => {
            if (cardP.classList.contains('active') && cardP !== card) {
                const btnP = cardP.firstElementChild.lastElementChild;
                hiddenProcess(cardP, btnP);
            };
        });

        if (!card.classList.contains('active')) return showProcess(card, btn);
        return hiddenProcess(card, btn);
    });
});