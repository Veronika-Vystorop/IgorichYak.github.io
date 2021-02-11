//top position of the mobile menu, add padding to the summit section

function changeTop() {
    let headerHeight = document.querySelector('.header').offsetHeight;

    document.querySelector('.summit_wrap').style.marginTop = headerHeight + 'px';

    if (document.documentElement.clientWidth < 1100) {
        document.querySelector('.menu_list').style.top = headerHeight + 1 + 'px';
    }
}

changeTop();

window.addEventListener('scroll', changeTop);

document.querySelector('.menu_burger').addEventListener('click', () => {    //show or hide mobile menu
    document.querySelector('.menu_list').classList.toggle('active'); 
});


document.addEventListener('click', (e) => {

    if (document.documentElement.clientWidth < 1100) {
        let cardsBlock = document.querySelector('.time_zone_cards');

        if (e.target.classList.contains('drop-down_title') || e.target.classList.contains('drop_svg')) {
            toggleActive('.drop_svg'); // switch position drop_svg
            toggleActive('.time_zone_cards'); //show or hide cards
            changeTitleList();
        } else if (cardsBlock.classList.contains('active')) {
            document.querySelector('.drop_svg').classList.remove('active'); // return to starting position drop_svg
            cardsBlock.classList.remove('active'); //close drop-down menu
        }
    }

    if (document.documentElement.clientWidth > 1100) {
        if (e.target.classList.contains('time_zone_card')) {
            switchClass(e.target);  //switch time zone (cards)
        }
    }
    
});

function toggleActive(elem) {
    document.querySelector(elem).classList.toggle('active');
}

function switchClass(target) {
    document.querySelectorAll('.time_zone_card').forEach(item => {
        item.classList.remove('active');
    });

    target.classList.add('active');
}

function changeTitleList() {
    let menuElem = document.querySelector('.drop-down');
    let titleElem = menuElem.querySelector('.drop-down_title');

    document.querySelector('.time_zone_cards').style.top = titleElem.offsetHeight + 'px'; //top position of the drop-down menu

    menuElem.onclick = function(e) {
        if (e.target.classList.contains('drop')) {

            titleElem.innerHTML = e.target.textContent + `<svg class="drop_svg" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12L14 0H0L7 12Z" fill="#171716"/></svg>`;
        } 
    } 
}


