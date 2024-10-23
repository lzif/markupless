import { el, app, state, reactive } from 'markupless';

const todos = state<string[]>([]);
const todo = state<string>("");

const updateTodo = () => {
  const newTodo = todo.get();
  if (newTodo.split(' ').length === 0 && newTodo.trim()) {
    todos.update(current => [...current, newTodo.trim()]);
  } else {
    todos.update(current => [...current, ...newTodo.split(" ")])
  }
  todo.set('');
}

app({},
  el('div').class('container').child(() => [
    reactive(todos, () =>
      el('ul').class('todo-list').child(() =>
        todos.get().map((todoItem, index) =>
          el('li')
            .setText(todoItem)
            .on('click', () => {
              todos.update(current =>
                current.filter((_, i) => i !== index)
              );
            })
        )
      )
    ),
    el('input').value(todo).on('keyup', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        updateTodo();
      }
    }),
    el('button')
      .setText('Add Todo')
      .class('btn')
      .on('click', updateTodo)
  ])
);
