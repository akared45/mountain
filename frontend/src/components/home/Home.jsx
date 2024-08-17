import React, { useState, useEffect } from "react";
import "../../style/Home.css";
import i1 from "../../assets/images/acon.png";
import i2 from "../../assets/images/denali.png";
import i3 from "../../assets/images/hima.png";
import im1 from "../../assets/images/i1.png";
import im2 from "../../assets/images/i2.png";
import { pageview } from "../../services/api";
import { Link } from 'react-router-dom';
const images = [i1, i2, i3];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 
    return () => clearInterval(intervalId);
  }, []);
  const token = localStorage.getItem('token');
    useEffect(() => {
        const recordVisit = async () => {
          if (!localStorage.getItem('page_visited')) {
            try {
              const response = await pageview(token);
              console.log('Page view recorded:', response);
              localStorage.setItem('page_visited', 'true');
            } catch (error) {
              console.error('Error recording visit:', error);
            }
          }
        };
        recordVisit();
      }, [token]);
  return (
    <>
      <div className="home-container">
        <main className="content">
          <div
            className="banner"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          >
            <div className="banner-content">
              <h1>Alpine Ascents</h1>
              <p>
                Alpine Ascents' 30-plus years of guiding experience on the highest
                mountains in the world, as well as on Mount Rainier, is
                unparalleled. Photo: Mount Rainier
              </p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </div>
          <div className="container mt-5">
            <div className="row mb-5">
              <div className="col-md-12 text-center">
                <h2>Welcome to Alpine Ascents</h2>
                <p>
                  Celebrating 38 years of leading successful expeditions in 2024,
                  Alpine Ascents International, Inc. is a leader in the climbing
                  industry and has been instrumental in setting guiding standards
                  in the international climbing community for most of our history.
                  This year, we will offer more than 30 different expeditions and
                  50 training courses in 14 countries, including the Arctic and
                  Antarctic regions. These expeditions range from three-day climbs
                  of Mount Rainier to training courses in the North Cascades and
                  Alaska, and ascents of the highest mountains around the world.
                  Alpine Ascents' philosophy is based on a true love and
                  understanding of mountain wilderness. Our mission and goals are
                  simple: by using the best climbing talent in the country, we
                  offer the opportunity for climbers at all levels to achieve
                  their personal aspirations through quality, challenging, safety
                  conscious and fun expeditions. Unparalleled mountain adventures
                  are what we do.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <img src={im1} className="img-fluid" alt="Alpine Scene" />
              </div>
              <div className="col-md-6 mb-4">
                <div className="p-3 bg-primary text-white h-100 d-flex flex-column justify-content-center align-items-center">
                  <h3>Alpine Ascents Blog</h3>
                  <p>
                    From packing tips and tricks to the best wine pairings in back
                    country cuisine, our blog probes the depths of the world of
                    mountaineering.
                  </p>
                  <Link to="/blog" className="btn btn-light">Alpine Ascents Blog</Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mb-4">
                <div className="p-3 bg-info text-white h-100 d-flex flex-column justify-content-center align-items-center">
                  <h3>Acclaimed in the Industry for the Last 30+ Years</h3>
                  <p>
                    Named one of "The Best Adventure Travel Companies on Earth" by National Geographic Adventure Magazine. Alpine Ascents was selected by The New York Times as the chosen Kilimanjaro Guide Service.
                  </p>
                  <Link to="/about" className="btn btn-light">About Us</Link>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <img src={im2} className="img-fluid" alt="Climber" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
