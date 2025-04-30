const btnMenu = document.querySelectorAll('.btn-m');
const navBar = document.querySelector('.navbar');

const openMenu = () => {
    navBar.style.display = 'flex';
}

const openClose = () => {
    navBar.style.display = 'none';
}

btnMenu.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('btn-menu')) return openMenu();
        return openClose();
    });
});