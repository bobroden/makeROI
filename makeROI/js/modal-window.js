import Server from "./server.js";

const htmlDocument = document.querySelector('html');

const formButton = document.querySelector('.header__form-button');
const transparentBackground = document.querySelector('.transparent-background');
const modalWindow = document.querySelector('.modal-window');
const closeModalWindowButton = document.querySelector('.modal-window__close-icon');
const cancelButton = document.querySelector('.modal-window__cancel-button');
const sendButton = document.querySelector('.modal-window__send-button');
const nameInput = document.querySelector('.modal-window__name-input');
const phoneInput = document.querySelector('.modal-window__phone-input');

const server = new Server('https://jsonplaceholder.typicode.com/todos'); // создание класса работы с сервером

class ModalWindow {

    isNameValidate = false; // состояние валидации имени
    isPhoneValidate = false; // состояние валидации телефона

    constructor() {

        this.blockSendButton(); // блокирование/разблокирование кнопки отправки

        formButton.addEventListener('click', () => { // клик, чтобы открыть модальное окно
            transparentBackground.classList.remove('none');
            modalWindow.classList.remove('none');
            htmlDocument.classList.add('_none-scroll-bar');
            this.nameValidate(nameInput.value);
            this.phoneValidate(phoneInput.value);
        })

        closeModalWindowButton.addEventListener('click', this.closeWindow); // закрытие модального окна через "крестик"
        cancelButton.addEventListener('click', this.closeWindow); // закрытие модального окна через кнопку "Отменить"

        nameInput.addEventListener('focus', (event) => { // фокусировка, чтобы проверить валидацию имени
            if(event.target.value.length != 0) {
                this.nameValidate(event.target.value);
            }
        })

        nameInput.addEventListener('input', (event) => { // ввод, чтобы проверить валидацию имени
            if(event.target.value.length != 0) {
                this.nameValidate(event.target.value);
            }
        })

        phoneInput.addEventListener('focus', (event) => { // фокусировка, чтобы проверить валидацию телефона
            if(event.target.value.length != 0) {
                this.phoneValidate(event.target.value);
            }
        })

        phoneInput.addEventListener('input', (event) => { // ввод, чтобы проверить валидацию телефона
            if(event.target.value.length != 0) {
                this.phoneValidate(event.target.value);
            }
        })

        sendButton.addEventListener('click', () => { // клик, чтобы отправить запрос
            if(!sendButton.classList.contains('modal-window__send-button_blocked')) {
                server.getFilteredUsers(5, false);
            }
        })
    }

    closeWindow() { // закрытие модального окна
        transparentBackground.classList.add('none');
        modalWindow.classList.add('none');
        htmlDocument.classList.remove('_none-scroll-bar');
        nameInput.classList.remove('modal-window__name-input_error');
        phoneInput.classList.remove('modal-window__phone-input_error');
    }

    blockSendButton() { // блокировка/разблокировка кнопки отправки
        if(this.isNameValidate && this.isPhoneValidate) {
            sendButton.classList.remove('modal-window__send-button_blocked');
        }
        else {
            sendButton.classList.add('modal-window__send-button_blocked');
        }
    }

    nameValidate(name) { // валидация имени
        if(name.length === 0) {
            this.isNameValidate = false;
            return;
        }
        else if(name.length < 3 || !/^[a-zA-Z]+$/.test(name)) {
            this.isNameValidate = false;
            nameInput.classList.add('modal-window__name-input_error');
        }
        else {
            this.isNameValidate = true;
            nameInput.classList.remove('modal-window__name-input_error');
        }
        this.blockSendButton();
    }

    phoneValidate(phone) { // валидация телефона
        if(phone.length === 0) {
            this.isPhoneValidate = false;
            return;
        }
        else if(
            (phone.length === 12 && phone.slice(0, 2) === '+7' && /^\d+$/.test(phone.slice(1))) ||
            (phone.length === 11 && phone[0] === '8' && /^\d+$/.test(phone))) {
                this.isPhoneValidate = true;
                phoneInput.classList.remove('modal-window__phone-input_error');
        }
        else {
            this.isPhoneValidate = false;
            phoneInput.classList.add('modal-window__phone-input_error');
        }
        this.blockSendButton();
    }
}

export default ModalWindow;