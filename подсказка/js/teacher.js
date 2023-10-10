

window.addEventListener('load', function open(){   /* Запуск обучения при загрузке страницы */
/*------------------- Высплывающая подсказка у элемента -----------------------*/





 let user = {
  trainingCompleted: false,
 }



  /* Объект подсказки */



 let hint = {
  modalTextWindow: [
    {title: 'Создание программы', fieldModal: 'Это поля, которые необходимо заполнить.'},
    {title: 'Создание программы', fieldModal: 'В периоде действия указывается, когда программа будет доступна.'},
    {title: 'Создание программы', fieldModal: 'Это поля, которыМожно дать доступ к программе сразу всем розничным и/или оптовым компаниям.е необходимо заполнить.'},
    {title: 'Создание программы', fieldModal: 'Можно дать доступ к программе только определенным компаниям.'},
    {title: 'Создание программы', fieldModal: 'После нажатия на кнопку «Добавить» программа появится в системе.'},
    {title: 'Создание программы', fieldModal: 'После нажатия на кнопку «Добавить» программа появится в системе.'},
  ],

  

  countHelp: 0,  /* Счетчик порядка подсказок, соответсвует data-id="1" */
  styleWndw: document.getElementById('bckgModal'), /* Находим фон */
  hidePage: function(){
    hint.styleWndw.style.display = 'block'; /* Затемняем фон */
  },
  showPage: function(){
    hint.styleWndw.style.display = 'none'; /* Убираем фон */
  },
  hintСard: 0, /* Сохраняем подсказку*/
  helpData: document.querySelectorAll('[data-id]'),
  createHint: function(a) {/* Формируем подсказку*/
    console.log('hint.createHint(a) запустился с параметром: ' + a)
    let template = document.querySelector('#templateHelpWindow') /* находим шаблон подсказки */ 
    let helpWindow = template.content.cloneNode(true); /* копируем шаблон */ 
    
    let modalHeaderText = helpWindow.querySelector('.modal-header__text'); /* находим заголовок подсказки */ 
    let modalText = helpWindow.querySelector('.modal-text');  /* находим текст-описание подсказки */ 
    modalHeaderText.textContent = hint.modalTextWindow[a].title; /* вставляем текст-заголовок подсказки */ 
    modalText.textContent = hint.modalTextWindow[a].fieldModal; /* вставляем текст-описание подсказки */ 
    console.log(helpWindow.querySelector('#modalWindow').style.width);


    let exitBtn = helpWindow.getElementById('exit'); /* нашли кнопку "Закрыть" */
    let nextBtn = helpWindow.getElementById('next'); /* нашли кнопку "Далее" */
    let previousBtn = helpWindow.getElementById('previous'); /* нашли кнопку "Назад" */


    if(hint.countHelp > 0) {    /* Если длина счётчика подсказок больше 0, то появляется кнопка "Назад" */           
      previousBtn.style.display = 'block';
    }
  
    if(hint.countHelp == (hint.modalTextWindow.length-1) || hint.countHelp == (hint.helpData.length - 1)) { /* Если длина массива с текстом подсказки равна длинне счётчика или длина счётчика равна длине найденных ID, то убираем кнопку "Далее" */ 
      nextBtn.style.display = 'none';
    }



    /* Обработка события кнопки "Закрыть" - Закрытие модального окна подсказки и выход из обучения */
    exitBtn.addEventListener('click', exitTeacher);
    function exitTeacher(){
      /* Закрытие модального окна  */
      user.trainingCompleted = true;
      console.log('клик')
      hint.showPage();
      hint.returnElementState(a)
    } 

 

     /* Обработка события кнопки "Далее" */
     nextBtn.addEventListener('click', nextTeacher);
     function nextTeacher(){
       hint.countHelp = hint.countHelp + 1; /* увеличиваем счетчик на 1 */
       hint.returnElementState(a);
       startTeacher(hint.countHelp);
     }
     /* Обработка события кнопки "Назад" */
    previousBtn.addEventListener('click', previousTeacher);
    function previousTeacher(){
      hint.countHelp = hint.countHelp - 1; /* уменьшаем счетчик на 1 */
      hint.returnElementState(a);
      startTeacher(hint.countHelp);
    }
    
    hint.hintСard = helpWindow; /* созданную карточку положили в метод объекта*/ 
    

  },
  returnElementState: function(a){ /* Удаляем подсвеченный элемент и возвращаем верстку в первоначальный вид*/ 
    document.querySelector('.modalContant').after(hint.newhelpElement(a));  /*вставляем копию кнопки которую обернули после обернутой кнопки */
    document.querySelector('.modalContant').remove();  /* удаляем обертку и все, что в ней */
  },
  newhelpElement: function(a){
    return document.querySelector('[data-id="' + a + '"]'); /* Находим элемент у которого нужно вставить подсказку*/ 
  },

  preparingPlacesForHints: function(a){ /* Подготавливаем место для подсказки*/ 
    /* Находим место куда нужно вставить подсказку и подготоваливаем его */
    let newhelpElement = document.querySelector('[data-id="' + a + '"]'); /* Находим элемент у которого нужно вставить подсказку*/ 
    let newHelpString = '<div id="modalСontant" class="modalContant">'+ newhelpElement.outerHTML+'</div>'; /* оборачиваем элемент про который нужно вывести подсказку */
    newhelpElement.insertAdjacentHTML('beforebegin', newHelpString); /* вставляем элемент про который нужно вывести подсказку с оберткой после элемента про который нужно вывести подсказку */
    newhelpElement.remove(); /* удаляем элемент про который нужно вывести подсказку без обертки */
  },

  insertHint: function(a) { /* Вставляем подсказку */
    /* Вставляем подсказку */
    let modalContant = document.querySelector('.modalContant'); /* находим div обертку элемента, куда нужно вставить подсказку */
    let coordNewhelpElementInPage = hint.newhelpElement(a).getBoundingClientRect();/* вычисляем расположение элемента про который нужно вывести подсказку  */
    let pageWidth = document.documentElement.scrollWidth;
    let pageHeight = document.documentElement.scrollHeight;

    let coordNewhelpElementInPageTop = coordNewhelpElementInPage.top + window.scrollY; /* растояние от элемента до конца документа сверху*/
    let coordNewhelpElementInPageBottom = pageHeight - (coordNewhelpElementInPage.bottom + window.scrollY); /* растояние от элемента до конца документа снизу*/
   
    /* Вставляем прозрачную подсказку для определения размера, вверх или низ, туда, где больше места */
    if (coordNewhelpElementInPageTop > coordNewhelpElementInPageBottom) { /* если сверху больше, то добавляем подсказку */
    hint.hintСard.querySelector('#modalWindow').style.bottom = 0 + "px";
    modalContant.append(hint.hintСard); 
    console.log('вниз');
    choiceOfLocation(a)
    } else { /* если снизу больше, то добавляем подсказку */
    hint.hintСard.querySelector('#modalWindow').style.top = 0 + "px";
    modalContant.append(hint.hintСard);
    console.log('вверх');
    choiceOfLocation(a);

    } 
    
    function choiceOfLocation(a){  /*Определяем с какой стороны вставить подсказку */
    console.log('choiceOfLocation');
    let hint = document.querySelector('#modalWindow');  /* записываем подсказку в переменную */
    let hintArea = document.querySelector('#modalСontant'); /* записываем область подсказки в переменную */
    let hintElement = document.querySelector('[data-id="' + a + '"]'); /* записываем элемент у которого выводим подсказку в переменную */
 
    let modalWidth = hintElement.offsetWidth; /* измеряем длину подсказки в px */
    let modalHeight = hintElement.offsetHeight; /* измеряем высоту подсказки в px */
    let helpWindowInPageWidth = hintElement.offsetWidth; /* измеряем длину элемента про который нужно вывести подсказку в px */
    let helpWindowInPageHeight = hintElement.offsetHeight; /* измеряем высоту элемента про который нужно вывести подсказку в px */

    let coordNewhelpElementInPageLeft = coordNewhelpElementInPage.left + window.scrollX; /* расстояние от элемента до конца документа слева */
    let coordNewhelpElementInPageTop = coordNewhelpElementInPage.top + window.scrollY; /* расстояние от элемента до конца документа сверху*/
    let coordNewhelpElementInPageRight = pageWidth - (coordNewhelpElementInPage.right + window.scrollX); /* расстояние от элемента до конца документа справа*/
    let coordNewhelpElementInPageBottom = pageHeight - (coordNewhelpElementInPage.bottom + window.scrollY); /* расстояние от элемента до конца документа снизу*/
    info()
    function info(){
      console.log('лево ' + coordNewhelpElementInPageLeft);
      console.log('право ' + coordNewhelpElementInPageRight);
      console.log('вверх ' + coordNewhelpElementInPageTop);
      console.log('низ ' + coordNewhelpElementInPageBottom);
    }
    if (coordNewhelpElementInPageTop > modalHeight/2 && coordNewhelpElementInPageBottom > modalHeight/2 && coordNewhelpElementInPageLeft > modalWidth) { /* если расстояние слева больше или равно длине модального окна, размещаем его по левую сторону от элемента */
    hint.style.right = helpWindowInPageWidth + 20 + "px";
    hint.style.top = "auto";
    hint.style.bottom = "auto";
    console.log('лево');
    } else if (coordNewhelpElementInPageTop > modalHeight/2 && coordNewhelpElementInPageBottom > modalHeight/2 && coordNewhelpElementInPageRight > modalWidth) { /* если расстояние справа больше или равно длине модального окна, размещаем его по правую сторону от элемента */
    hint.style.left = helpWindowInPageWidth + 20 + "px";
    hint.style.top = "auto";
    hint.style.bottom = "auto";
    console.log('право');
    } else if (coordNewhelpElementInPageTop < modalHeight) { /* если расстояние справа больше или равно длине модального окна, размещаем его по правую сторону от элемента */
    hint.style.top = helpWindowInPageHeight + 20 + "px";
    
    hint.style.bottom = "auto";
    hintArea.style.justifyContent = "center";
    console.log('низ');
    } else if (coordNewhelpElementInPageBottom < modalHeight) { /* если расстояние справа больше или равно длине модального окна, размещаем его по правую сторону от элемента */
    hint.style.bottom = helpWindowInPageHeight + 20 + "px";
    
    hint.style.top = "auto";
    hintArea.style.justifyContent = "center";
    console.log('вверх');
    }


    }

  }

 }


 function startTeacher(a){
  if (user.trainingCompleted == false) {   /* если обучение не пройдено, то запускаем все функции */
    hint.hidePage(); /* скрываем фон */
    hint.createHint(a); /* создаем подсказку */
    hint.preparingPlacesForHints(a); /* готовим место для подсказки */
    hint.insertHint(a); /* вставляем подсказку */
  } 
  
}

/* 
! =================== НАЧАЛО ПОТОКА ВЫПОЛНЕНИЯ СКРИПТА =================== 
*/

startTeacher(hint.countHelp); 

}
)

/* 
! =================== КОНЕЦ ПОТОКА ВЫПОЛНЕНИЯ СКРИПТА =================== 
*/
