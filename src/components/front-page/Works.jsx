import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Works.css';
import { Link as ScrollLink } from "react-scroll";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Works = () => {
  const projects = [
    {
      title: "Bank Simulator",
      description: "Simulate basic transactions like sending money between accounts or investing. The design is based on one of the most important banks in the world.",
      imageUrl: "/images/bank-simulator.png",
      projectUrl: "/bank-simulator"
    },
    {
      title: "ImageJumble",
      description: "Explore how big NFT collections were made. Disclosure: Since I am not paying for server capacity, you'll have to consider doing very small collections with very few layers.",
      imageUrl: "/images/image-jumble.png",
      projectUrl: "https://image-jumble.netlify.app/"
    },
    {
      title: "Stack Exchange API and SQL",
      description: "Analyze Stack Exchange data from an API and get insights from a flight databases using SQL. Deploy easily with Docker for a streamlined setup.",
      imageUrl: "/images/docker-logo.png",
      projectUrl: "https://github.com/aalfaro88/StackAPI-and-FlightSQL"
    },
    {
      title: "Epic Chef",
      description: "A culinary adventure. Search through thousands of recipes looking by ingredients or by recipe name.",
      imageUrl: "/images/epic-chef.png",
      projectUrl: "https://epic-chef-app.fly.dev/"
    },
    {
      title: "Word-Minigame",
      description: "Enjoy playing with words. Challenge your vocabulary and quick-thinking skills with this fun, interactive game.",
      imageUrl: "/images/mini-game.png",
      projectUrl: ""
    }
  ];

  const [slidesPerView, setSlidesPerView] = useState(3);

  const updateSlidesPerView = () => {
    if (window.innerWidth >= 1730) {
      setSlidesPerView(3);
    } else if (window.innerWidth >= 1100) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateSlidesPerView);
    updateSlidesPerView();
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  return (
    <>
      <div className='works-title-section'>
        <h1 className='custom-title'>Works</h1>
      </div>
      <div className='works-section'>
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="project-card">
                <div className="left-project-section">
                  <div className="project-title">
                    <h2>{project.title}</h2>
                  </div>
                  <div className="project-info">
                    <p>{project.description}</p>
                  </div>
                </div>
                <div className="right-project-section">
                  <div className="project-image">
                    <img src={project.imageUrl} alt={`${project.title} project`} />
                  </div>
                  <div className="project-link">
                    {project.title === "Bank Simulator" ? (
                      // Use Link from react-router-dom for internal link
                      <Link to={project.projectUrl} className="scroll-link">
                        View Project
                      </Link>
                    ) : project.title === "Word-Minigame" ? (
                      // Use ScrollLink for "Word-Minigame"
                      <ScrollLink to="mini-game" smooth={true} duration={500} className="scroll-link">
                        View Project
                      </ScrollLink>
                    ) : (
                      // Use anchor tag for external links
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Works;
