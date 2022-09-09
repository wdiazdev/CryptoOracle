import React from 'react'
import { Container, Typography, makeStyles } from "@material-ui/core";
import Carousel from './Carousel';


const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./bannerImage.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    bannerStyles: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 400,
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
}));

const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerStyles}>
                <div className={classes.header}>
                    <Typography
                        variant='H1'
                        style={{
                            fontWeight: "bold",
                            fontFamily: "Montserrat",
                            fontSize: 80,
                            marginBottom: 10,
                        }}
                    >
                        CryptoOracle
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color: "#04D4F0",
                            fontSize: 18,
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            textTransform: "capitalize",
                        }}
                    >
                        Today's Cryptocurrency Prices by Market Cap
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
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