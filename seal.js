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
 * Attempts to start the shared invitation music.
 *
 * Audible autoplay may still be blocked by the browser
 * until the first user interaction.
 */
async function playInvitationMusic() {
    if (!invitationMusic) {
        return;
    }

    invitationMusic.volume = 0.35;

    if (!invitationMusic.paused) {
        removeMusicUnlockListeners();
        return;
    }

    try {
        await invitationMusic.play();
        removeMusicUnlockListeners();
    } catch {
        // The first pointer, touch, or keyboard interaction
        // will try again.
    }
}


/**
 * Starts music after the browser receives
 * a valid user interaction.
 */
function unlockInvitationMusic() {
    playInvitationMusic();
}


/**
 * Removes fallback listeners after playback starts.
 */
function removeMusicUnlockListeners() {
    document.removeEventListener(
        "pointerdown",
        unlockInvitationMusic
    );

    document.removeEventListener(
        "touchstart",
        unlockInvitationMusic
    );

    document.removeEventListener(
        "keydown",
        unlockInvitationMusic
    );
}


/**
 * Opens the envelope and reveals the invitation.
 */
function openInvitation() {
    if (
        invitationOpened ||
        !sealScreen ||
        !waxSeal ||
        !envelopeWrapper ||
        !invitationPage
    ) {
        return;
    }

    invitationOpened = true;
    waxSeal.disabled = true;

    waxSeal.setAttribute(
        "aria-expanded",
        "true"
    );

    /*
     * This call happens during the seal click,
     * so browsers are much more likely to allow it.
     */
    playInvitationMusic();

    envelopeWrapper.classList.add("open");

    window.setTimeout(() => {
        sealScreen.classList.add("is-closing");
    }, 2200);

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

        document.body.style.opacity = "1";
        document.body.style.overflowY = "auto";

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, 2600);

    window.setTimeout(() => {
        sealScreen.remove();
    }, 3400);
}


/* Seal click */
if (waxSeal) {
    waxSeal.addEventListener(
        "click",
        openInvitation
    );
}


/*
 * First attempt: start automatically on page load.
 */
window.addEventListener(
    "load",
    playInvitationMusic
);


/*
 * Fallback: start at the earliest permitted interaction
 * if autoplay was blocked.
 */
document.addEventListener(
    "pointerdown",
    unlockInvitationMusic
);

document.addEventListener(
    "touchstart",
    unlockInvitationMusic,
    { passive: true }
);

document.addEventListener(
    "keydown",
    unlockInvitationMusic
);