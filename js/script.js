/* ==========================================================
   ELEMENTS
========================================================== */

const columns = document.querySelectorAll(
    ".column:not(.side-column)"
);

const mobileColumns = Array.from(
    document.querySelectorAll(".main-column")
);

const sideColumn =
    document.querySelector(".side-column");

const columnsContainer =
    document.querySelector(".columns");


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


        const isExpanded =
            column.classList.contains("is-expanded");

        const isExpandedMore =
            column.classList.contains("is-expanded-more");


        /* ------------------------------------------------------
           KLICK 3
           3 spalter bred → tillbaka till grundläge
        ------------------------------------------------------ */

        if (isExpandedMore) {

            column.classList.remove(
                "is-expanded",
                "is-expanded-more"
            );

            if (sideColumn) {
                sideColumn.classList.remove("is-hidden");
            }

            return;
        }


        /* ------------------------------------------------------
           KLICK 2
           2 spalter bred → 3 spalter bred
        ------------------------------------------------------ */

        if (isExpanded) {

            column.classList.add("is-expanded-more");

            return;
        }


        /* ------------------------------------------------------
           KLICK 1
           Grundläge → 2 spalter bred
        ------------------------------------------------------ */

        columns.forEach((otherColumn) => {

            otherColumn.classList.remove(
                "is-expanded",
                "is-expanded-more"
            );

        });


        column.classList.add("is-expanded");


        /* Hide side column */

        if (sideColumn) {
            sideColumn.classList.add("is-hidden");
        }

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


    /* First visible tab */

    if (inactiveColumns[0]) {

        inactiveColumns[0].classList.add(
            "is-mobile-tab-1"
        );

    }


    /* Second visible tab */

    if (inactiveColumns[1]) {

        inactiveColumns[1].classList.add(
            "is-mobile-tab-2"
        );

    }

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

           Click the fullscreen column again.
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

           Click the already active column.
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

           Click one of the two visible tabs.
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
            "is-mobile-full"
        );

    });


    if (columnsContainer) {

        columnsContainer.classList.remove(
            "has-mobile-full"
        );

    }

});