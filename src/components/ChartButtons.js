import { makeStyles } from '@material-ui/core'
import React from 'react'

const ChartButtons = ({ children, selected, onClick }) => {
    const useStyles = makeStyles((theme) => ({
        buttons: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #fff",
            borderRadius: 5,
            padding: 10,
            fontFamily: "Montserrat",
            textAlign: "center",
            cursor: "pointer",
            width: "22%",
            backgroundColor: selected ? "#04D4F0" : "",
            color: selected ? "black" : "#fff",
            fontWeight: selected ? 600 : 400,
            "&:hover": {
                backgroundColor: "#fff",
                color: "#111",
                border: "2px solid #04D4F0",
            },
            [theme.breakpoints.down("sm")]: {
                width: "100%",
                fontSize: 14,
            },
            [theme.breakpoints.down("xs")]: {
                width: "100%",
                fontSize: 10,
            },
        },
    }));

    const classes = useStyles();

    return (
        <span onClick={onClick} className={classes.buttons}>
            {children}
        </span>
    );
};

export default ChartButtons;