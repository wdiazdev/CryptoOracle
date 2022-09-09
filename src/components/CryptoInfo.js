import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { OracleContextState } from '../OracleContext';
import { HistoricalChart } from '../config/api';
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import DaysData from "../config/DaysData"
import ChartButtons from './ChartButtons';



const CryptoInfo = ({ crypto }) => {
    const [chartData, setChartData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = OracleContextState();

    const fetchChartData = async () => {
        const { data } = await axios.get(HistoricalChart(crypto.id, days, currency));

        setChartData(data.prices);
    };

    console.log(chartData)

    useEffect(() => {
        fetchChartData();
        // eslint-disable-next-line
    }, [currency, days]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const useStyles = makeStyles((theme) => ({
        container: {
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },
        },
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {!chartData ? (
                    <CircularProgress
                        style={{ color: "#04D4F0" }}
                        size={300}
                        thickness={2}
                    />
                ) : (<>
                    <Line
                        data={{
                            labels: chartData.map((crypto) => {
                                let date = new Date(crypto[0]);
                                let time = date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets: [{
                                data: chartData.map((crypto) => crypto[1]),
                                label: `Price (Past ${days} Days) in ${currency}`,
                                borderColor: "#04D4F0",
                            }],
                        }}
                    // options={{
                    //     elements: {
                    //         point: {
                    //             radius: 1,
                    //         },
                    //     },
                    // }}
                    />
                    <div
                        style={{
                            width: "60%",
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: 20,
                        }}
                    >
                        {DaysData.map(day => {
                            return (
                                <ChartButtons
                                    key={day.value}
                                    onClick={() => {
                                        setDays(day.value);
                                    }}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </ChartButtons >
                            )
                        })}
                    </div>
                </>
                )}
            </div>
        </ThemeProvider >
    )
};

export default CryptoInfo;
