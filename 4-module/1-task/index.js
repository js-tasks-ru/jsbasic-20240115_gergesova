function makeFriendsList(friends) {
  const newList = document.createElement("ul");
  newList.innerHTML = friends
    .map(item => `<li>${item.firstName + ' ' + item.lastName}</li>`)
    .join('');
  return newList;
}









