import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { TrendingCoins } from '../../config/api';
import { OracleContextState } from '../../OracleContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(() => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
        textTransform: "uppercase",
    }
}));


// TO ADD COMMAS TO THE PRICE 
export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency, symbol } = OracleContextState();

    // TO FETCH TRENDING COINS 
    const trendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))

        setTrending(data);
    };

    useEffect(() => {
        trendingCoins();
        // eslint-disable-next-line
    }, [currency]);

    // ITEMS CONTAINED IN CAROUSEL 



    const items = trending.map((crypto) => {
        let priceChange = crypto.price_change_percentage_24h >= 0;


        return (
            <Link
                className={classes.carouselItem}
                // TO GO TO COIN PAGE ID FROM CAROUSEL 
                to={`/coins/${crypto.id}`}
            >
                <img
                    src={crypto?.image}
                    alt={crypto.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span className={classes.symbolStyles}>{crypto?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: priceChange > 0 ? "#7CFC00" : "#FF0000",
                            fontWeight: 600,
                        }}
                    >
                        {priceChange && "+"}
                        {crypto?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span
                    style={{
                        fontSize: 24,
                        fontWeight: 600,
                    }}>
                    {symbol}{numberWithCommas(crypto?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    // TO MAKE CAROUSEL RESPONSIVE
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    // CAROUSEL SETTINGS 
    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel;