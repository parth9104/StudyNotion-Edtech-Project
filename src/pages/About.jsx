import React from "react";
import HighLightText from "../components/core/HomePage/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from "../components/core/About/Quote";
const About =()=>{

    return(
<div className="mt-15 text-white">
{/* section 01 */}
<section>
 <header>
    Driving Innovation in Online education for a
    <HighLightText text = {"Brighter future"}/>
    <p>StudyNotion is at the forefront of driving Innovation in online education. We're passinate about creating a brighter future by offering cutting-edge courses,leveraging emerging technologies, and nurtaring a vibrant learning community.</p>

 </header>
 <div className='flex gap-x-3 mx-auto'>
        <img src = {BannerImage1}/>
        <img src = {BannerImage2}/>
        <img src = {BannerImage3}/>
 </div>
 </section>
 {/* section01 */}
 <section>
    <div>
        <Quote/>
    </div>
 </section>
</div>
    )
}
export default About;
