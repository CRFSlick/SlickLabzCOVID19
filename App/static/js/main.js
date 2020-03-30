
var CTX;
var CHART;
var XMAX = 0;
var YMAX = 0;
var XLABEL = [];
var YLABEL = [];
var DATA = [];

$.ajax({
    url: "/api/countries",
    success: function (result) {
        for (var i=0; i < result.length; i++) {
            result[i] = result[i].toUpperCase();
        }
        autocomplete(document.getElementById("myInput"), result);
    },
    error: function (result) {
        console.log(result.status);
    }
});

$(document).ready(function () {
    InitializeGraph();

    $('#submit-button').click(function () {
        $.ajax({
            url: "/api/country",
            data: {
                name: $('#myInput').val()
            },
            success: function (result) {
                InsertData(result);
            },
            error: function (result) {
                console.log(result.status);
            }
        });
    });
});

function InsertData(result) {
    for (var i = 0; i < result.length; i++) {
        let date = new Date(result[i].Date);
        let formattedDate = `${FormatDate(date.getMonth() + 1, '0', 2)}-${FormatDate(date.getDate(), '0', 2)}`;
        let data = {
            date: date,
            dateF: formattedDate
        };
        if (!DATA.some(data => data.dateF === formattedDate)) {
            DATA.push(data);
        }
    } const sortedDATA = DATA.slice().sort((a, b) => b.date - a.date).reverse();


    // Push dates as labels
    CHART.data.labels = [];
    for (var x = 0; x < sortedDATA.length; x++) {
        CHART.data.labels.push(sortedDATA[x].dateF);
    }

    let country = result[0].Country;
    let cases = []

    if (CHART.data.datasets.some(dataset => dataset.label === country)) {
        return;
    }

    for (var x = 0; x < result.length; x++) {
        cases[x] = result[x].Cases;
    }

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = 0.25;

    CHART.data.datasets.push({
        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
        label: country,
        data: cases
    });

    let lenMax = 0;

    for (var i = 0; i < CHART.data.datasets.length; i++) {
        if (CHART.data.datasets[i].data.length > lenMax) {
            lenMax = CHART.data.datasets[i].data.length;
        }
    }

    for (var i = 0; i < CHART.data.datasets.length; i++) {
        console.log(CHART.data.datasets[i].data);
        while (CHART.data.datasets[i].data.length < lenMax) {
            CHART.data.datasets[i].data.unshift(0);
        }
    }

    CHART.update();
}

function sortData(data) {
    for (var i = 0; i < data.length; i++) {
        let item = data[i];
    }
}

function FormatDate(date, padding, paddingLength) {
    date = JSON.stringify(date);
    while (date.length < paddingLength) {
        date = `${padding}${date}`
    }
    return date
}

function InitializeGraph() {
    CTX = document.getElementById('myChart').getContext('2d');
    CHART = new Chart(CTX, {
        type: 'line',
        scaleStartValue: 0,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Total Confirmed Cases'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }]
            }
        }
    });
}


// Autocomplete input field
// Source: https://www.w3schools.com/howto/howto_js_autocomplete.asp

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
} 