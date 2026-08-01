
/* ======================================================
   OPENING SEAL SCREEN
====================================================== */

const sealScreen =
    document.getElementById("seal-screen");

const waxSeal =
    document.getElementById("wax-seal");

const envelopeWrapper =
    document.getElementById("envelope-wrapper");

const invitationPage =
    document.getElementById("invitation-page");

const invitationMusic =
    document.getElementById("invitation-music");


let invitationOpened = false;


/**
 * Opens the envelope and reveals the main invitation.
 */
function openInvitation() {
    if (invitationOpened) {
        return;
    }

    invitationOpened = true;

    envelopeWrapper.classList.add("is-opening");

    waxSeal.setAttribute("aria-expanded", "true");

    /*
     * Starting audio from the click event allows playback
     * in browsers that block automatic audio.
     */
    if (invitationMusic) {
        invitationMusic.volume = 0.45;

        invitationMusic
            .play()
            .catch((error) => {
                console.warn(
                    "Music could not start:",
                    error
                );
            });
    }

    /*
     * Wait for the seal and envelope animations.
     */
    window.setTimeout(() => {
        sealScreen.classList.add("is-closing");
    }, 1450);

    /*
     * Reveal the invitation.
     */
    window.setTimeout(() => {
        invitationPage.classList.remove(
            "invitation-page--hidden"
        );

        invitationPage.classList.add(
            "invitation-page--visible"
        );

        document.body.classList.remove(
            "invitation-locked"
        );

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, 1850);

    /*
     * Remove the seal screen after the fade completes.
     */
    window.setTimeout(() => {
        sealScreen.remove();
    }, 2900);
}


if (
    waxSeal &&
    envelopeWrapper &&
    sealScreen &&
    invitationPage
) {
    waxSeal.addEventListener(
        "click",
        openInvitation
    );
}


/* ======================================================
   SEAL SCREEN FALLING PETALS
====================================================== */

const sealPetalLayer =
    document.getElementById("seal-petal-layer");

const SEAL_PETAL_COUNT = 16;


/**
 * Returns a random number between two values.
 *
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
function getSealRandomNumber(
    minimum,
    maximum
) {
    return (
        Math.random() *
        (maximum - minimum) +
        minimum
    );
}


/**
 * Creates one animated seal-screen petal.
 *
 * @returns {HTMLSpanElement}
 */
function createSealPetal() {
    const petal =
        document.createElement("span");

    petal.className =
        "seal-falling-petal";

    const direction =
        Math.random() > 0.5
            ? 1
            : -1;

    petal.style.setProperty(
        "--petal-left",
        `${getSealRandomNumber(3, 97)}%`
    );

    petal.style.setProperty(
        "--petal-size",
        `${getSealRandomNumber(8, 17)}px`
    );

    petal.style.setProperty(
        "--petal-opacity",
        getSealRandomNumber(
            0.3,
            0.7
        ).toFixed(2)
    );

    petal.style.setProperty(
        "--petal-duration",
        `${getSealRandomNumber(9, 16)}s`
    );

    petal.style.setProperty(
        "--petal-delay",
        `${getSealRandomNumber(-16, 0)}s`
    );

    petal.style.setProperty(
        "--petal-sway-duration",
        `${getSealRandomNumber(2.5, 4.8)}s`
    );

    petal.style.setProperty(
        "--petal-drift",
        `${
            direction *
            getSealRandomNumber(30, 100)
        }px`
    );

    petal.style.setProperty(
        "--petal-rotation",
        `${
            direction *
            getSealRandomNumber(240, 720)
        }deg`
    );

    return petal;
}


/**
 * Creates all petals for the opening screen.
 */
function initializeSealPetals() {
    if (!sealPetalLayer) {
        return;
    }

    const fragment =
        document.createDocumentFragment();

    for (
        let index = 0;
        index < SEAL_PETAL_COUNT;
        index += 1
    ) {
        fragment.appendChild(
            createSealPetal()
        );
    }

    sealPetalLayer.appendChild(
        fragment
    );
}


initializeSealPetals();

const wrapper =
document.getElementById("envelope-wrapper");

const seal =
document.getElementById("wax-seal");

seal.addEventListener("click",()=>{

    wrapper.classList.add("open");

    setTimeout(()=>{

        document.body.style.transition="opacity .8s ease";

        document.body.style.opacity="0";

    },1200);



    setTimeout(()=>{

        location.href="invitation.html";

    },1800);

});