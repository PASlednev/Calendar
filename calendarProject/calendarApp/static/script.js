//
//allYear = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
//allMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//
//
//function amountOfMonth (month, year) {
//    let yr = !((year % 4) || (!(year % 100) && (year % 400)))
//    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11)
//        return 31
//    else if ((yr && month == 1))
//        return 29
//    else if (month == 1)
//        return 28
//    else
//        return 30
//}
//
//
//let mon = amountOfMonth(1, 2004)
//let arr = []
//let curMonth = []
//for (let i = 1; i <= mon; i++){
//    arr.push(i);
//}
//let currentMonth = arr.join(' ')
//console.log(currentMonth)
//console.log(mon)
//console.log(arr)


let m_ = {

    set days(number) {
        const days = this.getDaysInMonth();
        this.day = (number + days) % days;
    },

     get days() {
        return this.day;
    },

    getDaysInMonth(year = this.year, month = this.month) {
        return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    },

    isLeapYear(year = this.year) {
        return (year % 400 === 0 || year % 100 !== 0) && (year % 4 == 0);
    },

     nextMonth() {
        if (this.month++ === 11) this.nextYear();
        return this.month

    },

    prevMonth() {
        if (this.month-- === 0) this.prevYear();
        return this.month
    }

}
m_.day = 23
m_.month = 9
m_.year = 2022
console.log(m_.getDaysInMonth())


let arr = []
for (let i = 1; i <= m_.getDaysInMonth(); i++){
    arr.push(i);
}
console.log(arr)

function getWeeks(year, month)
 {
  let l=new Date(year, month+1, 0);
  return Math.ceil( (l.getDate()- (l.getDay()?l.getDay():7))/7 )+1;
 }
console.log(getWeeks(2022,9))


function startMonth(year, month){
    let d = new Date(year, month, 0);
    return d.getDay()
}
console.log(startMonth(2022, 9))

let mo = []
function getMonth(year, month){
    for (let i = 0; i < Math.ceil((arr.length + startMonth(year, month)) / 7); i++){
        let ar = []
        for(let k = 1; k < 8; k++){
            let currentDay = k + i * 7
            if (currentDay <= arr.length + startMonth(year, month) && currentDay > startMonth(year, month)) {
                ar.push(currentDay - startMonth(year, month))
            }
            else
                ar.push('-')
        }
    mo.push(ar)
    }
    return mo
}
console.log(getMonth(m_.year, m_.month))

let viewModel = {
    monthDays: mo,
    weekDays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
};

ko.applyBindings(viewModel);