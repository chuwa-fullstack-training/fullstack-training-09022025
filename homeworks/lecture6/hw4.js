/**
 * add `,` to the number every 3 digits
 * example: 12345678 => 12,345,678
 * example: 1234.56 => 1,234.56
 * @param {number} num
 */
function format(num) {
  // your code here
  const [int, dec] = num.toString().split(".");
  function insertCommas(str) {
    if (str.length <= 3) return str;
    return insertCommas(str.slice(0, -3)) + "," + str.slice(-3);
  }
  return dec ? insertCommas(int) + "." + dec : insertCommas(int);

  // return num.toLocaleString("en-US"); using built-in methods
}
