/**
 * Straight up copying http://stackoverflow.com/a/12646864
 * A clever implementation of the Fisher-Yates shuffle
*/
export const shuffle = (arr: Array<any>): Array<any> => {
  for (let i:number = arr.length - 1; i > 0; i--) {
    let j:number = Math.floor(Math.random() * (i + 1));
    let temp: any = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}