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

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

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

window.addEventListener('load', ()=>{
    const allCookie = parseCookie();
    fillRows(allCookie);
});
listTable.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-button')) {
        deleteCookie(e.target.dataset.name);
        removeRow(e.target.closest('tr'));
    }
});

addButton.addEventListener('click', function () {
    const cookieName = addNameInput.value;
    const cookieValue = addValueInput.value;
    addCookie(cookieName,cookieValue);
    fillRows(parseCookie());
});
filterNameInput.addEventListener('keyup',function () {
    const filterValue = filterNameInput.value;
    let cookie = parseCookie();
    for(let val in cookie) {
        const res = toString(val+cookie[val]);
        console.log(res);
    }



});
function crateTableRow(name,value) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdRemove = document.createElement('td');
    const button = document.createElement('button');

    tdName.innerText = name;
    tdValue.innerText = value;
    button.innerText = 'Удалить';

    button.dataset.name = name;
    button.classList.add('remove-button');
    tdRemove.appendChild(button);

    tr.classList.add(name);
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdRemove);
    listTable.appendChild(tr);
}

function fillRows(cookies) {
    listTable.innerHTML = '';
    for (let name in cookies) {
        let value = cookies[name];
        crateTableRow(name, value);
    }
}
function addCookie(cookieName,cookieValue) {
    document.cookie = `${cookieName}=${cookieValue}`;
}
function parseCookie() {

    let cookies = document.cookie.split('; ').reduce((prev, current)=>{
        let [name, value] = current.split('=');
        prev[name] = value;
        return prev;
    }, {})
    return cookies;
}

function deleteCookie(name) {
    document.cookie = `${name}=''; expires='Sun Feb 01 1998 00:00:00 GMT'`;
}
function removeRow(row) {
    row.parentNode.removeChild(row);
}