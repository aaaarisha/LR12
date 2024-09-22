import User from './User.js'; // Импортируем класс User

class Contacts {
    constructor() {
        this.data = []; // Массив для хранения всех контактов
    }

    add(userData) {
        const newUser = new User(userData);
        this.data.push(newUser);
    }

    edit(id, updatedData) {
        const user = this.data.find(user => user.get().id === id);
        if (user) {
            user.edit(updatedData);
        }
    }

    remove(id) {
        this.data = this.data.filter(user => user.get().id !== id);
    }

    get() {
        return this.data.map(user => user.get());
    }
}

export default Contacts; // Экспортируем класс
