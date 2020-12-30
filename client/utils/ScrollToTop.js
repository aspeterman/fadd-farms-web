import { Fab, makeStyles } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
    scroll: {
        display: 'flex',
        float: 'right',
        margin: theme.spacing(3)
    }
}))

export default function ScrollToTop() {
    const classes = useStyles()

    const [isVisible, setVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    document.addEventListener("scroll", function () {
        toggleVisibility();
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    return (
        <div className={classes.scroll}>
            {isVisible && (
                <div onClick={() => scrollToTop()}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <ArrowUpward />
                    </Fab>
                </div>
            )}
        </div>
    );
}
