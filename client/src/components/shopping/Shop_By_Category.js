import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CgArrowTopRightO } from "react-icons/cg";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import MediaQuery from 'react-responsive';
import api from "../../api.js";
import { toast } from "react-hot-toast";


const ShopCard = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
  } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
  }};
  fetchCategories();
   
  }, []);
useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories");
        }
    };
    
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.update(); // Ensure Swiper updates after categories are set
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
      
      swiper.on("slideChange", () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      });
    }
  }, [categories]); // <- Re-run effect when categories change

  const handlePrev = () => {
    if (!isBeginning && swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (!isEnd && swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section id="shop-by-look">
      <div className="shop-container px-4 py-4">

        {/* prev,next button */}
        <div className="d-flex gap-3 align-items-center mb-4">
          <button
            className="btn"
            style={{
              border: isBeginning ? "1px solid #ccc" : "1px solid black",
              borderRadius: "50%",
              backgroundColor: isBeginning ? "#fff" : "white",
              pointerEvents: isBeginning ? "none" : "auto",
              color: isBeginning ? "#ccc" : "#000"
            }}
            onClick={handlePrev}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            className="btn"
            style={{
              border: isEnd ? "1px solid #ccc" : "1px solid black",
              borderRadius: "50%",
              backgroundColor: isEnd ? "#fff" : "white",
              pointerEvents: isEnd ? "none" : "auto",
              color: isEnd ? "#ccc" : "#000"
            }}
            onClick={handleNext}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
          <h5 className="fw-bold text-uppercase mb-0">Shop by Categories</h5>
        </div>

        <div className="d-flex flex-column">
          <div className="d-none d-md-flex">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, A11y]}
              spaceBetween={20}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              allowTouchMove={true}
              loop={false}
              className="flex-grow-1"
            >
              {categories.filter(category => category.active).map((category) => (
                <SwiperSlide key={category._id}>
                  <div className="card-container">
                    <div className="position-relative overflow-hidden shadow-sm rounded">
                      <img
                        src={`http://localhost:5000${category.image}`} // Ensure image is correct
                        className="img-fluid w-100"
                        alt={category.name}
                      />
                      <div
                        className="position-absolute bg-white px-3 py-2"
                        style={{
                          bottom: "20px",
                          left: "20px",
                          borderTopRightRadius: "8px",
                          fontWeight: "bold",
                        }}
                      >
                        {category.name}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Static Discover All Card */}
            <div
              className="card-container ms-3 d-flex justify-content-center align-items-center border rounded-3"
              style={{ minWidth: "250px", maxWidth: "250px" }}
            >
              <div className="text-center">
                <p className="fw-bold fs-5 mb-3">Discover all new items</p>
                <button className="btn">
                  <CgArrowTopRightO size={"40px"} />
                </button>
              </div>
            </div>
          </div>

          {/* For Mobile View */}
          <MediaQuery maxWidth={767}>
            <div className="d-block d-md-none">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, A11y]}
                spaceBetween={15}
                slidesPerView={2}
                allowTouchMove={true}
                loop={false}
              >
                {categories.map((category) => (
                  <SwiperSlide key={category._id}>
                    <div className="card-container">
                      <div className="position-relative overflow-hidden shadow-sm rounded-2">
                        <img
                          src={`http://localhost:5000${category.image}`} // Ensure full image path
                          className="img-fluid w-100"
                          alt={category.name}
                        />
                        <div
                          className="position-absolute bg-white px-3 py-2"
                          style={{
                            bottom: "10px",
                            left: "10px",
                            borderTopRightRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                          }}
                        >
                          {category.name}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div
                className="discover_icon mt-3 d-flex border justify-content-between align-items-center rounded-3 text-center py-2"
                style={{ width: "100%", height: "50px" }}
              >
                <p
                  className="fw-bold px-2 py-1 fs-5 mb-0 ls-3"
                  style={{ letterSpacing: "2px" }}
                >
                  Discover all new items
                </p>
                <button className="btn px-3 fs-5 p-0 ">
                  <CgArrowTopRightO size={"30px"} />
                </button>
              </div>
            </div>
          </MediaQuery>
        </div>
      </div>
    </section>
  );
};

export default ShopCard;
