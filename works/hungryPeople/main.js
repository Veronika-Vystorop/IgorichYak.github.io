class Menu {
    constructor(parent) {
        this.parent = parent;
        this.currentWidth = 0;

        if (document.documentElement.clientWidth <= 1100) {
            this.currentWidth = 1;
            this.hideAll();
        } else this.currentWidth = 2;
        
        window.addEventListener('resize', this.resizeHandler.bind(this));
        this.parent.addEventListener('click', this.clickHandler.bind(this));
    }

    hideAll(){
        this.parent.querySelectorAll('.menu_price_block').forEach(block => block.classList.remove('active'));
    }

    showMenu() {
        this.parent.querySelector('.' + this.target.dataset.label).classList.add('active');
    }

    changeCategoriaColor() {
        this.categoriesMenu = this.parent.querySelectorAll('.menu_categories_item');
        
        this.categoriesMenu.forEach(item => {
            item.classList.remove('active');
        });

        this.target.classList.add('active');
    }

    showOrHideMobileMenu() {
        this.parent.querySelector('.' + this.target.dataset.label).classList.toggle('active');
    }

    resizeHandler(){
        this.newWidth = document.documentElement.clientWidth;
        
        if (this.newWidth <= 1100) {
            this.newWidth = 1;
            
            if (this.newWidth < this.currWidth) {

                this.currWidth = this.newWidth;
            }
        } else {
            this.newWidth = 2;
            this.currWidth = this.newWidth;
            this.blocks = this.parent.querySelectorAll('.menu_price_block');

            for (let i = 0; i < this.blocks.length; i++) {
                if (this.blocks[i].classList.contains('active')) {
                    return;
                }
            }

            this.parent.querySelector('.menu_price_block.menu_soupe_price').classList.add('active');
            
        }
    }

    clickHandler(){
        this.target = event.target;

        if (document.documentElement.clientWidth > 1100) {
            
            if (this.target.className != 'menu_categories_item') return;
            
            this.hideAll();
            this.showMenu(this.target);
            this.changeCategoriaColor(this.target);
        }
        
        if (document.documentElement.clientWidth <= 1100 && this.target.classList.contains('menu_categories_mobile')) {
            
            this.showOrHideMobileMenu(this.target);
        }
    }
}

document.querySelectorAll('.menu_categories_container').forEach(parent => new Menu(parent));

function overflowForBody() {
    let checkbox = document.getElementById('check_menu');

    document.body.style.overflow = (checkbox.checked) ? 'hidden' : 'visible';
}

document.addEventListener('scroll', function() {
    document.querySelectorAll('header').forEach(header => {
        if (pageYOffset > 10) {
            header.classList.add('black'); 
        } else {
            header.classList.remove('black'); 
        }
    });
});

document.addEventListener('click', handlerClickLinks);

function handlerClickLinks(event){
    if(!(event.target.closest('a') && event.target.closest('a').getAttribute('href').split('')[0] == '#')) return;
    event.preventDefault();
    let a = event.target.closest('a');

    if (a.classList.contains('active_item')) {
        document.querySelectorAll('.active_item').forEach((item) => {
            item.classList.remove('active_menu');
        });

        a.classList.add('active_menu');
        document.getElementById('check_menu').checked = false;
        document.body.style.overflow = 'visible';
    }
    
    let target = document.getElementById(`${a.getAttribute('href').split('#')[1]}`);
    if(!target) return;
    let h = 0;
    if(document.querySelector('.header')){
        let header = document.querySelector('.header');
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

emulateSelector('.book_table_select');

function emulateSelector(select) {
    let selects = document.querySelectorAll(select);

    selects.forEach((select) =>{
        select.hidden = true;

        let emul = document.createElement('div');
        emul.classList = "select";
        emul.setAttribute('tabindex','1');
        emul.onblur = function(){
            this.classList.remove('active');
        };

        let emulList = document.createElement('div');
        emulList.classList = "select_list";
        emul.append(emulList);

        select.querySelectorAll('option').forEach((item)=>{
            let option = document.createElement('div');
            option.classList = "select_option";
            option.innerHTML = item.innerHTML;
            option.dataset.value = item.value;

            option.onclick = ()=>{
            emul.classList.toggle('active')
            select.value=option.dataset.value;

            let evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', true, true);
            select.dispatchEvent(evt);

            option.parentNode.querySelectorAll('.select_option').forEach((option)=>{
                option.classList.remove('selected')
            });
            option.classList.add('selected');
            };

            if(item.selected) {
            option.classList.add('selected');
            } 

            if(item.disabled) option.classList.add('disabled');
            emulList.append(option);
        });

        select.parentNode.append(emul);

        let selectHeight = 0;
        if(emul.querySelector('.select_option.selected')) {
            selectHeight = getComputedStyle(emul.querySelector('.select_option.selected')).height;
        } else {
            selectHeight = getComputedStyle(emul.querySelector('.select_option')).height;
        }
        emul.style.height = selectHeight;
        emulList.style.height = selectHeight;
    })

    let z = 1;

    for(let i=selects.length - 1; i>=0; i--) {
        selects[i].parentNode.querySelector('.select').style.zIndex = `${z}0`;
        z++;
    }
};