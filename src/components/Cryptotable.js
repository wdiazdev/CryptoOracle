import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CoinList } from '../config/api';
import { OracleContextState } from '../OracleContext';
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@material-ui/core';
import { Pagination, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from './Banner/Carousel';



const Cryptotable = () => {
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { currency, symbol } = OracleContextState();
    const navigate = useNavigate();


    const fetchCryptos = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency))

        setCrypto(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCryptos();
        // eslint-disable-next-line
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return crypto.filter(
            (crypto) =>
                crypto.name.toLowerCase().includes(search) ||
                crypto.symbol.toLowerCase().includes(search)
        );
    };

    const useStyles = makeStyles(() => ({
        row: {
            backgroundColor: "#111",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#2b2b2b",
            },
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "#04D4F0",
            },
        },
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                style={{
                    textAlign: "center"
                }}
            >
                <Typography
                    variant='h4'
                    style={{
                        margin: 20,
                        fontFamily: "Montserrat"
                    }}
                >
                    Currency Prices By Market Cap
                </Typography>
                <TextField
                    label="Search For Your Favorite Crypto"
                    variant="outlined"
                    style={{
                        width: "80%",
                        marginBottom: 20,
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "#04D4F0" }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#04D4F0" }}>
                                    <TableRow>
                                        {["Name", "Price", "24h%", "Market Cap", "Circulating Supply"].map((tableHead) => (
                                            <TableCell
                                                style={{
                                                    color: "#111",
                                                    fontWeight: "600",
                                                    fontSize: 16,
                                                    fontFamily: "Montserrat"
                                                }}
                                                key={tableHead}
                                                align={tableHead === "Name" ? "" : "right"}
                                            >
                                                {tableHead}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch()
                                        // TO BETTER DISTRIBUTE THE TABLE CONTENT IN DIFFERENT PAGES 
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((row) => {
                                            const priceChange = row.price_change_percentage_24h >= 0;
                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}
                                                >

                                                    {/* TABLE CELL FOR IMAGE, SYMBOL AND NAME */}
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 15,
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ margin: 10 }}
                                                        />
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "column"
                                                            }}>
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 18,
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    color: "#04D4F0"
                                                                }}
                                                            >
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>

                                                    {/* TABLE CELL FOR PRICE */}
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        {symbol}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>

                                                    {/* TABLE CELL FOR PRICE CHANGE  */}
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: priceChange > 0 ? "#7CFC00" : "#FF0000",
                                                            fontWeight: 600,
                                                            fontFamily: "Montserrat"
                                                        }}
                                                    >
                                                        {priceChange && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>

                                                    {/* TABLE CELL FOR MARKET CAP  */}
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        {numberWithCommas(row.market_cap.toFixed(0))}
                                                    </TableCell>

                                                    {/* TABLE CELL FOR CIRCULATING SUPPLY  */}
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            fontFamily: "Montserrat",
                                                        }}
                                                    >
                                                        {numberWithCommas(row.circulating_supply.toFixed(0))} {row.symbol.toUpperCase()}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}

                                </TableBody>
                            </Table>
                        )}
                </TableContainer>

                <Pagination
                    // COUNT TO DETERMINE THE # OF PAGES 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        padding: 20,
                    }}
                    classes={{ ul: classes.pagination }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />

            </Container>
        </ThemeProvider >
    )
}

export default Cryptotable;