import React from 'react'
import './Heading.css'

const Heading = ({heading_text, position='left'}) => {
  return (
    <>
    <div className={`heading ${position}`}>
        {heading_text}
    </div>
    </>
  )
}

export default Heading
