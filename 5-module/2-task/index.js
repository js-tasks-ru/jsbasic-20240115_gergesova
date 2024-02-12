function toggleText() {
  const textHidden = document.getElementById('text');
  const button = document.querySelector('.toggle-text-button');

  button.onclick = () => {
    textHidden.hidden = true;
  }

  button.onclick = () => {
    textHidden.hidden = !textHidden.hidden;
  }
}
