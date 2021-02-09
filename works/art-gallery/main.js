//Masonry

let container = document.querySelector('.works_gallery');
let msnry = new Masonry( container, {
  itemSelector: '.works_gallery_item'
});

//Slider

let sliderMenuArray = document.querySelectorAll('.prices_header_menu_item');

document.querySelector('.prices_header_menu').addEventListener('click', function(e) {
  sliderMenuArray.forEach((item, i) => {
    
    item.classList.remove('active');

    if (item == e.target) {
      document.querySelectorAll('.prices_content').forEach(price => {
        price.classList.remove('active');
      });
      
      document.querySelector(`.prices_content:nth-child(${i+1})`).classList.add('active');
      item.classList.add('active');
    }
  });
});

//header position

window.addEventListener('scroll', function() {
  let topHeaderHeight = document.querySelector('.top_header').offsetHeight;

  if (document.documentElement.clientWidth > 1100) {

    if (this.pageYOffset > topHeaderHeight) {
      document.querySelector('.bottom_header').setAttribute("style", "position:fixed; box-shadow: 0 0 22px -4px rgb(0 0 0 / 17%);");
    } else {
      document.querySelector('.bottom_header').setAttribute("style", "position:unset; box-shadow: none;");
    }

  } 
});

// padding of the main section

function changePadding() {
  let headerHeight = document.querySelector('.header').offsetHeight;
  let topHeaderHeight = document.querySelector('.top_header').offsetHeight;
  let mainBlock = document.querySelector('.section_main_wrapper');

  if (document.documentElement.clientWidth < 1100) {
    document.querySelector('.mobile_header').style.top = topHeaderHeight - 3 + 'px';
    mainBlock.style.paddingTop = topHeaderHeight + 50 + 'px';
    return;
  }

    document.querySelector('.mobile_header').style.top = headerHeight - 3 + 'px';
    mainBlock.style.paddingTop = headerHeight + 50 + 'px';
}

changePadding();

window.addEventListener('resize', changePadding);

//mobile burger-menu

function switchClass(elem) {
  document.querySelector(elem).classList.toggle('active');
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu_toggle_wrapper') || e.target.classList.contains('menu_toggle')) {

    if (document.querySelector('.phone_block_wrapper').classList.contains('active')) {
      switchClass('.phone_block_dot');
      switchClass('.phone_block_wrapper');
    }

    switchClass('.menu_toggle_wrapper');
    switchClass('.mobile_header');
  }

  if (e.target.classList.contains('phone_dots_block') || e.target.classList.contains('phone_block_dot')) {

    if (document.querySelector('.menu_toggle_wrapper').classList.contains('active')) {
      switchClass('.menu_toggle_wrapper');
      switchClass('.mobile_header');
    }

    switchClass('.phone_block_dot');
    switchClass('.phone_block_wrapper');
  }
});