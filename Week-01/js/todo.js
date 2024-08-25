class ToDo {
    constructor() {
        this.todos = []
    }
    add(todo) {
        this.todos = this.todos.concat(todo)
    }
    remove(index) {
        this.todos = this.todos.slice(0, index).concat(this.todos.slice(index,))
    }
    update(index, newTodo) {
        this.todos[index] = newTodo
    }
    getAll() {
        return this.todos
    }
    get(index) {
        return this.todos[index]
    }
    clear() {
        this.todos = []
    }
}

todo = new ToDo();
todo.add('Task-1')
todo.add('Task-2')
todo.add('Task-3')
console.log(todo.getAll());
todo.get(2);

todo.add('Task-4')
todo.remove(2);
console.log(todo.getAll());

todo.update(2, 'Task-new');
console.log(todo.getAll());

todo.clear();
console.log(todo.getAll());