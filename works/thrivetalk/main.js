function changeBackgroundHeader(){
	
	const block = document.getElementById('block');
	
	const scheme = {
		beigeHeader: 'header_out beige',
	    transparentHeader: 'header_out',
	};
	
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
	  	if(entry.intersectionRatio < 0.2) { return; }
	    block.className = scheme[entry.target.dataset.color];
	  });
	}, {
		threshold: [0.0, 0.8]
	});
	
	Array.from(document.querySelectorAll('.block')).forEach(item => observer.observe(item))
}

changeBackgroundHeader();

// hiddenScrollAside('.scroll_container');
// window.addEventListener('resize',() => hiddenScrollAside('.scroll_container'));
// window.addEventListener('mouseover',() => hiddenScrollAside('.scroll_container'));
        
// 	function hiddenScrollAside(selector){
// 		document.querySelectorAll(selector).forEach(box =>{            
// 			box.classList.add('scroll-emul_block');
// 			box.style.height = `${(parseInt(getComputedStyle(box).height))}px`;
// 			let cont = box.querySelector('.scroll-emul_container');

// 			if(!box.children[0].classList.contains('scroll-emul_container')){
// 				cont = document.createElement('div');
// 				cont.classList = 'scroll-emul_container';

// 				let content = document.createElement('div');
// 				content.classList = 'scroll-emul_content';

// 				while(box.children.length){
// 					content.append(box.children[0])
// 				}

// 				let line = document.createElement('div');
// 				line.classList = 'scroll-emul_line';

// 				let line_item = document.createElement('div');
// 				line_item.classList = 'scroll-emul_line_item';

// 				cont.append(content);
// 				line.append(line_item);
// 				cont.append(line);
// 				box.append(cont);

// 				let n = content.offsetWidth - content.clientWidth - content.clientLeft;
// 				if(n<=0) n = 20;
// 				content.style.width = `calc(100% + ${n}px)`;
// 				content.style.paddingRight = `${n}px`;

// 				let contentFullHeight = 0;
// 				for(let i = 0; i<content.children.length; i++){
// 					contentFullHeight += parseFloat(content.children[i].offsetHeight);
// 				};
// 				let line_itemHeight = (parseFloat(content.offsetHeight) / contentFullHeight) * 100;
// 				console.log(content)
// 				console.log(contentFullHeight)
// 				line.hidden = (line_itemHeight >= 100)
// 				line_item.style.height = `${line_itemHeight}%`;

// 				content.addEventListener('scroll', scrollContent);

// 				function scrollContent(e){
// 					line_item.style.top = `${(e.target.scrollTop / contentFullHeight) * 100}%`;
// 				}
// 			}
// 		})
// 	};