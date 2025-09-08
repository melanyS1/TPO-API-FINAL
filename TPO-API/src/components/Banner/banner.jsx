import React, { useState, useEffect } from 'react';
import './Banner.css';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      id: 1,
      image: banner2,
      title: 'Comprá lo último. Vendé lo que ya no usás',
      subtitle: '',
      theme: 'dark'
    },
    {
      id: 2,
      image: banner1,
      title: 'Publicá gratis tu primer producto',
      subtitle: '',
      theme: 'light'
    },
    {
      id: 3,
      image: banner3,
      title: 'Invitá a un amigo',
      subtitle: 'y ambos reciben $2.000 de descuento',
      theme: 'dark'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner">
      {banners.map((banner, index) => (
        <div 
          key={banner.id}
          className={`banner-slide ${index === currentSlide ? 'active' : ''} ${banner.theme}`}
        >
          <img src={banner.image} alt={banner.title} />
          <div className={`banner-content ${banner.theme}`}>
            <h2>{banner.title}</h2>
            <p>{banner.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;