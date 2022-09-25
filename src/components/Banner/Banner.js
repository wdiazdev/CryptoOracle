import React from 'react'
import { Container, makeStyles } from "@material-ui/core";
import Carousel from './Carousel';
import BannerImage from "./bannerimage.jpg";

const useStyles = makeStyles((theme) => ({
    banner: {
        backgroundImage: `url(${BannerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    bannerStyles: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 400,
        [theme.breakpoints.down("sm")]: {
            height: 350,
        },
        [theme.breakpoints.down("xs")]: {
            height: 300,
        },
    },
    header: {
        textAlign: "center",
        fontWeight: 600,
        fontFamily: "Montserrat",
        fontSize: 45,
        marginBottom: 10,
        [theme.breakpoints.down("sm")]: {
            fontSize: 30,
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: 22,
        },
    },
    subheader: {
        color: "#04D4F0",
        fontSize: 16,
        fontWeight: 600,
        fontFamily: "Montserrat",
        textTransform: "capitalize",
        textAlign: "center",
        marginBottom: 20,
        [theme.breakpoints.down("sm")]: {
            fontSize: 14,
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: 10,
        },
    }
}));

const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerStyles}>
                <div className={classes.header}>
                    <h1>CryptoOracle</h1>
                </div>
                <div className={classes.subheader}>
                    <h3>Today's Cryptocurrency Prices by Market Cap</h3>
                </div>
                <Carousel />
            </Container >
        </div >
    )
}

export default Banner;

























// // import { ClassNames } from '@emotion/react'
// import { Container, makeStyles } from '@material-ui/core'
// import React from 'react'

// const useStyles = makeStyles(() => ({
//     banner: {
//         backgroundImage: "url(./bannerImage.jpg)",
//     },
//     bannerStyles: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         height: "400",
//     }
// }));

// const Banner = () => {
//     const classes = useStyles();

//     return (
//         <div className={classes.banner}>
//             <Container className={classes.bannerStyles}>

//             </Container>
//         </div>
//     )
// }

// export default Banner;