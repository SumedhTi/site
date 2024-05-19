import React from "react";
import "./Landing.css";
import Poem from "./poems";

const Landing = () => {

    return(
        <div className="hero">
            <div>
                <h1 className="animated-name">शुभ्रा की सरल बातें</h1>
            </div>
            <div className="main">
                <Poem />
            </div>
        </div>
    );

}

export default Landing;