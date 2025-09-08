import React from 'react';
import Banner from '../../components/Banner/Banner';
import PaymentInfo from '../../components/PaymentInfo/PaymentInfo';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <PaymentInfo />
      <FeaturedProducts />
    </div>
  );
};

export default Home;