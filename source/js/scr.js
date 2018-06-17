window.onload = function() {
    scroll('.button--move-up'); // плавный скрол
    toggleSort('.main__sort span'); // иконки сортировки
    validate('#form', '#email'); // валидация формы
    toggleClass('.order-card', 'bookmark'); // вешаем ярлык "закладки"
    sort('.order-card', '.main__sort span');
} 

const scroll = elem => {
    var button = document.querySelector(elem);
    button.addEventListener('click', () => {
        animate();
    })

    function animate() {
        var curentX = document.documentElement.scrollTop; // получаем позицию скрола
        var scroll = setInterval( () => {
            if (curentX <= 0) clearInterval(scroll); // если позиция <= 0, то прекращаем скрол
            window.scrollBy(0, -5); // скролим каждые 5мс на 5px от текущей позиции
            curentX -= 5;
        }, 5)
    }
}

const toggleSort = (elem) => {
    var elems = document.querySelectorAll(elem);
    
    elems.forEach(el => {
        el.addEventListener('click', function() { // вешаем слушатель на каждый dom-node

            elems.forEach( el => {
                if (el != this) el.classList.remove('sort-icon--up', 'sort-icon--down'); // убираем иконку сортировки со всех dom-node, кроме текущей
            })

            if (this.classList.contains('sort-icon--up')) { // заменяем или добавляем иконку сортировки к текущей dom-node
                this.classList.remove('sort-icon--up');
                this.classList.add('sort-icon--down');
            }

            else if (this.classList.contains('sort-icon--down')) { // заменяем или добавляем иконку сортировки к текущей dom-node
                this.classList.remove('sort-icon--down');
                this.classList.add('sort-icon--up');
            }

            else this.classList.add('sort-icon--up'); // заменяем или добавляем иконку сортировки к текущей dom-node
        })
    })
}

const validate = (form, email) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var form = document.querySelector(form);
    var mail = document.querySelector(email);

    form.addEventListener('submit', function(event) {
        if ( !reg.test(mail.value)) { // проверяем email регуляркой. Если проверка == false, отменяем отправку формы
            event.preventDefault();
            mail.style.outline = '2px solid red';
            alert('Введите корректный e-mail');
            return false;
        }
    })
    
}

const toggleClass = (tagName, className) => {
    document.querySelectorAll(tagName).forEach( el => {
        el.addEventListener('click', function(event) {
            if (event.target.tagName == 'BUTTON') this.classList.toggle(className);
        })
    })
}


const sort = (sortSelector, btnSelector) => {
    const elems = document.querySelectorAll(sortSelector);
    const buttons = document.querySelectorAll(btnSelector);
    const parent = elems[0].parentNode.parentNode; // сохраняем ссылку на родительский dom контейнер

    buttons.forEach( el => {
        el.addEventListener('click', function() {
            const sortToo = this.classList.contains('sort-icon--up') ? true : false; // проверяем нажимали ли раньше на кнопку
            const sortElems = sortNodeList(elems, sortToo, this);
            clearElem(elems); // убираем елементы из dom
            reFieldElem(sortElems, parent); // заполнеям dom отсортированными нодами
        })
    })
}

const reFieldElem = (nodeList, parentElem) => {
    const parent = nodeList[0].parentNode;
    parentElem.appendChild(parent); // добавляем родительский контейнер в dom
    nodeList.forEach( el => {
        el.parentNode.appendChild(el);
    })
}

const clearElem = nodeList => { // убираем елементы из dom
    nodeList.forEach( el => {
        el.parentNode.remove(el);
    })
} 

const sortNodeList = (nodeList, sortUp, root) => { // sortUp - не обязательный аргумент
    // const sortUp = 
    const method = root.classList.contains('date') ? 'date' : 'ready';
    const array = Array.from(nodeList);
    return sortUp 
        ? array.sort((a, b) => getKey(a, method) - getKey(b, method)) 
        : array.sort((a, b) => getKey(b, method) - getKey(a, method)); // сортируем по возростанию или убыванию
} 

const dateParse = string => { // получаем дату из строки вида dd.mm.yy
    let [day, month, year] = string.split('.');
    return new Date( +`20${year}`, +month-1, +day);
}

const getKey = (el, method) => {
    return method === 'date' 
        ? dateParse(el.querySelector('.order-card__discription--date').textContent.split(' ')[1]) // получаем строку с датой. наговнякал, получилось нечитаемо, нодо рефракторить
        : el.querySelector('.order-card__status').textContent.length;
}
