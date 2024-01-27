function ucFirst(str) {
  if (str) {
    let newStr = str[0].toUpperCase();
    str = newStr + str.slice(1);
    return str;
  } else return str;
}
