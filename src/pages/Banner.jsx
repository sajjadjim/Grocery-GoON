import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useRef } from "react";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Track Food. Reduce Waste.",
    description: "Monitor expiration dates and never forget what's in your fridge.",
    image: "https://img.freepik.com/premium-photo/vibrant-grocery-store-scene-featuring-customer-buying-fresh-produce-from-friendly-cashier-shopping-fresh-food-urban_1282299-4887.jpg",
    link: "/features",
    buttonText: "Learn More",
  },
  {
    id: 2,
    title: "Get Alerts Before Food Expires",
    description: "Stay ahead with smart reminders and reduce food waste.",
    image: "https://img.freepik.com/premium-photo/convenient-grocery-shopping-supermarket-cart-filled-with-essentials-generative-ai_893571-3599.jpg",
    link: "/alerts",
    buttonText: "Set Alerts",
  },
  {
    id: 3,
    title: "Help the Planet by Managing Your Fridge",
    description: "Make eco-friendly choices and keep track of your grocery items.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIMrOE7opzhrPibfUuqaTT6MOjsNamiiq2P2zskZnPk22OHiHsPYJN1xh8e_Mcigj3mo&usqp=CAU",
    link: "/about",
    buttonText: "Start Now",
  },
  {
    id: 4,
    title: "Help the Planet by Managing Your Fridge",
    description: "Make eco-friendly choices and keep track of your grocery items.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3tYl-QByRHHr9FOG7lmy8aQVk4DGsa6E1vw&s",
    link: "/about",
    buttonText: "Start Now",
  }
];

const Banner = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="w-full h-[300px] md:h-[500px] overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="relative h-[300px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40"></div>
              <div className="relative z-10  bg-opacity-20 backdrop-blur-sm p-6 md:p-10 rounded-xl text-white text-center max-w-2xl mx-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                  {slide.title}
                </h2>
                <h4 className="text-lg md:text-2xl font-medium drop-shadow-md mb-5">{slide.description}</h4>
                <Link
                  to={slide.link}
                  className="inline-block mt-2 px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
