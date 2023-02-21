import React, { useEffect, useState } from 'react'
import './hotelDeatils.css'
import NavbarNew from '../../components/User/NavbarNew'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Maillist from '../../components/User/Maillist/Maillist';
import Footer from '../../components/User/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { hoteView } from '../../config/Service/UserRequest';
import UserMap from '../../components/User/UserMap';

function HotelDetailsPage() {
  

  const location = useLocation();
  const hotelId=location.state.hotelId
  const date=location.state.date
  const option=location.state.option

  const [hotel,setHotel]=useState()
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false)

  useEffect(()=>{
    async function invoke(){
      const data=await hoteView(hotelId)
      setHotel(data.hotel)
    }invoke()
  },[hotelId])
  

  const photos = [
    {
      src: hotel?.photo1,
    },
    {
      src: hotel?.photo2,
    },
    {
      src: hotel?.photo3,
    }
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 2 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
        <NavbarNew/>
        <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{hotel?.hotelname}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel?.location}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over {hotel?.price}₹ at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          
          <UserMap/>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                {hotel?.description}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div>
      <Maillist/>
      <Footer/>
    </div>
  )
}

export default HotelDetailsPage