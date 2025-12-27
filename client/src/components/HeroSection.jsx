import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className='hero-container'>
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='hero-slide slide-1'>
                        <div className='hero-content'>
                            <h1>Welcome to Middle Class Developers</h1>
                            <p>Crafting Premium Digital Experiences</p>
                            <Link to='/services'>
                                <button className='hero-btn'>Get Started</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide slide-2'>
                        <div className='hero-content'>
                            <h1>Innovative Solutions</h1>
                            <p>We build scalable and robust applications</p>
                            <Link to='/services'>
                                <button className='hero-btn'>Our Services</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='hero-slide slide-3'>
                        <div className='hero-content'>
                            <h1>Creative Designs</h1>
                            <p>Where Aesthetics Meet Functionality</p>
                            <Link to="/gallery">
                                <button className='hero-btn'>View Portfolio</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>


            <div className='hero-static-content'>
                <h1>High Quality Code. Best Budget.</h1>
                <p>We build scalable e-commerce websites and web apps for businesses that want to grow.</p>
                <Link to='/services'>
                    <button className='hero-btn'>Start a Project</button>
                </Link>
            </div>
        </div >
    );
};

export default HeroSection;
