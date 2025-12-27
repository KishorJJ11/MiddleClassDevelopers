import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Services.css';

const Services = () => {
    const websites = [
        {
            title: "Static Website",
            desc: "Perfect for portfolios, landing pages, and small businesses. Fast and secure.",
            price: "₹3,000",
            originalPrice: "₹6,000",
            discount: "50% OFF",
            images: [
                "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2664&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1481487484168-9b930d5b7d9d?q=80&w=2661&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop"
            ],
            features: ["5 Pages", "Responsive Design", "Contact Form", "Social Media Integration"]
        },
        {
            title: "Dynamic Website",
            desc: "Content Management System (CMS) to easily update your content without code.",
            price: "₹8,000",
            originalPrice: "₹16,000",
            discount: "50% OFF",
            images: [
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
            ],
            features: ["Admin Panel", "Blog Functionality", "User Authentication", "Database Integration"]
        },
        {
            title: "E-commerce Website",
            desc: "Full-featured online store to sell your products globally.",
            price: "₹15,000",
            originalPrice: "₹30,000",
            discount: "50% OFF",
            images: [
                "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2564&auto=format&fit=crop"
            ],
            features: ["Product Management", "Payment Gateway", "Cart & Checkout", "Order Tracking"]
        },
        {
            title: "Custom Web App",
            desc: "Tailored solutions for your unique business needs (SaaS, Internal Tools).",
            price: "Coming Soon",
            originalPrice: null,
            isComingSoon: true,
            images: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop"
            ],
            features: ["Custom Logic", "API Integration", "Real-time Features", "Scalable Architecture"]
        }
    ];

    const apps = [
        {
            title: "Android App",
            desc: "Native Android applications built with modern technologies.",
            price: "Coming Soon",
            isComingSoon: true,
            images: [
                "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop"
            ],
            features: ["Native Performance", "Play Store Publish", "Modern UI", "Push Notifications"]
        },
        {
            title: "iOS App",
            desc: "Premium iOS applications for iPhone and iPad ecosystems.",
            price: "Coming Soon",
            isComingSoon: true,
            images: [
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2667&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?q=80&w=2500&auto=format&fit=crop"
            ],
            features: ["App Store Deployment", "High Security", "Seamless UX", "Apple Ecosystem"]
        }
    ];

    const handleChoosePlan = (serviceTitle) => {
        const phoneNumber = "916374174627";
        const message = encodeURIComponent(`Hello, I am interested in the ${serviceTitle} plan. Please provide more details.`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const renderServiceCard = (item, index) => (
        <div className='service-card' key={index}>
            <div className="laptop-preview-container">
                <div className="laptop-screen">
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        loop={true}
                        className="service-preview-swiper"
                    >
                        {item.images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <img src={img} alt={`${item.title} preview ${i + 1}`} className="screen-content" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="laptop-base"></div>
            </div>
            <div className='card-content'>
                <h3>{item.title}</h3>
                <p className='desc'>{item.desc}</p>
                <ul className='feature-list'>
                    {item.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                    ))}
                </ul>
                <div className='price-tag'>
                    {item.isComingSoon ? (
                        <span className='price' style={{ fontSize: '1.5rem' }}>Coming Soon</span>
                    ) : (
                        <div className="price-container">
                            {item.originalPrice && (
                                <div className="original-price-wrapper">
                                    <span className='original-price'>{item.originalPrice}</span>
                                    {item.discount && <span className='discount-badge'>{item.discount}</span>}
                                </div>
                            )}
                            <span className='price'>{item.price}</span>
                        </div>
                    )}
                </div>
                <button
                    className='service-btn'
                    disabled={item.isComingSoon}
                    onClick={() => !item.isComingSoon && handleChoosePlan(item.title)}
                >
                    {item.isComingSoon ? "Notify Me" : "Choose Plan"}
                </button>
            </div>
        </div>
    );

    return (
        <div className='services-container'>
            <h1 className='section-title'>Our Services</h1>

            <h2 className='subsection-title'>Websites</h2>
            <div className='services-grid'>
                {websites.map((item, index) => renderServiceCard(item, index))}
            </div>

            <h2 className='subsection-title'>Apps</h2>
            <div className='services-grid'>
                {apps.map((item, index) => renderServiceCard(item, index))}
            </div>
        </div>
    );
};

export default Services;
