/* ==========================================================
   ELEMENTS
========================================================== */

const columns = document.querySelectorAll(
    ".column"
);

const mobileColumns = Array.from(
    document.querySelectorAll(".main-column")
);

const columnsContainer =
    document.querySelector(".columns");


/* ==========================================================
   INTRO OVERLAY
========================================================== */

const introOverlay =
    document.querySelector("#intro-overlay");

let inactivityTimer;


/* ----------------------------------------------------------
   SETTINGS
---------------------------------------------------------- */

const mobileIntroDuration = 3000;
const inactivityDelay = 45000;


/* ----------------------------------------------------------
   HIDE INTRO
---------------------------------------------------------- */

function hideIntro() {

    if (!introOverlay) return;

    introOverlay.classList.add("is-hidden");

}


/* ----------------------------------------------------------
   SHOW INTRO
---------------------------------------------------------- */

function showIntro() {

    if (!introOverlay) return;

    introOverlay.classList.remove("is-hidden");

}


/* ----------------------------------------------------------
   RESET INACTIVITY TIMER
---------------------------------------------------------- */

function resetInactivityTimer() {

    hideIntro();

    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {

        showIntro();

    }, inactivityDelay);

}


/* ----------------------------------------------------------
   INITIAL INTRO
---------------------------------------------------------- */

if (introOverlay) {

    showIntro();


    /* ------------------------------------------------------
       MOBILE

       Fade away automatically after 3 seconds.
    ------------------------------------------------------ */

    if (window.innerWidth <= 768) {

        setTimeout(() => {

            hideIntro();

            clearTimeout(inactivityTimer);

            inactivityTimer = setTimeout(() => {

                showIntro();

            }, inactivityDelay);

        }, mobileIntroDuration);

    }


    /* ------------------------------------------------------
       DESKTOP

       No automatic fade.
       Intro stays visible until user activity.
    ------------------------------------------------------ */


    /* ------------------------------------------------------
       USER ACTIVITY
    ------------------------------------------------------ */

    [
        "mousemove",
        "mousedown",
        "keydown",
        "touchstart",
        "scroll"
    ].forEach((eventName) => {

        window.addEventListener(
            eventName,
            resetInactivityTimer,
            { passive: true }
        );

    });

}


/* ==========================================================
   DESKTOP — EXPANDABLE COLUMNS
========================================================== */

columns.forEach((column) => {

    column.addEventListener("click", (event) => {

        /* Desktop only */

        if (window.innerWidth <= 768) {
            return;
        }


        /* Let links work normally */

        if (event.target.closest("a")) {
            return;
        }


        const isExpanded2 =
            column.classList.contains("is-expanded-2");

        const isExpanded3 =
            column.classList.contains("is-expanded-3");


        /* ------------------------------------------------------
           RESET FUNCTION
        ------------------------------------------------------ */

        function resetDesktopColumns() {

            columns.forEach((otherColumn) => {

                otherColumn.classList.remove(
                    "is-expanded-2",
                    "is-expanded-3",
                    "is-secondary"
                );

            });

            if (columnsContainer) {

                columnsContainer.classList.remove(
                    "has-expanded-3"
                );

            }

        }


        /* ------------------------------------------------------
           KLICK 3
           Tillbaka till fem lika stora spalter
        ------------------------------------------------------ */

        if (isExpanded3) {

            resetDesktopColumns();

            return;
        }


        /* ------------------------------------------------------
           KLICK 2
           60% + 20% + tre smala spalter
        ------------------------------------------------------ */

        if (isExpanded2) {

            resetDesktopColumns();

            column.classList.add(
                "is-expanded-3"
            );


            if (columnsContainer) {

                columnsContainer.classList.add(
                    "has-expanded-3"
                );

            }


            /* Find the other columns */

            const otherColumns =
                Array.from(columns).filter(
                    otherColumn =>
                        otherColumn !== column
                );


            /* First remaining column stays normal width */

            if (otherColumns[0]) {

                otherColumns[0].classList.add(
                    "is-secondary"
                );

            }

            return;
        }


        /* ------------------------------------------------------
           KLICK 1
           Selected column becomes two columns wide
        ------------------------------------------------------ */

        resetDesktopColumns();

        column.classList.add(
            "is-expanded-2"
        );

    });

});

/* ==========================================================
   MOBILE — SET ACTIVE COLUMN
========================================================== */

function setMobileActiveColumn(activeColumn) {

    if (window.innerWidth > 768) {
        return;
    }


    const inactiveColumns =
        mobileColumns.filter(
            column => column !== activeColumn
        );


    /* Reset mobile states */

    mobileColumns.forEach((column) => {

        column.classList.remove(
    "is-mobile-active",
    "is-mobile-tab-1",
    "is-mobile-tab-2",
    "is-mobile-tab-3",
    "is-mobile-full"
);

    });


    /* Remove fullscreen state */

    if (columnsContainer) {

        columnsContainer.classList.remove(
            "has-mobile-full"
        );

    }


    /* Active column */

    activeColumn.classList.add(
        "is-mobile-active"
    );


    /* ------------------------------------------------------
       Assign tab positions automatically
    ------------------------------------------------------ */

    inactiveColumns.forEach((column, index) => {

        column.classList.add(
            `is-mobile-tab-${index + 1}`
        );

    });

}


/* ==========================================================
   MOBILE — CLICK NAVIGATION
========================================================== */

mobileColumns.forEach((column) => {

    column.addEventListener("click", (event) => {

        /* Mobile only */

        if (window.innerWidth > 768) {
            return;
        }


        /* Let links work normally */

        if (event.target.closest("a")) {
            return;
        }


        const isActive =
            column.classList.contains(
                "is-mobile-active"
            );

        const isFull =
            column.classList.contains(
                "is-mobile-full"
            );


        /* ------------------------------------------------------
           FULL → ACTIVE + TABS
        ------------------------------------------------------ */

        if (isFull) {

            column.classList.remove(
                "is-mobile-full"
            );

            if (columnsContainer) {

                columnsContainer.classList.remove(
                    "has-mobile-full"
                );

            }

            return;
        }


        /* ------------------------------------------------------
           ACTIVE → FULL
        ------------------------------------------------------ */

        if (isActive) {

            mobileColumns.forEach(
                (otherColumn) => {

                    otherColumn.classList.remove(
                        "is-mobile-full"
                    );

                }
            );


            column.classList.add(
                "is-mobile-full"
            );


            if (columnsContainer) {

                columnsContainer.classList.add(
                    "has-mobile-full"
                );

            }

            return;
        }


        /* ------------------------------------------------------
           TAB → ACTIVE
        ------------------------------------------------------ */

        setMobileActiveColumn(column);

    });

});


/* ==========================================================
   INITIAL MOBILE STATE
========================================================== */

function initializeMobileLayout() {

    if (
        window.innerWidth <= 768 &&
        mobileColumns.length
    ) {

        const currentActive =
            document.querySelector(
                ".main-column.is-mobile-active"
            );

        if (!currentActive) {

            setMobileActiveColumn(
                mobileColumns[0]
            );

        }

    }

}


/* Run on page load */

initializeMobileLayout();


/* ==========================================================
   WINDOW RESIZE
========================================================== */

window.addEventListener("resize", () => {

    /* Entering mobile */

    if (window.innerWidth <= 768) {

        initializeMobileLayout();

        return;
    }


    /* Entering desktop:
       remove all mobile-only states */

    mobileColumns.forEach((column) => {

column.classList.remove(
    "is-mobile-active",
    "is-mobile-tab-1",
    "is-mobile-tab-2",
    "is-mobile-tab-3",
    "is-mobile-full"
);

    });


    if (columnsContainer) {

        columnsContainer.classList.remove(
            "has-mobile-full"
        );

    }

});