import React from "react"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
const TimeLine = [
    {
        Logo: Logo1,
        heading: "Leadership",
        description: "Fully Commited to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        description: "Fully Commited to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        description: "Fully Commited to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        description: "Fully Commited to the success company",
    },
];
const TimeLineSection = () => {

    return (
        <div>
            <div className='flex flex-row gap-15 items-center'>
                <div className='w-[45%] flex flex-col gap-5'>{
                    TimeLine.map((element, index) => {
                        <div className='flex flex-row gap-6' key={index}>
                            <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                <img src={element.Logo} />
                            </div>
                            <div>
                                <h2 className='font-semibold text-[18px]'>
                                    {element.heading}

                                </h2>
                                <p className="text-base">
                                    {element.description}
                                </p>
                            </div>
                        </div>
                        
                    })
                }

                </div>

            </div>
        </div>
    )
}

export default TimeLineSection