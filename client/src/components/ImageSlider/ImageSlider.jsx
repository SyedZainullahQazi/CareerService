import React from 'react';
import { Carousel } from 'react-bootstrap';
import "../../styles/ImageSlider.css"

const slides = [
    {
      title: 'Connect Internationally',
      description: 'Find Your Dream University',
      image: `${process.env.PUBLIC_URL}/images/slider_1.jpg`,
    },
    {
      title: 'Grow Your Career',
      description: 'Innovate and Research',
      image: `${process.env.PUBLIC_URL}/images/slider_2.jpg`,
    },
    {
      title: 'Find Scholarships',
      description: 'Schoalrships and Grants',
      image: `${process.env.PUBLIC_URL}/images/slider_3.jpg`,
    },
  ];

const ImageSlider = () => {
  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <div className="slide">
            <div className="text-container">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
            </div>
            <img src={slide.image} alt="Slider" className="image" />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
