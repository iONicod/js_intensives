const {getComments} = require('./getComments');

let sortType = ''

function sort (files, type) {
    sortType = type
    let comments = getComments(files)
    let result = comments.sort(function (a, b) {
        switch (sortType) {
            case 'importance':
                return sortImportance(a,b);
                break;

            case 'user':
                return sortUser(a,b);
                break;

            case 'date':
                return sortDate(a,b);
                break;

            default :
                return 0;
        }});
    return result;
}

function sortImportance(a, b) {
    function getRepeatCount (str) {
        return str.replace(/[^\!]/g, '').length;
    }
    a = getRepeatCount(a)
    b = getRepeatCount(b)
    return (a > b) ? -1 : 1;
}

function sortUser(a, b) {
    a = a.replace(/\/\/.*TODO |\/\/.*TODO.*: */gi, '').split(';')[0].toLowerCase()
    b = b.replace(/\/\/.*TODO |\/\/.*TODO.*: */gi, '').split(';')[0].toLowerCase()
    return (a > b) ? 1 : -1;
}

function sortDate(a, b) {
    if (a.split(';').length < 2 || b.split(';').length < 2) return 0;
    a = a.replace(/\/\/.*TODO |\/\/.*TODO.*: */gi, '').split(';')[1].split('-')
    b = b.replace(/\/\/.*TODO |\/\/.*TODO.*: */gi, '').split(';')[1].split('-')
    a = new Date (a[0] , a[1], a[2]);
    b = new Date (b[0] , b[1], b[2]);
    return (a > b) ? -1 : 1;
}

module.exports = {
    sort
};

 /*
 var datetime_regex = /(\d\d)\.(\d\d)\.(\d\d\d\d)\s(\d\d):(\d\d)/;

var first_date_arr = datetime_regex.exec(firstDate);
var first_datetime = new Date(first_date_arr[3], first_date_arr[2], first_date_arr[1], first_date_arr[4], first_date_arr[5]);

var second_date_arr = datetime_regex.exec(secondDate);
var second_datetime = new Date(second_date_arr[3], second_date_arr[2], second_date_arr[1], second_date_arr[4], second_date_arr[5]);
  2018-08-20
  */