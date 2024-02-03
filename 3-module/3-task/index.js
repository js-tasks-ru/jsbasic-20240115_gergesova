function camelize(str) {
  return str
    .split('-')
    .map((item, index) => index >= 1 ? item[0].toUpperCase() + item.substring(1) : item)
    .join('');
}


