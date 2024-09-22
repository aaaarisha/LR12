import Contacts from './Contacts.js'; // Импортируем класс Contacts

class ContactsApp extends Contacts {
    constructor() {
        super(); // Наследуем методы и свойства из класса Contacts
        this.app = document.createElement('div'); // Создаем контейнер для приложения
        this.app.classList.add('contacts');
        document.body.appendChild(this.app); // Добавляем его в DOM
        this.render(); // Отрисовываем интерфейс
        this.currentEditId = null; // Храним ID редактируемого контакта
    }

    render() {
        this.app.innerHTML = `
            <form id="contact-form">
                <input type="text" id="name" placeholder="Имя" required>
                <input type="email" id="email" placeholder="Email" required>
                <input type="text" id="address" placeholder="Адрес" required>
                <input type="text" id="phone" placeholder="Телефон" required>
                <button type="submit">Добавить контакт</button>
                <button type="button" id="save-edit" style="display:none;">Сохранить изменения</button>
            </form>
            <div id="contact-list"></div>
        `;

        const form = this.app.querySelector('#contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUser = {
                id: Date.now(),
                name: form.name.value,
                email: form.email.value,
                address: form.address.value,
                phone: form.phone.value
            };
            this.onAdd(newUser);
            form.reset(); // Сброс формы после добавления
        });

        // Обработчик для кнопки "Сохранить изменения"
        const saveButton = this.app.querySelector('#save-edit');
        saveButton.addEventListener('click', () => {
            this.saveEdit();
        });
    }

    onAdd(newUser) {
        if (newUser.name && newUser.email && newUser.address && newUser.phone) {
            this.add(newUser);
            this.updateContactList(); // Обновляем список контактов
        } else {
            console.log('Пожалуйста, заполните все поля.');
        }
    }

    onEdit(id) {
        const user = this.data.find(user => user.get().id === id);
        if (user) {
            const form = this.app.querySelector('#contact-form');
            form.name.value = user.get().name;
            form.email.value = user.get().email;
            form.address.value = user.get().address;
            form.phone.value = user.get().phone;

            // Показываем кнопку "Сохранить изменения"
            const saveButton = this.app.querySelector('#save-edit');
            saveButton.style.display = 'block';

            // Сохраняем id для дальнейшего редактирования
            this.currentEditId = id;
        }
    }

    saveEdit() {
        const form = this.app.querySelector('#contact-form');
        const updatedUser = {
            id: this.currentEditId,
            name: form.name.value,
            email: form.email.value,
            address: form.address.value,
            phone: form.phone.value
        };
        this.edit(this.currentEditId, updatedUser);
        this.updateContactList(); // Обновляем список контактов
        form.reset(); // Сброс формы
        this.currentEditId = null; // Удаляем id редактирования

        // Скрываем кнопку "Сохранить изменения"
        const saveButton = this.app.querySelector('#save-edit');
        saveButton.style.display = 'none';
    }

    onRemove(id) {
        this.remove(id);
        this.updateContactList(); // Обновляем список контактов
    }

    updateContactList() {
        const contactList = this.app.querySelector('#contact-list');
        contactList.innerHTML = this.data.map(user => `
            <div>
                <p>${user.get().name} - ${user.get().email} - ${user.get().address} - ${user.get().phone}</p>
                <button onclick="app.onEdit(${user.get().id})">Редактировать</button>
                <button onclick="app.onRemove(${user.get().id})">Удалить</button>
            </div>
        `).join('');
    }
}

export default ContactsApp; // Экспортируем класс
