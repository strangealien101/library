

window.addEventListener('load', function open(){   /* Запуск обучения при загрузке страницы */
/*------------------- Высплывающая подсказка у элемента -----------------------*/


/*------------------- Плашка со справкой справа -----------------------*/

/* Появление окна справки по работе с системой */

let buttonHelpWindow = document.getElementById('bookMark').onclick = function() {  /* При нажатии на закладку, у нас добавляется класс, при повторном нажатии класс удаляется */
    document.getElementById('program').classList.toggle('block-programs__play');
    document.getElementById('bookMark').classList.toggle('bookmarkExit');
  }

/* Окно для заполнения формы для связи */

let stringAid = document.getElementById('aid'); /* находим по id элемент "Написать в поддержку" */
let formAid = document.getElementById('connection')  /* находим по id контейнер с формой для заполнения */

function openAid() {                    /* при клике на элемент вызываем функцию, где у нас появляется форма */
  formAid.style.display = 'block'
}

stringAid.addEventListener('click', openAid); 

let exitForm = document.getElementById('btnExit'); /* находим по id кнопку закрытия окна формы */

function exitAid() {                    /* при клике на элемент вызываем функцию, где закрывается форма */
  formAid.style.display = "none";
}

exitForm.addEventListener('click', exitAid);

/* Запуск обучения */

 let startBtn = document.getElementById('start');


}
)