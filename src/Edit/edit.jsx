import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Edit = () => {
    const [value, setValue] = useState();
    const [headding, setHeading] = useState();
    const [date, setDate] = useState();
    const [img, setImg] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    
    function strConverter(lst){
        let final = "";
        lst.map((item) =>{
            final = final + item + "\n";
        })
        final = final.substring(0, final.length - 1);
        return final;
    }


    useEffect(() => {
        setHeading(data.title);
        setDate(data.date);
        setImg(strConverter(data.img));
        setValue(strConverter(data.text));
    }, [])

    function lstConverter(str){
        let temp = "";
        let result = []
        for ( const a of str ){
            if (a == "\n"){
                result.push(temp);
                temp = ""
            }else{
                temp = temp + a;
            }
        }
        result.push(temp);
        return result
    }

    function onSubmit(){ 
        data.text = lstConverter(value);
        data.img = lstConverter(img);
        data["confirm"] = true
        navigate("/site/poem", {state:data});
        
    }

    return(
        <div style={{padding:"20px"}}> 
            <p>HEADDING <br/><textarea style={{fontSize: "20px"}} rows="5" cols="29" value={headding} onChange={(e) => setHeading(e.target.value)}/></p>
            <p>BODY <br/><textarea style={{fontSize: "20px"}} rows="50" cols="29" value={value} onChange={(e) => setValue(e.target.value)}/></p>
            <p>DATE: <br/><input style={{fontSize: "20px"}} value={date} onChange={(e) => setDate(e.target.value)}/></p>
            <p>IMAGES <br/><textarea style={{fontSize: "20px"}} rows="10" cols="29" value={img} onChange={(e) => setImg(e.target.value)}/></p>
            <br/><button className="button" onClick={onSubmit}>submit</button>
        </div>
    );
}

export default Edit;