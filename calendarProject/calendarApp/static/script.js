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

    function isLeapYear(year) {
        return (year % 400 === 0 || year % 100 !== 0) && (year % 4 == 0);
    }

     function nextMonth() {
        if (month++ === 11);
        return month

    }

     function prevMonth() {
        if (month-- === 0) prevYear();
        return month
    }

     function nextYear() {
        return ++year;
    }

    function prevYear() {
        return --year;
    }


let now = new Date();
day = now.getDate();
month = now.getMonth();
year = now.getFullYear();

function getWeeks(year, month){
  let l=new Date(year, month+1, 0);
  return Math.ceil( (l.getDate()- (l.getDay()?l.getDay():7))/7 )+1;
}

function startMonth(year, month){
    let d = new Date(year, month, 0);
    return d.getDay()
}

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

const m_calendar = {
    weekDays: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],

    notice: ko.observable(),
    month: ko.observable(month),
    year: ko.observable(year),
    selectDay: ko.observable(),
    inpDay: ko.observable(),
    nextMonth: function() {
        mo.removeAll()
        const newMonth = (this.month() + 1) % 12;
        this.month(newMonth);
        getMonth(year, newMonth)
        if (newMonth === 0) {
            mo.removeAll()
            const newYear = this.year() + 1;
            this.year(newYear);
            getMonth(newYear, newMonth)
        }
    },
    prevMonth: function() {
        mo.removeAll();
        const newMonth = (this.month() + 11) % 12;
        this.month(newMonth);
        getMonth(year, newMonth);
        if(newMonth === 11) {
            mo.removeAll()
            const newYear = this.year() - 1;
            this.year(newYear)
            getMonth(newYear, newMonth);
        }
    },
    selectYear: function(_d,e){
        mo.removeAll()
        year = +(e.target.value)
        getMonth(year, month)
        m_calendar.year(year)
    },
    getDay: function(data, event){
        if (typeof data == 'number')
            m_calendar.selectDay(data)

    },
    displayInput: function(data){
        return data == this.selectDay()
    },
    resetDay: function(){
        m_calendar.selectDay(undefined)
    },
    getNotice: ko.observable(),
    mouseOver: function(data, event){
        if (m_calendar.displayInput){
            let insideInnerHTML = event.target.innerHTML
            m_calendar.getNotice(insideInnerHTML)
            console.log(data)
            console.log(m_calendar.getNotice())
            localStorage.setItem('data', insideInnerHTML)
        }
    },
}

ko.applyBindings(m_calendar);
//m_calendar.selectDay(undefined)