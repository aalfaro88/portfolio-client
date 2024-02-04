import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Works.css';

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
            title: "Epic Chef",
            description: "A culinary adventure. Search through thousands of recipees looking by ingredients or by recipee name.",
            imageUrl: "/images/epic-chef.png",
            projectUrl: "https://epic-chef-app.fly.dev/"
        },
        {
            title: "Word-Minigame",
            description: "Enjoy playing with words. Challenge your vocabulary and quick-thinking skills with this fun, interactive game.",
            imageUrl: "/images/mini-game.png",
            projectUrl: "https://word-minigame-link.com"
        }
    ];

    const [slidesPerView, setSlidesPerView] = useState(3); 

    const updateSlidesPerView = () => {
        if (window.innerWidth >= 1730) {
          setSlidesPerView(3);
          console.log(3);
        } else if (window.innerWidth >= 1100) {
          setSlidesPerView(2);
          console.log(2);
        } else {
          setSlidesPerView(1);
          console.log(1);
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
          <div id="word-minigame" className='works-section'>
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              loop={true} // Enable looping
              modules={[Pagination]}
              className="mySwiper"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index}>
                  <div className="project-card">
                  <div className='left-project-section'>
                    <div className='project-title'>
                      <h2>{project.title}</h2>
                    </div>
                    <div className='project-info'>
                      <p>{project.description}</p>
                    </div>
                  </div>
                  <div className='right-project-section'>
                    <div className='project-image'>
                      <img src={project.imageUrl} alt={`${project.title} project`} />
                    </div>
                    <div className='project-link'>
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">View Project</a>
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