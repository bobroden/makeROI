import ModalTable from "./modal-table.js";

const htmlDocument = document.querySelector('html');

const transparentBackground = document.querySelector('.transparent-background');
const modalWindow = document.querySelector('.modal-window');
const spinner = document.querySelector('.spinner');
const modalTableElement = document.querySelector('.modal-table');
const errorWindow = document.querySelector('.error');
const errorCloseButton = document.querySelector('.error__close-icon');

const modalTable = new ModalTable();

class Server {
    users;
    filteredUsers;

    constructor(url) {
        this.url = url;
        errorCloseButton.addEventListener('click', () => {
            errorWindow.classList.add('none');
            transparentBackground.classList.add('none');
            htmlDocument.classList.remove('_none-scroll-bar');
        })
    }

    getFilteredUsers(userId, completed) {
        transparentBackground.classList.add('transparent-background_for-spinner');
        modalWindow.classList.add('none');
        spinner.classList.remove('none');

        fetch(this.url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => {
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
        .then(data => {
            this.users = data;

            setTimeout(() => {
                transparentBackground.classList.remove('transparent-background_for-spinner');
                spinner.classList.add('none');
                modalTableElement.classList.remove('none');
            }, 1500)

            this.filteredUsers = this.users.filter(user => user.userId === userId && user.completed === completed);
            modalTable.show(this.filteredUsers);
        })
        .catch(() => {
            setTimeout(() => {
                transparentBackground.classList.remove('transparent-background_for-spinner');
                spinner.classList.add('none');
                errorWindow.classList.remove('none');
            }, 1500)
        })
    }
}

export default Server;