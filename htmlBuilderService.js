'use strict';

(function () {
    function createDayOfWeekHTML(events, day) {
        if (!events.length) {
            return '';
        }


        let beginnig = '<div class="dayOfWeek"><h2>' + day + '</h2>';
        let innerHtml = '';
        let ending = '</div>';

        for (let i = 0; i < events.length; i++) {
            innerHtml += createEventHTML(events[i]);
        }

        return beginnig + innerHtml + ending;
    }

    function createEventHTML(event) {
        function createName(name) {
            return '<h3>' + name + '</h3>';
        }

        function createDescription(description) {
            return '<div class="description">' + description + '</div>';
        }

        function createAddress(address) {
            return '<div class="address">' + address + '</div>';
        }

        function createDate(date) {
            let options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            return '<div class="date">' + date.toLocaleString("en-US", options) + '</div>';
        }

        return '<div class="event">' + createName(event.name) +
                                        createDescription(event.description) +
                                        createAddress(event.address) +
                                        createDate(event.date) +'</div>'
    }

    window.htmlBuilder = {

        createDayOfWeek : function (events, day) {
            return createDayOfWeekHTML(events, day);
        }

    }
})();
