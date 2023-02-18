import React from 'react'
import { BellIcon,UserIcon,HomeModernIcon } from "@heroicons/react/24/solid"
import { Email ,DashboardCustomize} from "@mui/icons-material"
import { Link } from 'react-router-dom'

function Bottomnavigate() {
    return (
        <section id="bottom-navigation" className="sm:hidden  md:hidden xl:hidden lg:hidden fixed inset-x-0 bottom-0 z-10 bg-black text-white shadow">
    <div id="tabs" className="flex justify-between">
        <Link to={'/owner'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <DashboardCustomize className="inline-block mb-1 h-7 " />
            {/* <svg width="25" height="25" viewBox="0 0 42 42" className="inline-block mb-1">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z" fill="currentColor" fill-opacity="0.1"></path>
                <path d="M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z" fill="currentColor"></path>
                <path d="M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"></path>
                <rect fill="currentColor" transform="translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) " x="17" y="10.3137085" width="30" height="2" rx="1"></rect>
                <rect fill="currentColor" transform="translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) " x="-3" y="10.3137085" width="30" height="2" rx="1"></rect>
            </g>
            </svg> */}
            <span className="tab tab-home block text-xs">Dashboard</span>
        </Link>
        <Link to={'/owner/showHotels'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <HomeModernIcon className="inline-block mb-1 h-7 "/>
            <span className="tab tab-kategori block text-xs">Hotel Details</span>
        </Link>
        <Link to={'/owner'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <UserIcon className="inline-block mb-1 h-7 "/>
            <span className="tab tab-explore block text-xs">My Profile</span>
        </Link>
        <Link to={'/owner'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
           <BellIcon className="inline-block mb-1 h-7 " />
            <span className="tab tab-whishlist block text-xs">Notification</span>
        </Link>
        <Link to={'/owner'} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
           <Email className="inline-block mb-1 h-7 "/>
            <span className="tab tab-account block text-xs">Message</span>
        </Link>
    </div>
</section>
    )
}

export default Bottomnavigate