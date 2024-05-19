import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const Poem = () => {

    const [Data, setData] = useState([]);
    const navigate = useNavigate();    


    useEffect(() => {
        fetch(API, { method: "Get" })
        .then(res => res.json())
        .then(res => setData(res))        
    }, []);

    const handleClick = (id) => {
        let h = Data.filter((obj) => (obj.id === id))[0];
        console.log(h);
        navigate('/site/poem', {state:h});
    }


    return(
        <>
        <h2>मेरी कविताएँ</h2>
            <div className="box-container">
            {Data.map((item) => (
                <div className="box" key={item.id} onClick={() => handleClick(item.id)}>
                {/* <img src={item.img} width="300px" alt="" /> */}
                <h3>{item.title}</h3>
                <p>{item.text[0]}</p>
                <p>{item.text[1]}</p>
                <p>{item.text[2] + " ...."}</p>
                {/* <button className="btn" onClick={() => handleClick(item.cost)}>Book Now</button> */}
                </div>
            ))}
        </div>
        </>    
    );


}

export default Poem;