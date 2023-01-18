
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
        if (typeof data == 'number' && this.displayTA() == false) {
            this.displayTA(true)
            m_calendar.selectDay(data)
            const key = `${data} ${m_calendar.curMonth()} ${year}`
            let keyGetItem = localStorage.getItem(key)
            m_calendar.getNotice(keyGetItem)
        }
        else {
            this.displayTA(false)
        }
    },

    resetDay: function () {
        m_calendar.displayTA(false)
    },


    getNotice: ko.observable(),
    keyUpEv: function (event) {
        const data = m_calendar.selectDay();
        const key = `${data} ${m_calendar.curMonth()} ${m_calendar.year()}`;
        localStorage.setItem(key, m_calendar.getNotice());
        // console.log(event.getNotice())
        debounceFunc()
    },

    displayBadges: function (data) {
        const key = `${data} ${m_calendar.curMonth()} ${m_calendar.year()}`;
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
        body: JSON.stringify({ text: m_calendar.getNotice(), id: `${data} ${m_calendar.curMonth()} ${m_calendar.year()}` }),
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

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    };
};
const debounceFunc = debounce(doRequest, 2000)


let monthSwipe = document.querySelector('.table')
monthSwipe.addEventListener('touchstart', handleTouchStart, false)
monthSwipe.addEventListener('touchmove', handleTouchMove, false)

let x1 = null
let x2 = null

function handleTouchStart(event) {
    const firstTouch = event.touches[0]
    x1 = firstTouch.clientX
    y1 = firstTouch.clientY
}

function handleTouchMove(event) {
    if (!x1 || !y1) {
        return false;
    }
    let x2 = event.touches[0].clientX
    let y2 = event.touches[0].clientY

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            m_calendar.prevMonth()
        }
        else {
            m_calendar.nextMonth()
        }
    }
    // else
    //     if (yDiff > 0) {
    //         console.log('down')
    //     }
    //     else {
    //         console.log('top')
    //     }

    x1 = null
    y1 = null

}

/////////////////////////////////////////////////////////////////////


// function validParentheses(parens) {
//     for (let i = 0; i < parents.length; i++){
//         if (parents[0] == ')')
//             return false
//     }
    
//   }

// let a = [1, 4, 8, 7, 3, 15]
// let b = 8

// function sumPairs(ints, s) {
//     ints.filter((item, index, array) => {
        
//     }, 0)
//   }

// console.log(sumPairs(a,b))

// let a = '())(()'
// function validParentheses(parens) {
//     let counter = 0
//     for (let i = 0; i < parens.length; i++){
//         if (parens[0] == ')')
//             return false
//         if (parens.at(-1) == '(')
//             return false
//         if (parens[i] == '(')
//             counter += 1
//         else if (parens[i] == ')'){
//             counter -= 1
//         }
//         if (counter < 0)
//             return false
//     }
//     if (counter == 0)
//             return true
//     else return false
//   }

// console.log(validParentheses(a))


// let a = [4, 3, 2, 3, 4]
// let b = 6

// function sumPairs(ints, s){
//     let arr = []
//     let ar = []
//     for (let i = 0; i < ints.length; i++){
//         for (let k = i+1; k < ints.length; k++){
//             if (ints[i] + ints[k] == s){
//                 arr.push([ints[i], ints[k], k])
//             }
//         }
//     }
//     arr.forEach(item => {
//         item.forEach((data) => {
//             console.log(item)
//         })
//     })
//     return arr

// }
// console.log(sumPairs(a,b))



// for (let i = 0; i < arr.length; i++){
    //     for (let k = i+1; k<arr.length; k++){
    //         if (arr[i].at(-1) < arr[k].at(-1)){
    //             arr.splice(arr[k])
    //         }
    //         else 
    //             arr.splice(arr[i])
    //     }
    //



// a = 123123123123
// function nextBigger(n){
//     let arr = []
//     let lenVal = Math.floor(Math.log10(n)) + 1
//     for (let i = 0; i < lenVal; i++){
//         arr.push(i)
//     }
//     return arr
// }
// console.log(nextBigger(a))

// let a = [0, 0, -2, 3]
// let b = 2

// function sumPairs(ints, s) {
//     let index = ints.length;
//     let pair = [];
//     for (let i = 0; i < ints.length; i++) {
//         for (let k = i + 1; k < ints.length; k++) {
//             if (ints[i] + ints[k] == s && k < index) {
//                 index = k;
//                 pair = [ints[i] ,ints[k]];
//             }
//         }
//     }
//     if (!pair.length)
//         return undefined

//     return pair
// }

// console.log(sumPairs(a, b))

// function sumPairs(ints, s) {
//     let arr = []
//     let ar = []
//     let y = 10
//     let finishArr = []
//     for (let i = 0; i < ints.length; i++) {
//         for (let k = i + 1; k < ints.length; k++) {
//             if (ints[i] + ints[k] == s) {
//                 arr.push([ints[i], ints[k], k])
//             }
//         }
//     }
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i][2] < y) {
//             y = arr[i][2]
//         }
//     }
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i][2] == y)
//             finishArr = arr[i]
//     }
//     finishArr.pop()
//     return finishArr
// }

// console.log(sumPairs(a,b))


// let aa = [4, 3, 2, 3, 4]
// let bb = 6

// var sum_pairs = function(ints, s) {
//     set = new Set();
    
//     for (let i of ints) {
//       if (set.has(s - i)) {
//         return [ s - i, i ];
//       }
      
//       set.add(i);
//     }
// }

// console.log(sum_pairs(aa,bb))


// let timestamp =359999
// console.log(timestamp % 60)


//let i = Math.floor(Math.log10(n)) + 1



// function nextBigger(n){
//     let arr = ('' + n).split('').map(Number)
//     let ar = []
//     for (let i = 0; i < arr.length; i++){
//         for (let k = i + 1; k <= arr.length; k++){
//             if (arr[k] > arr[i]){
//                 arr[i, k] = arr[k, i]
//             }
//         }
//     }
//     return arr
// }
// console.log(nextBigger(2017))


// function nextBigger(n){
//     let arr = ('' + n).split('').map(Number)
//     let swapped
//     console.log(arr)
//     do {
//         swapped = false
//         arr.forEach((item,index) => {
//             if (item > arr[index + 1]){
//                 let temp = item
//                 arr[index] = arr[index + 1]
//                 arr[index + 1] = temp
//                 swapped = true
//             }
//         })
//     } while (swapped)
//     return arr
// }
// console.log(nextBigger(2017))

// function toUnderscore(string) {
//     let ar = []
//     num = '0123456789'
//     string = String(string)
//     ar.push(string[0].toString().toLowerCase())
//     for (let i = 1; i < string.length; i++){
//         if (num.includes(string[i])){
//             ar.push(string[i])
//         }
//         else if (string[i] == string[i].toUpperCase()){
//             ar.push('_')
//             ar.push(string[i].toLowerCase())
//         }
//         else 
//             ar.push(string[i])
//     }
//     return ar.join('')
// }
// console.log(toUnderscore(5))  