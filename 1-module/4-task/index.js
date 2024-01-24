function checkSpam(str) {
  let str1 = '1xbet';
  let str2 = 'xxx';

  return str.toLowerCase().includes(str1) || str.toLowerCase().includes(str2);
}