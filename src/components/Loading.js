import React from 'react';
import './Loading.css';
const Loading=(prop)=>{
    let border=prop.size/10;
    let load={
        border: border+'px solid #f3f3f3', /* Light grey */
        borderTop: border+'px solid #3498db',/* Blue */
        borderRadius: '50%',
        width: prop.size,
        height: prop.size,
        animation: 'spin 2s linear infinite',
    }
    return(
        <div className="container mt-3 cntr ">
             <div className=" mx-auto " style={load}></div>
        </div>
       
    ) 
}
export default Loading;