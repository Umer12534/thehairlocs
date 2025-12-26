import React from 'react'
import './Pageheader.css'
function Pageheader({title, des, image}){
    return (
        <>
        {/* <!-- page header --> */}
        <div class="page-header" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${image})`}}>
            <h1>{title}</h1>
            <p>{des}</p>
        </div>
        </>
    )
}

export default Pageheader
