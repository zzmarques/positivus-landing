const navBar = document.querySelector('.navbar');
const cardsProcess = document.querySelectorAll('.card-process');

const inputsSQ = document.querySelectorAll('input[name="op"]');
const contactForm = document.querySelector('form.form-contact');
const footerForm = document.querySelector('form.form-footer');
const inputEmail = footerForm.querySelector('input');
const inputsContact = contactForm.querySelectorAll('[name="contact-form"]');

const btnMenu = document.querySelectorAll('.btn-m');
const btnMore = document.querySelectorAll('.btn-more');
const btnSendMsg = document.querySelectorAll('.btn-msg');
const btnSub = document.querySelector('.btn-sub');
const btnAll = document.querySelector('.btn-all');
const btnReviews = document.querySelectorAll('.btn-testimonials');

const stars = document.querySelectorAll('.star');

const contentReviews = document.querySelectorAll('.container-tes p');
const nameReviews = document.querySelectorAll('.container-tes h3');
const cargoReviews = document.querySelectorAll('.container-tes h4');
let dateReviews;

(async () => {
    const response = await fetch('../src/json/testimonials.json');
    const dados = await response.json();

    dateReviews = dados;
})();

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
    if (input.parentNode.querySelector('span')) {
        return;
    }
    input.classList.add('error');
    input.parentNode.insertAdjacentHTML('afterbegin', spanError);
    handleError(input);
}

const hiddenError = (input) => {
    const spans = input.parentNode.querySelectorAll('span');
    input.classList.remove('error');
    spans.forEach(span => {
        if (span) span.remove();      
    });
}

const emailValidator = (email) => {
    console.log(email);
    
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
    if (input.type === "email") {
        emailValidator(input);
    } else {
        textValidator(input)
    }
};

const nextReviews = () => {    
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].classList.contains("green")) {
            
            if (i === stars.length - 1) {
                return;
            }

            stars[i].src = 'src/assets/img/start-white.png';
            stars[i].classList.remove("green");

            contentReviews.forEach(p => p.innerHTML = dateReviews[i + 1].text);
            nameReviews.forEach(n => n.innerHTML = dateReviews[i + 1].name);
            cargoReviews.forEach(c => c.innerHTML = dateReviews[i + 1].title);

            stars[i + 1].src = 'src/assets/img/start-green.png';
            stars[i + 1].classList.add("green");

            if (i + 1 === stars.length - 1) {
                btnReviews[1].classList.remove('active');
                btnReviews[0].classList.add('active');
            }

            break;
        }

    }

};

const backReviews = () => {
    for (let i = 0; i < stars.length; i++) {
        if (stars[i].classList.contains("green")) {

            if (i === 0) {
                return;
            }

            stars[i].src = 'src/assets/img/start-white.png';
            stars[i].classList.remove("green");

            contentReviews.forEach(p => p.innerHTML = dateReviews[i - 1].text);
            nameReviews.forEach(n => n.innerHTML = dateReviews[i - 1].name);
            cargoReviews.forEach(c => c.innerHTML = dateReviews[i - 1].title);

            stars[i - 1].src = 'src/assets/img/start-green.png';
            stars[i - 1].classList.add("green");

            if (i - 1 === 0) {
                btnReviews[0].classList.remove('active');
                btnReviews[1].classList.add('active');
            }

            break;
        }
    }

}

contactForm.addEventListener('submit', (e) => e.preventDefault());
footerForm.addEventListener('submit', (e) => e.preventDefault());

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
});

btnSub.addEventListener('click', () => {
    emptyValidator(inputEmail);
});

btnAll.addEventListener('click', () => {
    const containerTeam = document.querySelector('.container-card-team');
    containerTeam.style.height = 'auto';
})

inputEmail.addEventListener('input', () => {
        separator(inputEmail);
});

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

btnReviews.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.contains('next') ? nextReviews() : backReviews();
    });
});
