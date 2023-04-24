var timerInterval;
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        return;
    }
    console.log("document ready state: " + document.readyState);
    document.querySelectorAll('.hack_timer').forEach(function (hackTimer) {
        hackTimer.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var hackTimer = e.target;
            // check if running, should have "run" class
            if (hackTimer.classList.contains('run')) {
                // stop timer
                hackTimer.classList.remove('run');
                hackTimer.classList.remove('warn');
                hackTimer.classList.remove('shake');

                // clear interval
                clearInterval(timerInterval);
            } else if (hackTimer.innerHTML !== "05<span>:</span>00") {
                hackTimer.innerHTML = "05<span>:</span>00";
            } else {
                // start timer
                hackTimer.classList.add('run');

                // start timer
                var globalTimerSeconds = 300;
                var timerFunc = function () {
                    var minutes = Math.abs(Math.trunc(globalTimerSeconds / 60));
                    var seconds = Math.abs(globalTimerSeconds % 60);
                    
                    hackTimer.innerHTML = (globalTimerSeconds < 0 ? "-" : "") + (minutes < 10 ? "0" : "") + minutes + '<span>:</span>' + (seconds < 10 ? "0" : "") + seconds;
                    if (globalTimerSeconds < 35) {
                        hackTimer.classList.add('warn');
                    }
                    if (globalTimerSeconds < 30) {
                        document.querySelectorAll(".hack_timer_container").forEach(function (hackTimerContainer) {
                            hackTimerContainer.classList.add('shake');
                        });
                    }

                    globalTimerSeconds--;
                };
                timerFunc();
                timerInterval = setInterval(timerFunc, 1000);
            }
        });
    });
};
