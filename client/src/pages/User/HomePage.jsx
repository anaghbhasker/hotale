import React from 'react'
import Header from '../../components/User/Header/Header'
import NavbarNew from '../../components/User/NavbarNew'
import Featured from '../../components/User/Featured/Featured'
import FeaturedProperties from '../../components/User/FeaturedProperties/FeaturedProperties'
import Maillist from '../../components/User/Maillist/Maillist'
import Footer from '../../components/User/Footer/Footer'
import '../Home/Home.css'

function HomePage() {
    return (
        <div>
            <NavbarNew/>
            <Header/>
            <div className="homeContainer">
            <Featured/>
            <FeaturedProperties/>
            <Maillist/>
            <Footer/>
            </div>
        </div>
    )
}

export default HomePage