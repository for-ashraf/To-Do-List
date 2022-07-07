import trashIcon from './myTrash.png';
import { dataStructure, render } from '../index.js'; // eslint-disable-line import/no-cycle

const toDoList = document.querySelector('.todo-list');
export default class ListItems {
static creatingNewItem = (text, index) => {
  const labelItem = document.createElement('label');
  labelItem.classList.add('todo-list-label');
  labelItem.id = index;
  const inputCheckbox = document.createElement('input');
  inputCheckbox.setAttribute('type', 'checkbox');
  const textItem = document.createElement('input');
  textItem.setAttribute('class', 'input-text');
  textItem.value = text;
  textItem.id = `id_${index}`;
  const inputClosure = document.createElement('img');
  inputClosure.setAttribute('class', 'closure-button');
  inputClosure.setAttribute('src', trashIcon);

  toDoList.appendChild(labelItem);
  labelItem.appendChild(inputCheckbox);
  labelItem.appendChild(textItem);
  labelItem.appendChild(inputClosure);

  inputClosure.addEventListener('click', () => {
    dataStructure.splice(index, 1);
    render();
    for (let i = 0; i < dataStructure.length; i += 1) {
      dataStructure[i].index = i;
    }
    localStorage.setItem('listItem', JSON.stringify(dataStructure));
  });

  labelItem.addEventListener('click', () => {
    const itemId = index;
    if (inputCheckbox.checked) {
      labelItem.classList.add('show');
      dataStructure[itemId].completed = true;
    } else {
      labelItem.classList.remove('show');
      dataStructure[itemId].completed = false;
    }
  });

  window.addEventListener('input', (e) => {
    if (e.target.classList.contains('input-text')) {
      const something = e.target;
      const thisId = Number(something.id.split('_')[1]);
      dataStructure[thisId].description = e.target.value;
      localStorage.setItem('listItem', JSON.stringify(dataStructure));
    }
  });
};
}