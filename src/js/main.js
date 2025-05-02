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

const handleError = (input) => {
    if (input.value === '' && input.parentNode.querySelector('span').classList.contains('in')) {
        input.parentNode.querySelector('span').remove()
        spanError = `<span class="erro ob">Campo obrigatório.</span>`;
        input.parentNode.insertAdjacentHTML('afterbegin', spanError);
    }
}

const showError = (input) => {
    let spanError;
    
    input.value === '' ? 
        spanError = `<span class="erro ob">Campo obrigatório.</span>` 
    :
        spanError = `<span class="erro in">Valor incorreto.</span>`;
    handleError(input);
    if (input.parentNode.querySelector('span')) {
        return;
    }
    input.classList.add('error');
    input.parentNode.insertAdjacentHTML('afterbegin', spanError);
}

const hiddenError = (input) => {
    const spans = input.parentNode.querySelectorAll('span');
    input.classList.remove('error');
    spans.forEach(span => {
        if (span) span.remove();      
    });
}

const emailValidator = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    !regexEmail.test(email.value.trim()) ? showError(email) : hiddenError(email);
};

const textValidator = (input) => {
    const textClean = input.value.trim();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    !regex.test(textClean) ? showError(input): hiddenError(input);
};

const emptyValidator = (input) => {
    input.value === '' ?  showError(input) : hiddenError(input);
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