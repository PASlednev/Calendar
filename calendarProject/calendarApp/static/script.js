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



    function setDays(number) {
        const days = getDaysInMonth(year, month);
        day = (number + days) % days;
    }

     function getDays() {
        return day;
    }

    function getDaysInMonth(year, month) {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    }
    console.log(getDaysInMonth(2022, 10))

    function isLeapYear(year) {
        return (year % 400 === 0 || year % 100 !== 0) && (year % 4 == 0);
    }

     function nextMonth() {
        if (month++ === 11) nextYear();
        return month

    }

    function prevMonth() {
        if (month-- === 0) prevYear();
        return month
    }

let now = new Date();
day = now.getDate();
month = now.getMonth();
year = now.getFullYear();

function getWeeks(year, month){
  let l=new Date(year, month+1, 0);
  return Math.ceil( (l.getDate()- (l.getDay()?l.getDay():7))/7 )+1;
}
console.log(getWeeks(2022,10))

function startMonth(year, month){
    let d = new Date(year, month, 0);
    return d.getDay()
}
console.log(startMonth(2022,10))

let mo = ko.observableArray()

function getMonth(year, month){
    let arr = [];
    for (let i = 1; i <= getDaysInMonth(year, month); i++){
        arr.push(i);
    }
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
let mon = getMonth(year, month)()
console.log(mon)
// let years = ko.observableArray()

let viewModel = {
    monthDays: mo,
    month: ko.observable(month),
    year: ko.observable(year),
    weekDays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    displayInput: ko.observable(true),
    nxtMonth: function(_d,e){
        mo.removeAll();
        const next = nextMonth();
        getMonth(year, next);
        viewModel.month(next);
    },
    previousMonth: function(_d,e){
        mo.removeAll();
        const prev = prevMonth();
        getMonth(year, prev);
        viewModel.month(prev)
    },
    selectYear: function(_d,e){
        mo.removeAll()
        year = +(e.target.value)
        getMonth(year, month)
        viewModel.year(year)
    }
};

ko.applyBindings(viewModel);
// не меняет количество дней в месяце.

