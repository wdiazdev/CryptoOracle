import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SingleCoin } from "../config/api";
import { OracleContextState } from "../OracleContext";
import CryptoInfo from "../components/CryptoInfo";
import ReactHTMLParser from "react-html-parser";
import { numberWithCommas } from "../components/Banner/Carousel";


const CoinPage = () => {
    const { id } = useParams();
    const [crypto, setCrypto] = useState();
    const { currency, symbol } = OracleContextState();

    const fetchSingleCrypto = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCrypto(data);
    };

    useEffect(() => {
        fetchSingleCrypto();
        // eslint-disable-next-line
    }, []);


    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            }
        },
        divider: {
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
            borderRight: "2px solid #04D4F0",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            }
        },
        heading: {
            fontFamily: "Montserrat",
            fontWeight: "600",
            marginBottom: 20,
        },
        description: {
            width: "100%",
            fontFamily: "Montserrat",
            textAlign: "justify",
            padding: 25,
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        },
    }));

    const classes = useStyles();

    if (!crypto) return <LinearProgress style={{ backgroundColor: "#04D4F0" }} />;

    return (
        <div className={classes.container}>
            <div className={classes.divider}>
                <img
                    src={crypto?.image.large}
                    alt={crypto?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />

                {/* NAME  */}
                <Typography
                    variant="h3"
                    className={classes.heading}
                >
                    {crypto?.name}
                </Typography>

                {/* DESCRIPTION  */}
                <Typography
                    variant="subtitle1"
                    className={classes.description}
                >
                    {ReactHTMLParser(crypto?.description.en.split(". ")[0])}.
                </Typography>
                <div className={classes.marketData}>

                    {/* RANK  */}
                    <span style={{ display: "flex", }}>
                        <Typography variant="h5" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "600", }}>
                            {crypto?.market_cap_rank}
                        </Typography>
                    </span>

                    {/* CURRENT PRICE */}
                    <span style={{ display: "flex", }}>
                        <Typography variant="h5" className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "600", }}>
                            {symbol}{" "}
                            {numberWithCommas(
                                crypto?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: "flex", }}>

                        {/* MARKET CAP  */}
                        <Typography variant="h5" className={classes.heading}>
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" style={{ fontFamily: "Montserrat", fontWeight: "600", }}>
                            {symbol}{" "}
                            {numberWithCommas(crypto?.market_data.market_cap[currency.toLowerCase()])}
                        </Typography>
                    </span>
                </div>
            </div>
            <CryptoInfo crypto={crypto} />
        </div>
    )
}

export default CoinPage