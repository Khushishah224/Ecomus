import React from 'react'
import '../styles/Home.css';

import BannerPopUp from '../components/modals/BannerPopUp.js';
import Header from '../components/comman/Header.js';
import MainNavbar from '../components/comman/MainNavbar.js';
import Carousel from '../components/comman/Carousel.js';
import ShopCard from '../components/shopping/Shop_By_Category.js'
import BestSeller from '../components/shopping/BestSeller.js'
import ShopTheLook from '../components/shopping/ShopTheLook.js';
import HappyClient from '../components/service/HappyClient.js';
import BrandNameLogos from '../components/service/BrandNameLogos.js';
import ShopGram from '../components/shopping/ShopGram.js';
import OurServices from '../components/service/OurServices.js';
import Footer from '../components/comman/Footer.js';

function Home() {
  return (
    <>
    <BannerPopUp />
      <div className='main-top'>
        <Header />
        <MainNavbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div>
        <ShopCard />
      </div>
      <div>
        <BestSeller />
      </div>
      <div>
        <ShopTheLook />
      </div>
      <div>
        <HappyClient />
      </div>
      <div>
        <BrandNameLogos />
      </div>
      <div>
        <ShopGram />
      </div>
     <div>
        <OurServices />
      </div>
       <div className='footer'>
        <Footer />
      </div>
    </>
  )
}

export default Home;
