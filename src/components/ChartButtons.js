import { makeStyles } from '@material-ui/core'
import React from 'react'

const ChartButtons = ({ children, selected, onClick }) => {
    const useStyles = makeStyles({
        buttons: {
            border: "2px solid #fff",
            borderRadius: 5,
            padding: 10,
            fontFamily: "Montserrat",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: selected ? "#04D4F0" : "",
            color: selected ? "black" : "#fff",
            fontWeight: selected ? 600 : 400,
            "&:hover": {
                backgroundColor: "#fff",
                color: "#111",
            },
            width: "20%",
        },
    });

    const classes = useStyles();

    return (
        <span onClick={onClick} className={classes.buttons}>
            {children}
        </span>
    );
};

export default ChartButtons;