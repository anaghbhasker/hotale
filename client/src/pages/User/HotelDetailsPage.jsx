import React, { useEffect, useState } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "./hotelDeatils.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarNew from "../../components/User/NavbarNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Maillist from "../../components/User/Maillist/Maillist";
import Footer from "../../components/User/Footer/Footer";
import { useLocation } from "react-router-dom";
import { hoteView } from "../../config/Service/UserRequest";
import UserMap from "../../components/User/UserMap";
import Fesility from "../../components/User/Fesility";
import { useSelector } from "react-redux";

function HotelDetailsPage() {
  const location = useLocation();
  const hotelId = location.state.hotelId;
  const date = location.state.date;
  const option = location.state.option;
  const peoples = (option.adult + option.children) / 4;
  const { token } = useSelector((state) => state.userLogin);

  const startDate = new Date(date[0].startDate);
  const endDate = new Date(date[0].endDate);
  const diffInMs = Math.abs(startDate - endDate);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const [hotel, setHotel] = useState();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function invoke() {
      const data = await hoteView(hotelId);
      setHotel(data.hotel);
    }
    invoke();
  }, [hotelId]);

  const totalPrice = hotel?.price * diffInDays * option.room;

  const photos = [
    {
      src: hotel?.photo1,
    },
    {
      src: hotel?.photo2,
    },
    {
      src: hotel?.photo3,
    },
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

    setSlideNumber(newSlideNumber);
  };

  const handleBooking = async () => {
    if (option.room >= peoples) {
      setErr(false);
      if (token) {
        setErr(false);
        if (option.room <= hotel?.totalrooms) {
          setErr(false);
          if (diffInDays !== 0) {
            setErr(false);
            let obj = {
              usertoken: token,
              hotelId: hotelId,
              peoples: option,
              date: date,
              totaldays: diffInDays,
              totalprice: totalPrice,
            };
            console.log(obj);
          } else {
            toast.error(`Please select your days!!!`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        } else {
          setErr(true);
        }
      } else {
        toast.error(`Please login your account!!!`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      setErr(true);
    }
  };

  return (
    <div>
      <ToastContainer />
      <NavbarNew />
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
          <button
            onClick={() => {
              handleBooking();
            }}
            className="bookNow"
          >
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{hotel?.hotelname}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel?.location}</span>
          </div>
          {err ? (
            <span className="text-xs font-bold text-red-600 font-style: italic">
              <ReportProblemIcon />
              The number of rooms is not sufficiant for the number of people you
              have enterd!!!
            </span>
          ) : (
            ""
          )}

          <span className="hotelPriceHighlight">
            Book a stay over {hotel?.price}₹ at this property and available
            rooms are {hotel?.totalrooms} in now.
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg h-48"
                />
              </div>
            ))}
          </div>

          <UserMap />
          <Fesility />

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">{hotel?.description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {diffInDays}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <p className="text-red-500">Total Rooms:{option.room}</p>
              <h2>
                <b>{totalPrice}₹</b> ({diffInDays} Days)
              </h2>
              <button
                onClick={() => {
                  handleBooking();
                }}
              >
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>
      <Maillist />
      <Footer />
    </div>
  );
}

export default HotelDetailsPage;
