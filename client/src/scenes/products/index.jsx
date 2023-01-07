import React, {useState} from "react";
import {useGetProductsQuery} from "state/api"
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery, CircularProgress
} from "@mui/material"
import Header from "../../components/Header";
import LoadingProgress from "../../components/LoadingProgress";

const Product = ({
                     _id,
                     name,
                     description,
                     price,
                     rating,
                     category,
                     supply,
                     stat
                 }) => {
    const theme = useTheme()
    const [isExpended, setIsExpended] = useState(false)
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem"
            }}
        >
            <CardContent>
                <Typography sx={{fonSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb: "1.5rem"}} color={theme.palette.secondary[400]}>
                    {Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly/>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpended(!isExpended)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpended}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300]
                }}
            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>Yearly Sales This Year: {stat[0].yearlySalesTotal}</Typography>
                    <Typography>Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {
    const {data, isLoading} = useGetProductsQuery()
    const isNonMobile = useMediaQuery("(min-width:1000px)")
    const isMedia1300 = useMediaQuery("(min-width:1400px)")
    console.log(isLoading)
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle="See your list of products"/>
            {data && (
                <Box
                    mt="20px"
                    display="grid"
                    justifyContent="space-between"
                    gridTemplateColumns={!isMedia1300 ? "repeat(4, minmax(0, 1fr))" : "repeat(5, minmax(0, 1fr))"}
                    gap="20px"
                    sx={{
                        "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                    }}
                >
                    {
                        data.map(({_id, name, description, price, rating, category, supply, stat}) => (
                            <Product
                                key={_id}
                                _id={_id}
                                name={name}
                                description={description}
                                price={price}
                                rating={rating}
                                category={category}
                                supply={supply}
                                stat={stat}
                            />
                        ))}
                </Box>
            )}
            <LoadingProgress isLoading={isLoading}/>
        </Box>
    )
}
export default Products