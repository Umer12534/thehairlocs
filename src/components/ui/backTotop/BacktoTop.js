import { useEffect, useState } from "react"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './BacktoTop.css'

function BacktoTop(){
    const [isVisible, setIsvisible] = useState(false)

    const Toggleisvisible = () => {
        if(window.pageYOffset > 300)
            setIsvisible(true)
        else
            setIsvisible(false)
    }

    const scrolltotop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    useEffect(() =>{
        window.addEventListener('scroll', Toggleisvisible);

        return() =>{
            window.removeEventListener('scroll', Toggleisvisible)
        }

    },[])

    return (
    <>
    {/* <!-- back to top --> */}
    {isVisible && (
        <button class="to-top-icon" onClick={scrolltotop}>
            <FontAwesomeIcon icon={faAngleUp}/>
        </button>
    )}
    </>
  )
}

export default BacktoTop
