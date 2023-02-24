import React, { useEffect, useState } from "react";
import NavbarNew from "../../components/User/NavbarNew";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Maillist from "../../components/User/Maillist/Maillist";
import Footer from "../../components/User/Footer/Footer";
import VpnLockIcon from "@mui/icons-material/VpnLock";
// import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
// import CountdownTimer from "../../components/User/CountdownTimer";
import { useLocation } from "react-router-dom";
import { hoteView } from "../../config/Service/UserRequest";
import moment from "moment/moment";

function BookingPage() {
  const location=useLocation()
  const details =location.state.obj
  console.log(details);
  const startDate=moment(details.date[0].startDate).format('DD-MM-YYYY');
  const endDate=moment(details.date[0].endDate).format('DD-MM-YYYY');

  const [hotel,setHotel]=useState()  
  useEffect(()=>{
    async function invoke(){
      const data=await hoteView(details.hotelId)
      setHotel(data.hotel)
    }invoke()
  },[details.hotelId])


  const paymentNow=async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj={
      hotelId:details.hotelId,
      userToken:details.usertoken,
      adult:details.peoples.adult,
      children:details.peoples.children,
      check_in:startDate,
      check_out:endDate,
      bookingdate:moment().format('DD-MM-YYYY'),
      totaldays:details.totaldays,
      totalprice:details.totalprice,
      totalrooms:details.peoples.room,
      // firstname:data.get("firstName")
    }
    console.log(obj);
  }

  return (
    <div>
      <NavbarNew />
      <div className="flex flex-wrap md:px-40 mt-5">
        <div className="w-full md:w-1/2 lg:w-9/12 p-4 h-20 flex justify-between border shadow-lg rounded-md">
          <div className="flex gap-2">
            <VpnLockIcon fontSize="large" />
            <div>
              <p className="text-blue-500 font-semibold">
                Please fill this form to use your cash!
              </p>
              <p className="hidden md:block">
                Your hotale account allows for faster bookings and more rewards.
              </p>
            </div>
          </div>
          {/* <h1 className="text-red-500">We are holding your price…<AccessAlarmsIcon/><CountdownTimer/></h1> */}
        </div>

        <div className="w-full md:w-1/2 lg:w-9/12 p-4 mt-5 border shadow-lg rounded-md">
          <Box
          component="form"
          onSubmit={paymentNow}
          noValidate
          sx={{
            marginTop: 0,
            scrollPaddingBlock: 4,
            display: "flex",
            border: 1,
            borderRadius: 2,
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 4,
            paddingLeft: 4,
            paddingRight: 4,
        }}
          >
          <Typography variant="h6" gutterBottom>
            Let us know who you are
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="Email"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                autoComplete="Phone number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
              />
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                className={'mb-2 bg-white text-black hover:bg-black hover:text-white '}
                >
                Payment now
                </Button>
          </Grid>
          </Box>
        </div>
        <div className="w-full md:w-1/2 lg:w-3/12 p-4 mt-5 border shadow-lg rounded-md">
          <div>
          <img src={hotel?.photo1} alt="" className="h-28 w-full" />
            <p className="text-base font-black leading-9 text-gray-800">
              {hotel?.hotelname}
            </p>
            <p className="text-xs text-gray-800">
              {hotel?.description}
            </p>
            <div className="flex items-center justify-between pt-10">
              <p className="text-sm font-bold leading-none text-gray-800">{startDate} - {endDate}</p>
              <p className="text-base leading-none text-gray-800">{details.totaldays} Days</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800">Total Rooms</p>
              <p className="text-base leading-none text-gray-800">{details.peoples.room}</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800">Adult</p>
              <p className="text-base leading-none text-gray-800">{details.peoples.adult}</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800">Children</p>
              <p className="text-base leading-none text-gray-800">{details.peoples.children}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
              <p className="text-2xl leading-normal text-gray-800">Total Price</p>
              <p className="text-2xl font-bold leading-normal text-right text-gray-800">
              {details.totalprice}₹
              </p>
            </div>
          </div>
        </div>
      </div>
      <Maillist />
      <Footer />
    </div>
  );
}

export default BookingPage;
