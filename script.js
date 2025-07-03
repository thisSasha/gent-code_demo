const haircutsCount = 7;

const sliderContainer = document.querySelector('.sidebar__slider');
const header = document.querySelector('header');
const buttons = document.querySelectorAll('.price-list__category');
const items = document.querySelectorAll('.price-list__item');

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

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.isTrusted) {
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

buttons[0].click()