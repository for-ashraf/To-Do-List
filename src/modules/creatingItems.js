import trashIcon from './myTrash.png';
import DataClass, { toDoList, cleanList } from './fields.js';

export default class DataItems {
static creatingNewItem = (text, completed, index) => {
  const labelItem = document.createElement('label');
  labelItem.classList.add('todo-list-label');
  labelItem.id = index;
  if (completed) {
    labelItem.style.backgroundColor = 'rgb(190, 255, 199)';
  }
  const inputCheckbox = document.createElement('input');
  inputCheckbox.setAttribute('type', 'checkbox');
  inputCheckbox.checked = completed;
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
    DataClass.dataStructure.splice(index, 1);
    DataItems.render();
    for (let i = 0; i < DataClass.dataStructure.length; i += 1) {
      DataClass.dataStructure[i].index = i;
    }
    localStorage.setItem('listItem', JSON.stringify(DataClass.dataStructure));
  });
  labelItem.addEventListener('click', () => {
    if (inputCheckbox.checked) {
      labelItem.style.backgroundColor = 'rgb(190, 255, 199)';
      DataClass.dataStructure[index].completed = true;
      localStorage.setItem('listItem', JSON.stringify(DataClass.dataStructure));
    } else {
      labelItem.style.backgroundColor = 'rgba(202, 189, 74, 0.305)';
      DataClass.dataStructure[index].completed = false;
      localStorage.setItem('listItem', JSON.stringify(DataClass.dataStructure));
    }
  });
  window.addEventListener('input', (e) => {
    if (e.target.classList.contains('input-text')) {
      const something = e.target;
      const thisId = Number(something.id.split('_')[1]);
      DataClass.dataStructure[thisId].description = e.target.value;
      localStorage.setItem('listItem', JSON.stringify(DataClass.dataStructure));
    }
  });
};

static render = () => {
  cleanList();
  const { dataStructure } = DataClass;
  for (let i = 0; i < DataClass.dataStructure.length; i += 1) {
    DataItems.creatingNewItem(dataStructure[i].description, dataStructure[i].completed, i);
  }
};
}
