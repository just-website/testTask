window.onload = function() {
    scroll('.button--move-up'); // плавный скрол
    toggleSort('.main__sort span'); // иконки сортировки
    validate('#form', '#email'); // валидация формы
} 

function scroll(elem) {
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

function toggleSort(elem) {
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

function validate(form, email) {
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
