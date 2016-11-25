'use strict';

(function () {
    let url1 = 'https://api.meetup.com/2/open_events?key=676e713e5f123c3f786f2277597a7a43&photo-host=public&zip=98101&topic=web,machine-learning, softwaredev,computer-programming,web-development&limited_events=true&category=34&page=5&only=name,description,time,venue';
    let url = 'https://api.meetup.com/2/open_events?key=676e713e5f123c3f786f2277597a7a43&' +
        'photo-host=public' +
        '&zip=98101&' +
        'topic=web,machine-learning, softwaredev,computer-programming,web-development&' +
        'category=34&' +
        'time=' + getNewWeekInMs() + ', ' + getEndOfNewWeekInMs(getNewWeekInMs())+ '&' +
        'only=name,description,time,venue';

    window.CallbackRegistry = {};

    function scriptRequest(url, onSuccess, onError) {

        let scriptOk = false;

        let callbackName = 'cb' + String(Math.random()).slice(-6);
        url += ~url.indexOf('?') ? '&' : '?';
        url += 'callback=CallbackRegistry.' + callbackName;

        CallbackRegistry[callbackName] = function(data) {
            scriptOk = true;
            delete CallbackRegistry[callbackName];
            onSuccess(data);
        };

        function checkCallback() {
            if (scriptOk) return;
            delete CallbackRegistry[callbackName];
            onError(url);
        }

        let script = document.createElement('script');

        // в старых IE поддерживается только событие, а не onload/onerror
        script.onreadystatechange = function() {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                this.onreadystatechange = null;
                setTimeout(checkCallback, 0);
            }
        }

        // события script.onload/onerror срабатывают всегда после выполнения скрипта
        script.onload = script.onerror = checkCallback;
        script.src = url;

        document.body.appendChild(script);
    }

    function ok(data) {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
            console.log(data.results[i]);
        }
        mainFlow(data.results);
    }

    function fail(url) {
        alert( 'Ошибка при запросе ' + url );
    }

    function getNewWeekInMs() {
        let today = new Date();
        let newWeek = new Date(today.getTime() + (7 - today.getDay() + 1) * 24 * 60 * 60 * 1000);
        return newWeek.setUTCHours(0, 0, 0, 0);
    }

    function getEndOfNewWeekInMs(newWeek) {
        return newWeek + 7 * 24 * 60 * 60 * 1000;
    }

    scriptRequest(url, ok, fail);
})();
