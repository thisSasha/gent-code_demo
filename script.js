const isMobile = window.matchMedia('(max-width: 768px)').matches;
const haircutsCount = 7;

const sliderContainer = document.querySelector('.sidebar__slider');
const header = document.querySelector('header');
const buttons = document.querySelectorAll('.price-list__category');
const items = document.querySelectorAll('.price-list__item');

let programmatic = false;

header.addEventListener('mousemove', function (e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    const moveX = 50 + (x - 50) * 0.05;
    const moveY = 50 + (y - 50) * 0.05;

    header.style.backgroundPosition = `${moveX}% ${moveY}%`;
});

let slides = [];
for (let i = 1; i <= haircutsCount; i++) {
    const imgSrc = `./assets/haircuts/${i}.png`;

    const slideImg = document.createElement('img');
    slideImg.src = imgSrc;

    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('sidebar__slide');
    slideWrapper.appendChild(slideImg);

    sliderContainer.appendChild(slideWrapper);
    slides.push(slideWrapper);

    const portfolioImg = document.createElement('img');
    portfolioImg.src = imgSrc;

    const portfolioItem = document.createElement('div');
    portfolioItem.classList.add('portfolio__item');
    portfolioItem.appendChild(portfolioImg);
    document.querySelector('.portfolio__wrapper').appendChild(portfolioItem);

};

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    setTimeout(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
};

showSlide(currentSlide);

let first = true;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (!first) {
            document.querySelector(".price-list").style.minHeight = "100vh"
            programmatic = true
            document.querySelector('.price-list .section__title').scrollIntoView({ behavior: 'smooth' });
        }
        buttons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');


        const category = button.dataset.category;

        const toShow = [];

        items.forEach(item => {
            const match = category === 'all' || item.dataset.category === category;
            if (match) {
                toShow.push(item);
            };
            item.classList.add('_hide_animation');
        });

        setTimeout(() => {
            items.forEach(item => {
                item.classList.add('_hidden');
            });

            toShow.forEach(item => {
                item.classList.remove('_hidden');
            });

            setTimeout(() => {
                toShow.forEach(item => {
                    item.classList.remove('_hide_animation');
                });
            }, 50);
        }, 400);
    });
});

window.onload = () => {
    buttons[0].click()
    first = false
}

const nonFixedBtn = document.querySelector('.sidebar__button')
const fixedBtn = document.querySelector('.mobile-nav')




window.onscroll = (e) => {
    const top = nonFixedBtn.getBoundingClientRect().top
    if (!programmatic && !isMobile)
        document.querySelector(".price-list").style.minHeight = "auto"
    if (top <= 0 && isMobile) {
        fixedBtn.style.top = "0px"
        fixedBtn.style.display = 'block';
        setTimeout(() => {
            fixedBtn.style.clipPath = 'inset(0 0 0 0)';
        }, 0);
    } else if (isMobile) {
        fixedBtn.style.top = top + 2 + "px"
        fixedBtn.style.clipPath = 'inset(0 50% 0 50%)';
        setTimeout(() => {
            fixedBtn.style.display = 'block';
        }, 0);
    }

}

window.onscrollend = (e) =>
    programmatic = false

