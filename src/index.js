import './style.css';

const dataStructure = [
  {
    description: 'Wash the Dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Complete To Do list project',
    completed: false,
    index: 1,
  },
];

const toDoList = document.querySelector('.todo-list');
const creatingNewItem = (text) => {
  const labelItem = document.createElement('label');
  labelItem.classList.add('todo-list-label');
  const inputCheckbox = document.createElement('input');
  inputCheckbox.setAttribute('type', 'checkbox');
  const textItem = document.createElement('p');
  textItem.textContent = text;
  const inputClosure = document.createElement('input');
  inputClosure.setAttribute('type', 'button');
  inputClosure.setAttribute('value', 'X');

  toDoList.appendChild(labelItem);
  labelItem.appendChild(inputCheckbox);
  labelItem.appendChild(textItem);
  labelItem.appendChild(inputClosure);
};

const cleanList = () => {
  const toDoList = document.querySelector('.todo-list');
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.lastChild);
  }
};

const render = () => {
  cleanList();
  dataStructure.forEach((item) => creatingNewItem(item.description));
};

const newItem = document.getElementById('newItem');

const insertNewItem = (event) => {
  const tecla = event.key;
  const text = event.target.value;
  if (tecla === 'Enter') {
    dataStructure.push({
      description: text,
      completed: false,
      index: dataStructure.length,
    });
    newItem.value = '';
    render();
  }
};
newItem.addEventListener('keypress', insertNewItem);

render();
