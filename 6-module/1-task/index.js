
export default class UserTable {

  constructor(rows) {
    this.elem = document.createElement('table');
    this.rows = rows;
    this.newTable();
    this.deleteTr();
  }

  newTable() {
    this.elem.innerHTML = `
<thead>
    <tr>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Зарплата</th>
      <th>Город</th>
      <th></th>
    </tr>
  </thead>
  <tbody>`+
      this.rows.map(item => `
      <tr>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.salary}</td>
      <td>${item.city}</td>
      <td><button>X</button></td>
    </tr>
      </tbody>`).join('');
  }

  deleteTr() {
    let buttons = Array.from(this.elem.querySelectorAll("button"));
    buttons.forEach((button) => {
      button.addEventListener('click', (event) =>
        event.target.closest("tr").remove());
    })
  }
}
