let portfolioNav = document.querySelectorAll('.portfolio_list_child');
let deskImg = document.querySelectorAll('.porfolio_photo_img_desk');
let mobImg = document.querySelectorAll('.porfolio_photo_img_mob');

portfolioNav.forEach( (item, i) => {
    item.addEventListener("mouseenter", function(e) {
        deskImg.forEach(item => item.style.display = 'none');
        mobImg.forEach(item => item.style.display = 'none');

        deskImg[i].style.display = 'block';
        mobImg[i].style.display = 'block';

        portfolioNav.forEach(item => {
            item.classList.remove('active');
        });

        e.target.classList.add('active');
    });

    item.addEventListener("mouseleave", function(e) {
        if (event.relatedTarget.tagName == 'A') {
            deskImg.forEach(item => item.style.display = 'none');
            mobImg.forEach(item => item.style.display = 'none');
        }
        
    });
});