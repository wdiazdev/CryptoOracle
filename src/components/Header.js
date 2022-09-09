import React from "react"
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { OracleContextState } from "../OracleContext";




// STYLED COMPONENT 
const useStyles = makeStyles(() => ({
    brandName: {
        flex: 1,
        color: "#04D4F0",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
}));

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { currency, setCurrency } = OracleContextState();


    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate("/")}
                            className={classes.brandName}
                            variant="h5">
                            CryptoOracle
                        </Typography>
                        <Select
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 50,
                                marginRight: 10,
                                fontFamily: "Montserrat",
                                color: "#04D4F0",
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
};

export default Header

