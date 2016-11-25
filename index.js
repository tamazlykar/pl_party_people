'use strict';

let div = document.getElementById('main');





function mainFlow(dataArray) {
  sortResults(dataArray);

  for (let i = 0; i < days.length; i++) {
      let day = days[i];
      let dayEvents = results[day];

      html += htmlBuilder.createDayOfWeek(dayEvents, day);
  }

  console.log(html);
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

        let day = days[obj.date.getUTCDay()];
        results[day].push(obj);
    }
    console.log(results);
}
function getDateFromMiliseconds(ms) {
    return new Date(ms);
}



let results = {};
let html = '';

let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
for (let i = 0; i < days.length; i++) {
    results[days[i]] = [];
}


