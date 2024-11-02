(function (exports) {
    'use strict';

    var // functions
        extend,
        createElements,
        createCountdownElt,
        simplyCountdown;

    extend = function (out) {
        var i, obj, key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }
        return out;
    };

    createCountdownElt = function (countdown, parameters, typeClass) {
        var innerSectionTag, sectionTag, amountTag, wordTag;

        sectionTag = document.createElement('div');
        amountTag = document.createElement('span');
        wordTag = document.createElement('span');
        innerSectionTag = document.createElement('div');

        innerSectionTag.appendChild(amountTag);
        innerSectionTag.appendChild(wordTag);
        sectionTag.appendChild(innerSectionTag);

        sectionTag.classList.add(parameters.sectionClass);
        sectionTag.classList.add(typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag
        };
    };

    createElements = function (parameters, countdown) {
        var spanTag;

        if (!parameters.inline) {
            return {
                days: createCountdownElt(countdown, parameters, 'simply-days-section'),
                hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
                minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
                seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
            };
        }

        spanTag = document.createElement('span');
        spanTag.classList.add(parameters.inlineClass);
        return spanTag;
    };

    simplyCountdown = function (elt, args) {
        var parameters = extend({
                year: 2025,
                month: 2,
                day: 2,
                hours: 12,
                minutes: 0,
                seconds: 0,
                words: {
                    days: 'day',
                    hours: 'hour',
                    minutes: 'minute',
                    seconds: 'second',
                    pluralLetter: 's'
                },
                plural: true,
                inline: false,
                enableUtc: true,
                onEnd: function () {
                    return;
                },
                refresh: 1000,
                inlineClass: 'simply-countdown-inline',
                sectionClass: 'simply-section',
                amountClass: 'simply-amount',
                wordClass: 'simply-word',
                zeroPad: false
            }, args),
            interval,
            targetDate = new Date("2025-02-02T06:30:00Z"), // Target event date in UTC
            cd = document.querySelectorAll(elt);

        Array.prototype.forEach.call(cd, function (countdown) {
            var fullCountDown = createElements(parameters, countdown),
                refresh;

            refresh = function () {
                var dayWord, hourWord, minuteWord, secondWord;

                // Get the current UTC time
                const nowUTC = Date.now();
                const timeDiff = targetDate.getTime() - nowUTC;

                let days, hours, minutes, seconds;

                if (timeDiff > 0) {
                    // Convert milliseconds to days, hours, minutes, and seconds
                    days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                } else {
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                    window.clearInterval(interval);
                    parameters.onEnd();
                }

                // Handle pluralization
                if (parameters.plural) {
                    dayWord = days > 1 ? parameters.words.days + parameters.words.pluralLetter : parameters.words.days;
                    hourWord = hours > 1 ? parameters.words.hours + parameters.words.pluralLetter : parameters.words.hours;
                    minuteWord = minutes > 1 ? parameters.words.minutes + parameters.words.pluralLetter : parameters.words.minutes;
                    secondWord = seconds > 1 ? parameters.words.seconds + parameters.words.pluralLetter : parameters.words.seconds;
                } else {
                    dayWord = parameters.words.days;
                    hourWord = parameters.words.hours;
                    minuteWord = parameters.words.minutes;
                    secondWord = parameters.words.seconds;
                }

                // Display countdown inline or with sections
                if (parameters.inline) {
                    countdown.innerHTML =
                        `${days} ${dayWord}, ${hours} ${hourWord}, ${minutes} ${minuteWord}, ${seconds} ${secondWord}`;
                } else {
                    fullCountDown.days.amount.textContent = (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + days;
                    fullCountDown.days.word.textContent = dayWord;
                    fullCountDown.hours.amount.textContent = (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + hours;
                    fullCountDown.hours.word.textContent = hourWord;
                    fullCountDown.minutes.amount.textContent = (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + minutes;
                    fullCountDown.minutes.word.textContent = minuteWord;
                    fullCountDown.seconds.amount.textContent = (parameters.zeroPad && seconds.toString().length < 2 ? '0' : '') + seconds;
                    fullCountDown.seconds.word.textContent = secondWord;
                }
            };

            // Refresh immediately to prevent a Flash of Unstyled Content
            refresh();
            interval = window.setInterval(refresh, parameters.refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));
