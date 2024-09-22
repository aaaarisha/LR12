class User {
    constructor(data) {
        this.data = data; // Храним данные контакта
    }

    edit(obj) {
        this.data = { ...this.data, ...obj }; // Обновляем данные контакта
    }

    get() {
        return this.data;
    }
}

export default User; // Экспортируем класс
