import _ from 'lodash'
export function price(number){
    if(_.isNumber(number)){
    let reverse = number.toString().split('').reverse().join(''),
    thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join(',').split('').reverse().join('');
    return thousand ;
    } else {
        return number
    }
}