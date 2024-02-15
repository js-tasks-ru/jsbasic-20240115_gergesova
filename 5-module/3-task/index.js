function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right'); // правая кнопка
  const buttonLeft = document.querySelector('.carousel__arrow_left'); // левая кнопка
  const tape = document.querySelector('.carousel__inner'); // лента прокрутки


  let tapeWidth = tape.offsetWidth; //длина одного слайда

  let i = 0; // счетчик слайдов
  if (i == 0) buttonLeft.style.display = 'none';//спрятать кнопку на 1 слайде

  buttonRight.addEventListener('click', () => { //сдвиг слайдов влево
    i++;
    tape.style.transform = 'translateX(' + -tapeWidth * i + 'px)';
    if (i == 3) buttonRight.style.display = 'none'; //cпрятать кнопку на последнем слайде
    if (i > 0 && i <= 3) buttonLeft.style.display = '';//показать кнопку при прокрутке влево
  });


  buttonLeft.addEventListener('click', () => { //сдвиг слайдов вправо
    i--;
    tape.style.transform = 'translateX(' + -tapeWidth * i + 'px)';
    if (i == 0) buttonLeft.style.display = 'none';//спрятать кнопку на 1 слайде
    if (i >= 0 && i < 3) buttonRight.style.display = '';//показать кнопку при прокрутке вправо
  });
}
