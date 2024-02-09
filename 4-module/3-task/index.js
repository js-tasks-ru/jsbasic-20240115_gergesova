function highlight(table) {

  let tr = table.rows;

  for (let i = 1; i < tr.length; i++) {

    if (tr[i].cells[3].dataset.available == 'true') {
      tr[i].classList.add('available');
    } else if (tr[i].cells[3].dataset.available == 'false') {
      tr[i].classList.add('unavailable');
    } else {
      tr[i].setAttribute('hidden', 'hidden');
    }

    if (tr[i].cells[2].textContent == 'm') {
      tr[i].classList.add('male');
    } else if (tr[i].cells[2].textContent == 'f') {
      tr[i].classList.add('female');
    }

    let age = parseInt(tr[i].cells[1].textContent);
    if (age < 18) tr[i].style.textDecoration = 'line-through'

  }
}
