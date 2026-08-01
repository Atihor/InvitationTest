/* ======================================================
   ENGAGEMENT COUNTDOWN
   Target: 30 August 2026, 1:30 PM IST
====================================================== */

const countdownTarget = new Date("2026-08-30T13:30:00+05:30");

const countdownElements = {
    days: document.getElementById("countdown-days"),
    hours: document.getElementById("countdown-hours"),
    minutes: document.getElementById("countdown-minutes"),
    seconds: document.getElementById("countdown-seconds"),
    grid: document.querySelector(".countdown-grid"),
    completeMessage: document.getElementById(
        "countdown-complete-message"
    )
};

/**
 * Formats countdown values with a leading zero.
 *
 * @param {number} value
 * @returns {string}
 */
function formatCountdownValue(value) {
    return String(value).padStart(2, "0");
}

/**
 * Updates all countdown values.
 *
 * @returns {boolean} True while the countdown is active.
 */
function updateCountdown() {
    const currentTime = new Date();
    const remainingTime =
        countdownTarget.getTime() - currentTime.getTime();

    if (remainingTime <= 0) {
        countdownElements.days.textContent = "00";
        countdownElements.hours.textContent = "00";
        countdownElements.minutes.textContent = "00";
        countdownElements.seconds.textContent = "00";

        countdownElements.grid.hidden = true;
        countdownElements.completeMessage.hidden = false;

        return false;
    }

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute =
        millisecondsPerSecond * 60;
    const millisecondsPerHour =
        millisecondsPerMinute * 60;
    const millisecondsPerDay =
        millisecondsPerHour * 24;

    const days = Math.floor(
        remainingTime / millisecondsPerDay
    );

    const hours = Math.floor(
        (remainingTime % millisecondsPerDay) /
        millisecondsPerHour
    );

    const minutes = Math.floor(
        (remainingTime % millisecondsPerHour) /
        millisecondsPerMinute
    );

    const seconds = Math.floor(
        (remainingTime % millisecondsPerMinute) /
        millisecondsPerSecond
    );

    countdownElements.days.textContent =
        formatCountdownValue(days);

    countdownElements.hours.textContent =
        formatCountdownValue(hours);

    countdownElements.minutes.textContent =
        formatCountdownValue(minutes);

    countdownElements.seconds.textContent =
        formatCountdownValue(seconds);

    return true;
}

/* Run immediately so the page does not display 00 initially. */
const countdownIsActive = updateCountdown();

if (countdownIsActive) {
    const countdownInterval = window.setInterval(() => {
        const isStillActive = updateCountdown();

        if (!isStillActive) {
            window.clearInterval(countdownInterval);
        }
    }, 1000);
}

/* ======================================================
   FALLING PETALS
====================================================== */

const petalLayer = document.getElementById("petal-layer");

const PETAL_COUNT = 18;

/**
 * Returns a random number between the given limits.
 *
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
function getRandomNumber(minimum, maximum) {
    return Math.random() * (maximum - minimum) + minimum;
}

/**
 * Creates one animated flower petal.
 *
 * @returns {HTMLSpanElement}
 */
function createPetal() {
    const petal = document.createElement("span");

    petal.className = "falling-petal";

    const direction =
        Math.random() > 0.5 ? 1 : -1;

    petal.style.setProperty(
        "--petal-left",
        `${getRandomNumber(0, 100)}vw`
    );

    petal.style.setProperty(
        "--petal-size",
        `${getRandomNumber(8, 18)}px`
    );

    petal.style.setProperty(
        "--petal-opacity",
        getRandomNumber(0.35, 0.75).toFixed(2)
    );

    petal.style.setProperty(
        "--petal-duration",
        `${getRandomNumber(10, 18)}s`
    );

    petal.style.setProperty(
        "--petal-delay",
        `${getRandomNumber(-18, 0)}s`
    );

    petal.style.setProperty(
        "--petal-sway-duration",
        `${getRandomNumber(2.5, 5)}s`
    );

    petal.style.setProperty(
        "--petal-drift",
        `${direction * getRandomNumber(30, 110)}px`
    );

    petal.style.setProperty(
        "--petal-rotation",
        `${direction * getRandomNumber(240, 720)}deg`
    );

    return petal;
}

/**
 * Adds all decorative petals to the page.
 */
function initializeFallingPetals() {
    if (!petalLayer) {
        return;
    }

    const fragment =
        document.createDocumentFragment();

    for (
        let index = 0;
        index < PETAL_COUNT;
        index += 1
    ) {
        fragment.appendChild(createPetal());
    }

    petalLayer.appendChild(fragment);
}

initializeFallingPetals();
