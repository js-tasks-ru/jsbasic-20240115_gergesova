function getMinMax(str) {

  function newStr() {
    return str
      .split(' ')
      .map(item => parseFloat(item))
      .filter(number => isFinite(number))
      .sort((a, b) => a - b);
  }
  let arr = newStr();

  let result = {
    min: arr[0],
    max: arr[arr.length - 1],
  }

  return result;
}