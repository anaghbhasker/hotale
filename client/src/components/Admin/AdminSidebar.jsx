import React from 'react'

import { UserIcon,HomeModernIcon ,ClipboardDocumentCheckIcon} from "@heroicons/react/24/solid"
import { Email,DashboardCustomize,SettingsAccessibility} from "@mui/icons-material"

import { Link } from 'react-router-dom';
import AdminSidebarlinks from './AdminSidebarlinks';

function AdminSidebar() {
    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex item-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
         {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={300} height={300}></Image> */}
        <h4 className="text-white text-lg ml-2 xl:ml-8 font-bold p-2 ">Hotale</h4>
        </div>
        

        <div className="space-y-10 mt-4 mb-2.5 xl:ml-24">
            <div>
            <Link to={'/admin/'}>
                <AdminSidebarlinks text='Dashboard' Icon={DashboardCustomize} active={false} />
            </Link>
            </div>
            <div>
            <Link to={'/admin/showUsers'}>
                <AdminSidebarlinks text='Users' Icon={UserIcon} active={false} /> 
            </Link>
            </div>
            <div>
            <Link to={'/admin/showOwners'}>
                <AdminSidebarlinks text='Owners' Icon={SettingsAccessibility} active={false}/>
            </Link>
            </div>
            <div>
            <Link to={'/admin/showHotel'}>
                <AdminSidebarlinks text='Hotels' Icon={HomeModernIcon} active={false}/>
            </Link>
            </div>
            <div>
            <Link to={'/admin/'}>
                <AdminSidebarlinks text='Bookings' Icon={ClipboardDocumentCheckIcon} active={false} />
            </Link>
            </div>
            <div>
            <Link to={'/admin/'}>
                <AdminSidebarlinks text='Message' Icon={Email} active={false} />
            </Link>
            </div>
            
        </div>
    </div>
    )
}

export default AdminSidebar