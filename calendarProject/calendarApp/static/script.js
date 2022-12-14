
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

function getWeeks(year, month) {
    let l = new Date(year, month + 1, 0);
    return Math.ceil((l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7) + 1;
}

function startMonth(year, month) {
    let d = new Date(year, month, 0);
    return d.getDay()
}

let mo = ko.observableArray()

function getMonth(year, month) {
    let arr = [];
    for (let i = 1; i <= getDaysInMonth(year, month); i++) {
        arr.push(i);
    }
    for (let i = 0; i < Math.ceil((arr.length + startMonth(year, month)) / 7); i++) {
        let ar = []
        for (let k = 1; k < 8; k++) {
            let currentDay = k + i * 7
            if (currentDay <= arr.length + startMonth(year, month) && currentDay > startMonth(year, month)) {
                ar.push(currentDay - startMonth(year, month))
            }
            else
                ar.push('-')
        }
        mo.push(ar)
    }
    m_calendar.updateWeeks();

    return mo
}






const m_calendar = {
    weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    allMonth: ko.observableArray(["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]),
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
    curDay: ko.observable(day),
    notice: ko.observable(),
    curMonth: ko.observable(month),
    year: ko.observable(year),
    selectDay: ko.observable(),
    inpDay: ko.observable(),
    displayTA: ko.observable(false),
    array: ko.observableArray(),
    nextMonth: function () {
        mo.removeAll()
        const newMonth = (this.curMonth() + 1) % 12;
        this.curMonth(newMonth);
        getMonth(m_calendar.year(), newMonth)
        if (newMonth === 0) {
            mo.removeAll()
            const newYear = this.year() + 1;
            this.year(newYear);
            getMonth(newYear, newMonth)
        }
        // this.selectDay(undefined);
    },

    prevMonth: function () {
        mo.removeAll();
        const newMonth = (this.curMonth() + 11) % 12;
        this.curMonth(newMonth);
        getMonth(m_calendar.year(), newMonth);
        if (newMonth === 11) {
            mo.removeAll()
            const newYear = this.year() - 1;
            this.year(newYear)
            getMonth(newYear, newMonth);
        }
        // this.selectDay(undefined)

    },

    selectYear: function (_d, e) {
        mo.removeAll()
        year = +(e.target.value)
        getMonth(year, m_calendar.curMonth())
        m_calendar.year(year)
        this.displayTA(false)
        if (m_calendar.year() == 0) {
            m_calendar.year(2010)
        }
    },

    
    getDay: function (data, event) {
        m_calendar.curDay(null)
        if (typeof data == 'number' && this.displayTA()==false) {
            this.displayTA(true)
            m_calendar.selectDay(data)
            const key = `${data} ${m_calendar.curMonth()} ${year}`
            let keyGetItem = localStorage.getItem(key)
            m_calendar.getNotice(keyGetItem)
        }
        else{
            this.displayTA(false)
        }
    },

    resetDay: function () {
        m_calendar.displayTA(false)
    },


    getNotice: ko.observable(),
    keyUpEv: function (event) {
        const data = m_calendar.selectDay();
        const key = `${data} ${m_calendar.curMonth()} ${year}`;
        localStorage.setItem(key, m_calendar.getNotice());
        // console.log(event.getNotice())
        debounceFunc()
    },

    displayBadges: function (data) {
        const key = `${data} ${m_calendar.curMonth()} ${year}`;
        if (isAuth == true)
            return localStorage.getItem(key)
        else
            return false
    },

    isWeekDay: function (data) {
        if (typeof data == 'number') {
            return +(m_calendar.array()[data - 1])
        }
        return false
    },

    updateWeeks: function () {
        fetch(`https://isdayoff.ru/api/getdata?year=${m_calendar.year()}&month=${m_calendar.curMonth() + 1}`)
            .then(async data => {
                let arra = []
                arra = await data.text()
                let workDayArr = []
                for (let i = 0; i < arra.length; i++) {
                    workDayArr.push(arra[i])
                }
                m_calendar.array(workDayArr)
            });
    },

    
}


ko.applyBindings(m_calendar);
//m_calendar.selectDay(undefined)
let mon = getMonth(year, month)()


async function doRequest() {
    const data = m_calendar.selectDay();
    const year = m_calendar.year();
    let url = 'http://127.0.0.1:8000/api/';
    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({text: m_calendar.getNotice(), id: `${data} ${m_calendar.curMonth()} ${year}`}),
        headers: { 'X-CSRFToken': 'hdraQaofpezSxRHz9OufCqyAooQ8cxIU8RJtYfKLWn0FnjFr8IleygXFYJb3OlKWp', 'Content-Type': 'application/json' },
    })
    if (res.ok) {

        let text = await res.text();
        // console.log(res)

        return text;
    } else {
        return `HTTP error: ${res.status}`;
    }
}

const debounce = (callback, delay) => {
    let timeout;

    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    };
};
const debounceFunc = debounce(doRequest, 2000)