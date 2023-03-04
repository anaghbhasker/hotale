import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { Box, ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getBookings } from "../../config/Service/OwnerRequest";

    const theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        body1: {
        color: "#fff",
        },
    },
    });
    function BookingDetails() {

        const location = useLocation();
        const hotelId = location.state.id;

        const [bookings,setBookings]=useState([])

        useEffect(()=>{
            async function invoke(){
                const data=await getBookings(hotelId)
                setBookings(data.bookings)
            }invoke()
          },[hotelId])



    const columns = [
        { field: "_id", headerName: "BookingId", width: 200 },
        { field: "check_in", headerName: "Check_in", width: 200 },
        { field: "check_out", headerName: "Check_out", width: 200 },
        { field: "bookingdate", headerName: "BookingDate", width: 200 },
        { field: "totaldays", headerName: "TotalDays", width: 200 },
        { field: "totalprice", headerName: "TotalPrice", width: 200 },
    ];
    return (
        <ThemeProvider theme={theme}>
        <Box
            sx={{
            mt: 3,
            color: "#fff",
            height: 500,
            width: "100%",
            }}
        >
            <DataGrid
              rows={bookings}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(users) => users._id}
            />
        </Box>
        </ThemeProvider>
    );
}

export default BookingDetails;
