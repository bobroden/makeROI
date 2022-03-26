import ModalTable from "./modal-table.js";

const htmlDocument = document.querySelector('html');

const transparentBackground = document.querySelector('.transparent-background');
const modalWindow = document.querySelector('.modal-window');
const spinner = document.querySelector('.spinner');
const modalTableElement = document.querySelector('.modal-table');
const errorWindow = document.querySelector('.error');
const closeErrorButton = document.querySelector('.error__close-icon');

const modalTable = new ModalTable();

class Server {
    users; // все пользователи
    filteredUsers; // отфильтрованные пользователи

    constructor(url) {
        this.url = url; // url-адрес для соединения с сервером
        closeErrorButton.addEventListener('click', () => { // клик, чтобы закрыть окно ошибки (если она возникнет)
            errorWindow.classList.add('none');
            transparentBackground.classList.add('none');
            htmlDocument.classList.remove('_none-scroll-bar');
        })
    }

    getFilteredUsers(userId, completed) { // получение отфильтрованных данных из сервера
        transparentBackground.classList.add('transparent-background_for-spinner');
        modalWindow.classList.add('none');
        spinner.classList.remove('none'); // появление спиннера

        fetch(this.url, { // отправка запроса на сервер
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => { // проверка на ошибку
            if(response.status >= 200 && response.status < 300) {
                return response;
            }
            else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(response => response.json())
        .then(data => { // получение данных
            this.users = data;

            setTimeout(() => { // показ таблицы (setTimeout нужен, чтобы быстро не пропадал спиннер)
                transparentBackground.classList.remove('transparent-background_for-spinner');
                spinner.classList.add('none');
                modalTableElement.classList.remove('none');
            }, 1500)

            this.filteredUsers = this.users.filter(user => user.userId === userId && user.completed === completed); // фильтровка данных
            modalTable.show(this.filteredUsers); // отрисовка отфильтрованных данных в таблице
        })
        .catch(() => { // обработка ошибки
            setTimeout(() => {
                transparentBackground.classList.remove('transparent-background_for-spinner');
                spinner.classList.add('none');
                errorWindow.classList.remove('none');
            }, 1500)
        })
    }
}

export default Server;