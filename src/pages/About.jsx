import React from "react";
import HighLightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from "../components/core/About/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from "../components/core/About/Stats";
import LearningGrid from "../components/core/About/LearningGrid";
const About = () => {

    return (
        <div className="mt-15 text-white">
            {/* section 01 */}
            <section>
                <header>
                    Driving Innovation in Online education for a
                    <HighLightText text={"Brighter future"} />
                    <p>StudyNotion is at the forefront of driving Innovation in online education. We're passinate about creating a brighter future by offering cutting-edge courses,leveraging emerging technologies, and nurtaring a vibrant learning community.</p>

                </header>
                <div className='flex gap-x-3 mx-auto'>
                    <img src={BannerImage1} />
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
                </div>
            </section>
            {/* section02 */}
            <section>
                <div>
                    <Quote />
                </div>
            </section>
            {/* section03 */}
            <section>
                <div className='flex flex-col'>
                    {/* FoundingStory div */}
                    <div className='flex'>
                        {/* Founding story left box */}
                        <div>
                            <h1>Our Founding Story</h1>
                            <p>Our E-Learning platform was born out of shared vision and passion for trnasforming education.It all began with a group of educators,technologies and life long learners who recognized the need of accessible,flexible and high quality learning opportunities in rapidy evolving world.</p>
                            <p>
                                As experienced educators ourselves, we witnessed a firsthand limitation and challanges of traditional educational systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundary. We envisioned a platform that could bridge these gaps and empower individual from all walks of life to unlock their full potential.
                            </p>
                        </div>
                        {/* founding story right box */}

                        <div>
                            <img src={FoundingStory} />
                        </div>
                    </div>
                    {/* vision and mission parent div */}
                    <div className='flex'>
                        {/* left box */}
                        <div>

                            <h1>Our Vision</h1>
                            <p>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>
                        {/* right div */}
                        <div>
                            <h1>Our Mission</h1>
                            <p>
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* section 04 */}
            <section>
               <StatsComponent/>
            </section>
            {/* section05 */}
            <section>
            <LearningGrid/>
            </section>
        </div>
    )
}
export default About;
