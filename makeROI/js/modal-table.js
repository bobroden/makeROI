const modalTableElement = document.querySelector('.modal-table');
const modalTableBody = document.querySelector('.modal-table__body');
const closeModalTableButton = document.querySelector('.modal-table__close-icon');
const transparentBackground = document.querySelector('.transparent-background');
const htmlDocument = document.querySelector('html');

class ModalTable {

    constructor() {
        closeModalTableButton.addEventListener('click', () => { // клик, чтобы закрыть таблицу
            modalTableBody.innerHTML = '';
            modalTableElement.classList.add('none');
            transparentBackground.classList.add('none');
            htmlDocument.classList.remove('_none-scroll-bar');
        });
    }

    show(users) { // заполенение таблицы
        modalTableBody.innerHTML = '';
        users.forEach(user => {
            modalTableBody.innerHTML += `
                <tr class="modal-table__row">
                    <td class="modal-table__cell">${user.userId}</td>
                    <td class="modal-table__cell">${user.id}</td>
                    <td class="modal-table__cell">${user.title}</td>
                    <td class="modal-table__cell">${user.completed}</td>
                </tr>
            `
        });
    }
}

export default ModalTable;