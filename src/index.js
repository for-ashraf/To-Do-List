import './style.css';
import ListItems from './modules/creatingItems.js'; // eslint-disable-line import/no-cycle

//esling-disable-next-line
export let dataStructure = [];

const cleanList = () => {
  const toDoList = document.querySelector('.todo-list');
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.lastChild);
  }
};

export const render = () => {
  cleanList();
  for (let i = 0; i < dataStructure.length; i += 1) {
    ListItems.creatingNewItem(dataStructure[i].description, i);
  }
};

const clearAll = document.querySelector('.todo-clear-all-completed');
clearAll.addEventListener('click', () => {
  dataStructure = dataStructure.filter((item) => !item.completed);
  render();
  localStorage.setItem('listItem', JSON.stringify(dataStructure));
});

const selectAll = document.querySelector('.select-all');
selectAll.addEventListener('click', () => {
  dataStructure = [];
  localStorage.setItem('listItem', JSON.stringify(dataStructure));
  render();
});

const clickPlus = document.querySelector('.image-plus');
const newItem = document.getElementById('newItem');
const insertNewItem = (event) => {
  const tecla = event.key;
  const text = event.target.value;
  if (tecla === 'Enter') {
    dataStructure.push(
      {
        description: text,
        completed: false,
        index: dataStructure.length,
      },
    );
    newItem.value = '';
    render();
    localStorage.setItem('listItem', JSON.stringify(dataStructure));
  }
};
newItem.addEventListener('keypress', insertNewItem);

clickPlus.addEventListener('click', () => {
  const { value } = newItem;
  dataStructure.push(
    {
      description: value,
      completed: false,
      index: dataStructure.length,
    },
  );
  newItem.value = '';
  render();
  localStorage.setItem('listItem', JSON.stringify(dataStructure));
});

window.addEventListener('load', () => {
  if (localStorage.getItem('listItem')) {
    dataStructure.push(...JSON.parse(localStorage.getItem('listItem')));
  }
  for (let i = 0; i < dataStructure.length; i += 1) {
    const newObj = dataStructure[i];
    ListItems.creatingNewItem(newObj.description, i);
  }
});

render();
