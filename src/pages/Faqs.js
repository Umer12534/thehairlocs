import React from 'react'
import {Helmet} from 'react-helmet'
import Pageheader from '../components/ui/pageheader/Pageheader'
import QuestionAnswer from '../components/sections/questionAnswer/QuestionAnswer'
import '../styles/Faqs.css'
function Faqs(){
    return(
        <>
        <Helmet>
            <title>FAQs | My Hair Locs</title>
            <meta 
              name='description' 
              content='Find answers to common questions about My Hair Locs products, shipping, and policies.' 
            />
            <meta
              name='keywords'
              content='FAQs, hair care questions, shipping questions, My Hair Locs help'
            />
        </Helmet>
        <Pageheader title={"Frequently Asked Questions"} des={"Find quick answers to common questions about our products, services, and policies."} image={'./assets/images/Faqs/header.jpg'}/>
        {/* <!-- faqs content --> */}

        <div className="faqs-content">
            <div className="faqs-container">
                <div className="faqs-section">
                    <h2>Products Questions</h2>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                </div>
                <div className="faqs-section">
                    <h2>Shipping Questions</h2>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                </div>
                <div className="faqs-section">
                    <h2>Returns Questions</h2>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                </div>
                <div className="faqs-section">
                    <h2>Hair Care Questions</h2>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                    <QuestionAnswer question={"Question Lorem ipsum dolor sit amet."} answer={"answer Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ea delectus laboriosam sequi distinctio repellat expedita voluptas. Voluptatibus, omnis id!"}/>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default Faqs
