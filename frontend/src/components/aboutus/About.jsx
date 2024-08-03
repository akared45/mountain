import React from "react";
import "./AboutUs.css";
import bgImage from "../../assets/images/ice.png";

const About = () => {
  return (
    <div className="about-us">
      <div
        className="about-us-banner"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        
      </div>
      <div className="about-us-content">
        <div className="about-us-main">
          <section>
            <h2>ABOUT OUR CLIMBS & MOUNTAINEERING SCHOOL</h2>
            <p>
              Our reputation began in the Himalayas and quickly spread to climbs
              around the globe. Today, our guides are recognized as leaders in
              the international climbing world and act as a resource for
              climbers, publishers, and media organizations. The Alpine Ascents
              Mountaineering School is considered one of the premier climbing
              schools in North America. And we have been repeatedly praised and
              acknowledged for our expertise by a variety of media sources and
              industry professionals.
            </p>
            <p>
              All Alpine Ascents expeditions are carefully prepared. This means
              investigating quality climbs, selecting optimum routes, supplying
              top-quality provisions, and developing risk management programs
              for each journey. Before departing on any expedition, we provide
              climbers with a wealth of information, and guides are available to
              answer questions. We realize helping climbers achieve personal
              goals starts well before the climb. We make great effort to be
              accessible, and respond quickly to all phone calls and e-mail
              inquiries. Unlike many organizations, we plan and lead our own
              climbs. The majority of our team members come from personal
              recommendations, and many are repeat climbers.
            </p>
            <p>
              Leading cohesive groups is fundamental to our philosophy. Before
              any member joins our team, we require background information on
              their conditioning, and their climbing/hiking biography. This
              helps to ascertain whether each climber can be a competent team
              member and allows our guides to organize the most effective
              groups.
            </p>
          </section>

          <section>
            <h2>BUSINESS ETHICS</h2>
            <p>
              While many companies market their eco-friendliness, we feel
              business ethics is a more encompassing term and a principle
              against which we test nearly every decision. While businesses are
              faced with many difficult decisions, we believe organizations have
              a responsibility towards the greater good of the planet and we
              strive to meet that goal. More than the right thing to do, ethical
              decisions and actions make operating a business like Alpine
              Ascents even more interesting and satisfying. It also helps us
              develop like-minded climbers who share similar values.
            </p>
          </section>

          <section>
            <h2>INDIVIDUAL ATTENTION</h2>
            <p>
              Whether you are attending our Mountaineering School, climbing with
              us to the summit of Everest, trekking in the Himalayas or climbing
              in Antarctica, we feel that personal attention, and prompt and
              courteous responses, are of utmost importance. Gear, locations,
              fitness levels, and in-country knowledge are crucial elements in
              preparing for a trip, and we treat every correspondence with
              utmost care and consideration.
            </p>
            <p>
              We have always felt that personal attention is an integral part of
              putting together team-oriented expeditions. We understand that
              being a premier mountaineering company is not only about offering
              quality services, but about helping each individual achieve their
              personal goals.
            </p>
          </section>

          <section>
            <h2>CONNECTIONS ABROAD & HOW WE OPERATE</h2>
            <p>
              Nearly all of our expeditions employ local climbers, porters
              and/or guides. These local outfitters are carefully reviewed, not
              only for their expertise but as long-term partners with Alpine
              Ascents. Though we send an Alpine Ascents guide on each
              expedition, local guides are an excellent resource to
              understanding the climbing, trekking and culture in each of the
              areas we visit. Many of these outfitters have been with us since
              our inception, as we believe long-term relationships help foster
              environmentally sound and high-quality expeditions.
            </p>
          </section>
        </div>
        <div className="about-us-sidebar">
          <section>
            <h2>MISSION STATEMENT</h2>
            <p>
              Alpine Ascents is committed to developing risk cognizant,
              self-reliant and environmentally-conscious mountaineers, and
              offering courses and expeditions of unsurpassed quality throughout
              the world. Our business practices stress ethical and culturally
              aware travel.
            </p>
          </section>

          <section>
            <h2>MOUNT RAINIER AWARD</h2>
            <p>
              In 2006, Alpine Ascents was awarded a highly coveted guiding
              concession on Mt. Rainier. This prestigious honor was granted to
              Alpine Ascents based on our:
            </p>
            <ul>
              <li>safety record</li>
              <li>environmental leadership</li>
              <li>quality of services</li>
              <li>the experience and qualifications of our guide staff</li>
            </ul>
            <p>
              We are honored to have the privilege of guiding such a beautiful
              peak.
            </p>
          </section>

          <section>
            <h2>WHAT WE EXPECT</h2>
            <p>
              Though our courses and expeditions vary in difficulty and skill
              level, we expect participants to have a positive attitude, and to
              be physically and mentally prepared for the demands of the
              journey. We take the "team effort" idea seriously, and presume
              each climber shares our passion for mountains, cultures and
              environmental issues.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
