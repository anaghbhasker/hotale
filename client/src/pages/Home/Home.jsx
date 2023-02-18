import React from 'react'
import Featured from '../../components/User/Featured/Featured'
import FeaturedProperties from '../../components/User/FeaturedProperties/FeaturedProperties'
import Footer from '../../components/User/Footer/Footer'
import Header from '../../components/User/Header/Header'
import Maillist from '../../components/User/Maillist/Maillist'
import Navbar from '../../components/User/Navbar/Navbar'
// import NewnavBar from '../../components/User/Navbar/NewnavBar'
import './Home.css'

function Home() {
  
  return (
    <div>
      <Navbar/>
      {/* <NewnavBar/> */}
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <Maillist/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home