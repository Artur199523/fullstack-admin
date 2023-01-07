import React from "react"
import {Box, CircularProgress} from "@mui/material";

const LoadingProgress = ({isLoading}) => {
    return (
        <React.Fragment>
            {
                isLoading &&
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                >
                    <CircularProgress color="inherit"/>
                </Box>
            }
        </React.Fragment>
    )
}
export default LoadingProgress