import React, {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Header from "../../components/Header";
import OverViewChart from "../../components/OverViewChart";
import {useGetSalesQuery} from "../../state/api";
import LoadingProgress from "../../components/LoadingProgress";

const Overview = () => {
    const [view, setView] = useState("units")
    const {isLoading} = useGetSalesQuery();

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="OVERVIEW" subtitle="Overview of general revenue and profit"/>
            <Box height="75vh">
                <FormControl sx={{mt: "1rem"}}>
                    <InputLabel>View</InputLabel>
                    <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverViewChart view={view} isDashboard={false}/>
                <LoadingProgress isLoading={isLoading}/>
            </Box>
        </Box>
    )
}
export default Overview