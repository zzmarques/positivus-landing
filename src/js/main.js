const btnMenu = document.querySelectorAll('.btn-m');
const navBar = document.querySelector('.navbar');
const btnMore = document.querySelectorAll('.btn-more');
const cardsProcess = document.querySelectorAll('.card-process');
const inputsSQ = document.querySelectorAll('input[name="op"]');
const contactForm = document.querySelector('form.form-contact');
const inputsContact = contactForm.querySelectorAll('[name="contact-form"]');
const btnSendMsg = document.querySelectorAll('.btn-msg');
const [name, email, msg] = Array.from(inputsContact);

const openMenu = () => {
    navBar.style.display = 'flex';
};

const closeMenu = () => {
    navBar.style.display = 'none';
};

const showProcess = (card, btn) => {
    btn.lastElementChild.innerText = 'remove';
    card.classList.add('active');
};

const hiddenProcess = (card, btn) => {
    btn.lastElementChild.innerText = 'add';
    card.classList.remove('active');
};

const emailValidator = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    !regexEmail.test(email.value.trim()) ? console.log('error') : console.log('sem error');
};

const textValidator = (input) => {
    const textClean = input.value.trim();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    !regex.test(textClean) ? console.log('erro') : console.log('sem erro');
};

const emptyValidator = (input) => {
    input.value === '' ? console.log('erro') : console.log('sem erro');
};

const separator = (input) => {
    if (input === email) {
        emailValidator(input);
    } else {
        textValidator(input)
    }
};

contactForm.addEventListener('submit', (e) => e.preventDefault());

btnMenu.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('btn-menu')) return openMenu();
        return closeMenu();
    });
});

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

btnSendMsg.forEach(btn => {
    btn.addEventListener('click', () => {
        inputsContact.forEach(i => emptyValidator(i));
    });
})

inputsSQ.forEach(op => {
    op.addEventListener('click', () => {
        if (op.id === 'say') {
            console.log('Say');
        } else {
            console.log('Get a Quote');
        }
    })
});

inputsContact.forEach(i => {
    i.addEventListener('input', () => {
        separator(i);
    });
});