'use strict';

let div = document.getElementById('main');


function mainFlow(dataArray, bWeek, eWeek) {
    let weekTitle = document.getElementById('nextWeek');
    weekTitle.innerHTML = 'Week from ' +
        getDateFromMiliseconds(bWeek, true).toLocaleString("en-US", {month: 'long', day: 'numeric'}) +
        ' to ' +
        getDateFromMiliseconds(eWeek, true).toLocaleString("en-US", {month: 'long', day: 'numeric'});



  sortResults(dataArray);

  let daysRuOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < daysRuOrder.length; i++) {
      let day = daysRuOrder[i];
      let dayEvents = results[day];

      html += htmlBuilder.createDayOfWeek(dayEvents, day);
  }

  div.innerHTML += html;
}

function sortResults(data) {
    for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.name = data[i].name;
        obj.description = data[i].description;
        obj.date = getDateFromMiliseconds(data[i].time);

        let addr = data[i].venue;
        if (addr) {
            obj.address = addr.localized_country_name + ', '  +
            addr.city + ', ' +
            addr.address_1 + ', ' +
            addr.name;
        }

        let day = days[obj.date.getDay()];
        results[day].push(obj);
    }
}

function getDateFromMiliseconds(ms, uts = false) {
    let d = new Date();
    let n = d.getTimezoneOffset();
    let offset_fromUTC_to_Seattle = -8*60;
    if (uts) {
        return new Date(ms+(60000*(n)));
    }
    return new Date(ms+(60000*(n+offset_fromUTC_to_Seattle)));
}


let results = {};
let html = '';

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
for (let i = 0; i < days.length; i++) {
    results[days[i]] = [];
}


