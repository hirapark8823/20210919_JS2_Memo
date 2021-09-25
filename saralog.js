const week = ['日', '月', '火', '水', '木', '金', '土'];
const today = new Date();
let showDate = new Date(today.getFullYear(), today.getMonth(), 1);

window.onload = function () {
    showProcess(today, calendar);
}

// previous Month
function prev() {
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// next Month
function next() {
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// calendar
function showProcess(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    document.querySelector('#header').innerHTML = year + '.' + (month + 1);

    let calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}

//make calendar
function createProcess(year, month) {

    //days
    let calendar = "<table><tr class='dayOfWeek'>";
    for (let i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>"

    //date
    let count = 0;
    let startDayOfWeek = new Date(year, month, 1).getDay();
    let endDate = new Date(year, month + 1, 0).getDate();
    let lastMonthEndDate = new Date(year, month, 0).getDate();
    let row = Math.ceil((startDayOfWeek + endDate) / week.length);

    for (var i = 0; i < row; i++) {
        calendar += "<tr>";

        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {

                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {

                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {

                count++;
                if (year == today.getFullYear()
                    && month == (today.getMonth())
                    && count == today.getDate()) {
                    calendar += "<td class='today'>" + count + "<textarea id='today_box' cols='10' rows='3'></textarea>" + "</td>";
                } else {
                    calendar += "<td>" + count + "<textarea id='daily_box' cols='10' rows='3'></textarea>" + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}

// localstorageイベント
//1.Save クリックイベント
$('#save').on('click', function () {
    const data = {
        favorite_meal: $('#favorite_box').val(),
        stock_meal: $('#stock_box').val(),
        today_meal: $('#today_box').val(),
        daily_meal: $('#daily_box').val(),
    };
    const jsonData = JSON.stringify(data);
    localStorage.setItem('memo', jsonData);
})
//2.clear クリックイベント
$('#clear').on('click', function () {
    localStorage.removeItem('memo');
    $('#favorite_box').val('');
    $('#stock_box').val('');
    $('#today_box').val('');
    $('#daily_box').val('');
})
//3.ページ読み込み：保存データ取得表示
if (localStorage.getItem('memo')) {
    const jsonData = localStorage.getItem('memo');
    const data = JSON.parse(jsonData)
    $('#favorite_box').val(data.favorite_meal);
    $('#stock_box').val(data.stock_meal);
    $('#today_box').val(data.daily_meal);
    $('#daily_box').val(data.daily_meal);
}

