/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function createCookie(name, value) {
    if (name == undefined || value == undefined) {
        return;
    }
    document.cookie = `${name}=${value}`;
}
function cookieRow(name, value) {
    let row = document.createElement('TR');

    row.className='row';
    row.innerHTML = `<td>${name}</td><td>${value}</td><td><button>Удалить</button></td>`;
    listTable.appendChild(row);
}
listTable.addEventListener('click', (e)=> {
    let elem = e.target;
    
    if (elem.tagName === 'BUTTON') {
        let cookieName = elem.closest('.row').firstElementChild.innerText;
        
        listTable.removeChild(elem.closest('.row'));
        deleteCookie(cookieName);
    }
})

function deleteCookie (cookieName) {
    let cookieDate = new Date ( );
    
    cookieDate.setTime ( cookieDate.getTime() - 1 );
    document.cookie = cookieName += '=; expires=' + cookieDate.toGMTString();
}
function isMatching(full, chunk) {
    function toLower (str) {
        return str.toLowerCase();
    }
    if (chunk != '') {
        if (toLower (full).indexOf(toLower (chunk))!=-1) {
        
            return true;
        }
    }
    
    return false;
}
function getCookie() {
    let cookie = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
      
        prev[name]=value;
      
        return prev;
    }, {});
    
    return cookie;
}
function listCookie() {
    let cookie = getCookie();
    let chunk = filterNameInput.value;

    if (chunk) {
        listTable.innerHTML='';
        if (cookie) {
            Object.keys(cookie).forEach(item => {
                if (isMatching(cookie[item], chunk) || isMatching(item, chunk)) {
                    cookieRow(item, cookie[item]);
                }
            });   
        }
        
    }
    if (chunk=='') {
        listTable.innerHTML='';
        if (cookie) {
            Object.keys(cookie).forEach(item => {
                cookieRow(item, cookie[item]);
            });   
        }
    }
}
listCookie();
filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    listCookie();

});
addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie" 
    let cookieName = addNameInput.value;
    let cookieValue = addValueInput.value;
    let cookie = getCookie();

    if (cookie[cookieName]) {
        deleteCookie(cookieName);
    }
    
    createCookie(cookieName, cookieValue);
    listCookie();

});
