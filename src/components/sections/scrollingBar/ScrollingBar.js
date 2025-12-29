import React from 'react'

import './ScrollingBar.css'

const ScrollingBar = ({ text = 'New Arrivals', repeat = 12 }) => {
  return (
    <div className="scrolling-bar">
      <div className="scrolling-text">
        <span>
          {Array.from({ length: repeat }).map((_, index) => (
            <h3 key={index}>{text}</h3>
          ))}
        </span>
      </div>
    </div>
  )
}

export default ScrollingBar
