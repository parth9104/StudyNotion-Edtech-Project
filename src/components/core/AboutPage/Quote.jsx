import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote =()=>{
    return(
        <div>
            We are passionate about the way we learn. Our Innovation platform
            <HighlightText text={"combines Technology "}/>
            <span className="text-brown-500">
                {""}
                expertise
            </span>
            ,and community to create an
            <span>
                unparralled educational experience.
            </span> 
        </div>
    )
}
export default Quote;