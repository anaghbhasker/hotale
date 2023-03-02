import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookingcancel, getBookings } from "../../config/Service/UserRequest";
import moment from "moment/moment";
import swal from "sweetalert";

function BookingHistory() {
  const today = moment().format();
  const { token } = useSelector((state) => state.userLogin);
  const [bookings, setBookings] = useState([]);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    async function invoke() {
      const data = await getBookings(token);
      setBookings(data.bookings);
    }
    invoke();
  }, [token, isRender]);

  const bookingCancel = async (bookingId) => {
    const data = await bookingcancel(token, bookingId);
    if (data.status === "success") {
      setIsRender(!isRender);
    }
  };

  return (
    <div className="flex justify-center w-full  ">
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8 ">
        {bookings.map((bookings, i) => (
          <div className="flex flex-col-reverse lg:flex-row items-center p-6 border-black rounded-lg shadow-xl mb-12 ">
            <div className="">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-lg lg:text-lg font-semibold leading-7 lg:leading-9  text-gray-800">Booking id: {bookings._id.substring(0,8)}</h1>
                <p className="text-base font-medium leading-6 text-gray-600">Booking Date: {bookings.bookingdate}</p>
            </div>
              <img
                src={bookings.hotelId.photo1}
                alt="bag"
                className="lg:w-48 h-32 object-cover object-center w-full"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 lg:pr-24">
              {bookings.isUserCancel ? (
                <p className="text-sm font-semibold lg:leading-9 text-red-600 lg:pb-6 md:pb-4 pb-2">
                  Your booking has been canceled!!!
                </p>
              ) : (
                ""
              )}

              <p className="md:text-3xl lg:text-4xl text-2xl font-semibold lg:leading-9 text-gray-800 lg:pb-6 md:pb-4 pb-2">
                {bookings.hotelId.hotelname}
              </p>
              <p className="text-sm leading-5 text-gray-600 md:pb-10 pb-8">
                {bookings.hotelId.description}
              </p>
              <p>Total Price:{bookings.totalprice}₹</p>
            </div>
            <div className="md:block flex items-center justify-center space-x-2">
              {bookings.isUserCancel ? (
                ""
              ) : bookings.check_out < today ? (
                <button
                  onClick={() => {
                    swal({
                      title: "Are you sure?",
                      text: "Once Canceled, you will not be able to recover this booking!",
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        swal("Poof! Your Booking has been canceled!", {
                          icon: "success",
                        });
                        bookingCancel(bookings._id);
                      } else {
                        swal("Your Booking is safe!");
                      }
                    });
                  }}
                  className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-red-600 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800"
                >
                  Cancel Booking
                </button>
              ) : (
                ""
              )}


              {today < bookings.check_out ? (
                <button className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-green-700 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800">
                  Add Feedback
                </button>
              ) : (
                ""
              )}

              <button className="lg:w-auto w-full border border-gray-800 hover:text-gray-50 hover:bg-gray-800 focus:outline-none lg:px-10 px-7 lg:py-4 py-3 text-sm leading-none text-gray-800">
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingHistory;
