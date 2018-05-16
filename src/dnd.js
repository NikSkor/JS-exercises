/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

homeworkContainer.style.width = '100%';
homeworkContainer.style.height = '100vh';
homeworkContainer.style.position = 'relative';

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const element = document.createElement('div');
    
    element.className='draggable-div';
    
    function rndNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    } 
    let colorR = rndNum(0, 255);
    let colorG = rndNum(0, 255);
    let colorB = rndNum(0, 255);
    let divWidth = rndNum (0, 1000);
    let divHeight = rndNum (0, 1000);
    let leftPosition = rndNum (0, element.clientWidth);
    let topPosition = rndNum (0, element.clientHeight);
    
    element.style.position ='absolute';
    element.style.backgroundColor = `rgb(${colorR},${colorG},${colorB})`;
    element.style.width = `${divWidth}px`;
    element.style.height = `${divHeight}px`;
    element.style.left = `${leftPosition}px`;
    element.style.top = `${topPosition}px`;

    return element;
   
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.onmousedown = function(e) {
        // var coords = getCoords(target);
        // var shiftX = e.pageX - target.offsetWidth;
        // var shiftY = e.pageY - target.offsetHeight;
        
        moveAt(e);
        function moveAt(e) {
            target.style.left = e.pageX - target.offsetWidth + 'px';
            target.style.top = e.pageY - target.offsetHeight + 'px';
        }
      
        document.onmousemove = function(e) {
            moveAt(e);
        };
        
        target.ondragstart = function() {
            return false;
        }
      
        target.onmouseup = function() {
            document.onmousemove = null;
            target.onmouseup = null;
        };

        // function getCoords(elem) {
        //     var box = elem.getBoundingClientRect();
            
        //     return {
        //         top: box.top + pageYOffset,
        //         left: box.left + pageXOffset
        //     };
        
        // }
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
