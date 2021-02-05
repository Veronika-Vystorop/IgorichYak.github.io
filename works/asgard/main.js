slider();

function slider() {
    let slider = document.querySelectorAll('.slider');

    slider.forEach(function(item) {
        let slides = item.querySelectorAll('.slide');
        let currentSlide = 0;
        let next = item.querySelector('.next');
        let previous = item.querySelector('.previous');

        next.onclick = function() {
            nextSlide();
        };
        
        previous.onclick = function() {
            previousSlide();
        };

        function nextSlide() {
            goToSlide(currentSlide+1);
        }
        
        function previousSlide() {
            goToSlide(currentSlide-1);
        }
        
        function goToSlide(n) {
            slides[currentSlide].className = 'slide';
            currentSlide = (n+slides.length)%slides.length;
            slides[currentSlide].className = 'slide showing';
        }
    });
}

document.addEventListener('click', handlerClickLinks);

function handlerClickLinks(event){
    if(!(event.target.closest('a') && event.target.closest('a').getAttribute('href').split('')[0] == '#')) return;
    event.preventDefault();
    let a = event.target.closest('a');

    if (a.classList.contains('active_item')) {
        document.querySelectorAll('.active_item').forEach((item) => {
            item.classList.remove('active');
        });
        a.classList.add('active');
        document.getElementById('menu__toggle').checked = false;
    }
    
    let target = document.getElementById(`${a.getAttribute('href').split('#')[1]}`);
    if(!target) return;
    let h = 0;
    if(document.querySelector('.header-main')){
        let header = document.querySelector('.header-main');
        h = parseInt(getComputedStyle(header).height);
    };


    function calculateHeight(){
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    let p = pageYOffset;
    let step = 10;
    let direction = false;

    if(pageYOffset > target.getBoundingClientRect().top + pageYOffset){
        direction = true;
    }

    let int = setInterval(()=>{
        if(direction){
            if(p <= step) clearInterval(int);

            if(p>target.getBoundingClientRect().top + pageYOffset - h){
                p -= step;
            } else {
                clearInterval(int);
            }
        } else {
            if(p >= calculateHeight() - step) clearInterval(int);

            if(p<target.getBoundingClientRect().top + pageYOffset - h){
                p += step;
            } else {
                clearInterval(int);
            }
        }

        scrollTo(pageXOffset,p)
    }, 1);
};


changeOpacity('.anim-opacity');

function changeOpacity(selector){
    document.querySelectorAll(selector).forEach(item => {
        if(window.innerWidth > 768){
            item.classList.add('anim-opacity_trigger');
        } else {
            item.classList.remove('anim-opacity_trigger');
        }        
    });

    func();
    document.addEventListener('scroll',func);

    function func(event){
        if(window.innerWidth <= 768) return;
        document.querySelectorAll('.anim-opacity_trigger').forEach((item,i) => {
            let screenHeight = window.innerHeight;
            let itemY1 = item.getBoundingClientRect().top - (2 * screenHeight / 3);
            let itemY2 = item.getBoundingClientRect().bottom - (1 *screenHeight / 5);

            if(itemY1 < 0 && itemY2 > 0){
                item.classList.add('active');
            }
        });      
    }
};