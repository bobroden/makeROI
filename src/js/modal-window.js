import Server from "./server.js";

const htmlDocument = document.querySelector('html');

const formButton = document.querySelector('.header__form-button');
const transparentBackground = document.querySelector('.transparent-background');
const modalWindow = document.querySelector('.modal-window');
const closeButton = document.querySelector('.modal-window__close-icon');
const cancelButton = document.querySelector('.modal-window__cancel-button');
const sendButton = document.querySelector('.modal-window__send-button');
const nameInput = document.querySelector('.modal-window__name-input');
const phoneInput = document.querySelector('.modal-window__phone-input');

const server = new Server('https://jsonplaceholder.typicode.com/todos');

class ModalWindow {

    isNameValidate = false;
    isPhoneValidate = false;

    constructor() {

        this.blockSendButton();

        formButton.addEventListener('click', () => {
            transparentBackground.classList.remove('none');
            modalWindow.classList.remove('none');
            htmlDocument.classList.add('_none-scroll-bar');
            this.nameValidate(nameInput.value);
            this.phoneValidate(phoneInput.value);
        })

        closeButton.addEventListener('click', this.closeWindow);
        cancelButton.addEventListener('click', this.closeWindow);

        nameInput.addEventListener('focus', (event) => {
            if(event.target.value.length != 0) {
                this.nameValidate(event.target.value);
            }
        })

        nameInput.addEventListener('input', (event) => {
            if(event.target.value.length != 0) {
                this.nameValidate(event.target.value);
            }
        })

        phoneInput.addEventListener('focus', (event) => {
            if(event.target.value.length != 0) {
                this.phoneValidate(event.target.value);
            }
        })

        phoneInput.addEventListener('input', (event) => {
            if(event.target.value.length != 0) {
                this.phoneValidate(event.target.value);
            }
        })

        sendButton.addEventListener('click', () => {
            if(!sendButton.classList.contains('modal-window__send-button_blocked')) {
                server.getFilteredUsers(5, false);
            }
        })
    }

    closeWindow() {
        transparentBackground.classList.add('none');
        modalWindow.classList.add('none');
        htmlDocument.classList.remove('_none-scroll-bar');
        nameInput.classList.remove('modal-window__name-input_error');
        phoneInput.classList.remove('modal-window__phone-input_error');
    }

    blockSendButton() {
        if(this.isNameValidate && this.isPhoneValidate) {
            sendButton.classList.remove('modal-window__send-button_blocked');
        }
        else {
            sendButton.classList.add('modal-window__send-button_blocked');
        }
    }

    nameValidate(name) {
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

    phoneValidate(phone) {
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