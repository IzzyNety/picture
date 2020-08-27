const modals = () => {
  /*  функция привязки окна к тригеру */
   function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
     const trigger = document.querySelectorAll(triggerSelector),
           modal = document.querySelector(modalSelector),
           close = document.querySelector(closeSelector),
           windows = document.querySelectorAll('[data-modal]');
           scroll = calcScroll();
 
     trigger.forEach(item => {
       item.addEventListener('click', (e) => {
         if (e.target) {
           e.preventDefault();
         }
 
         windows.forEach(item => {
           item.style.display = 'none';
         });
   
         modal.style.display = "block";
         document.body.style.overflow = "hidden";
         document.body.style.marginRight = `${scroll}px`;
       });
     });
 
    /*  закрытие окна при нажатии на крестик */
     close.addEventListener('click', () => {
       windows.forEach(item => {
         item.style.display = 'none';
       });
 
       modal.style.display = "none";
       document.body.style.overflow = "";
       document.body.style.marginRight = `0px`;
     });
     
   /*   закрытие модального окна при нажатии в любое место */
     modal.addEventListener('click', (e) => {
       if (e.target === modal && closeClickOverlay) {
         windows.forEach(item => {
           item.style.display = 'none';
         });
   
         modal.style.display = "none";
         document.body.style.overflow = "";
         document.body.style.marginRight = `0px`;
       }
     });
   }
 
  /*  показать модальное окно через определенное время */
   function showModalByTime(selector, time) {
     setTimeout(function() {
       let display;

       document.querySelectorAll('[data-modal]').forEach(item => {
          if(getComputedStyle(item).display !== 'none') {
            display = "block";
          }
       });

       if(!display){
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = "hidden";
       }       
     }, time);
   }
 
   /* подсчитывать растояние в пикселях */
   function calcScroll() {
     let div = document.createElement('div');
 
     div.style.width = '50px';
     div.style.height = '50px';
     div.style.overflowY = 'scroll';
     div.style.visibility = 'hidden';
 
     document.body.appendChild(div);
     let scrollWidth = div.offsetHeight - div.clientWidth;
     div.remove();
 
     return scrollWidth;
   }
  
   bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
   bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')
   showModalByTime('.popup-consultation', 60000);  
 };
 
 export default modals;