let table = document.getElementsByClassName('table')
    table[0].onclick = function(e){
        if (e.target.className == 'currentDay' || e.target.className == 'case')
            document.getElementsByClassName('dateNumber')[0].innerText = e.target.childNodes[0].innerText ?? e.target.innerText
    }


var el = undefined;
function togCell(col) {
    if (el !== undefined) el.style.backgroundColor = "";
    if (typeof event !== 'undefined')
        el = event.target
    el.style.backgroundColor = col
    }


class Calendar{
    constructor(d, m, y){
        this.day = d;
        this.month = m;
        this.year = y;
    }
    set weekDays(weekDay) {
        this.day = weekDay % 32
    }

    get weekDays(){
        return this.day
    }

    set curMonth(thisMonth){
        if (thisMonth > 0 && thisMonth < 13){
            this.month = thisMonth
        }
    }

    get curMonth(){
        return this.month
    }

    set curYear(thisYear){
        if (thisYear > 0 && thisYear < 5000){
            this.year = thisYear
        }
        else this.year = 'Error'
    }

    get curYear(){
        return this.year
    }
}

let m = new Calendar()

m.curMonth = 11
m.curYear = 2022

console.log(document.querySelector('.displayNotice'))
let currentDay = function() {
    let self = this
    self.display = ko.observable(false)
    self.dayNum = ko.observable()
    self.curDay = function(d, w) {
        self.dayNum(w.target.innerText)
        m.weekDays = dayNum()
        console.log(display())
        console.log(m.weekDays)
        if(self.display()==false)
            self.display(true);
        else
            self.display(false);
    }

    self.m = m
};
    ko.applyBindings(currentDay);












//console.log(viewModel.numberOfClicks.subscribe)

//function getGroups(array) {
//    const groups = [];
//    for (let i = 0; i < array.length; i++){
//        if (!groups.includes(array[i].f))
//            groups.push(array[i].f)
//    }
//    return groups
//}
//
//function sortByGroups(array, groups) {
//let result = []
//    for (let j = 0; j < groups.length; j++){
//        const group = getElementsByGroup(array, groups[j])
//        result.push(group)
//    }
//
//    return result
//}
//
//function getElementsByGroup(array, groupValue) {
//    const result = [];
//    for(let i = 0; i < array.length; i++) {
//        if (array[i].f == groupValue)
//            result.push(array[i])
//            console.log('groupValue :', groupValue)
//    }
//    return result;
//}
//
//
//let arr = [{f:1}, {f:2}, {f:3}, {f:2}, {f:7}, {f:1}, {f:3}]
//
//let map = new Map();
//
//for(i=0; i<arr.length; i++){
//    const value = arr[i];
//    if (map.has(value.f))
//        map.get(value.f).push(value)
//    else
//        map.set(value.f, [value])
//}
//
//function ff(arr){
//    for(i=0; i<arr.length; i++)
//        map.has(arr[i].f) ? map.get(arr[i].f).push(arr[i]) : map.set(arr[i].f, [arr[i]])
//}
//console.log(map)
//
//
//console.log("array: ", arr);
//const groups = getGroups(arr);
//console.log("groups: ", groups);
//const result = sortByGroups(arr, groups)
//console.log(result)

//var doTest = [1, 3, 4, 1, 1, 3, 4, 5];
//let resultt = {}
//function findOdd(A) {
//  for (let i = 0; i < doTest.length; ++i){
//    let a = doTest[i];
//    if (result[a] != undefined){
//      ++resultt[a];
//    }
//    else {
//      resultt[a] = 1
//    }
//  }
//  if (a % 2 != 0){
//  return a;
//  }
//}
