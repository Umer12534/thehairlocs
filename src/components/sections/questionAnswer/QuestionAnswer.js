import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './QuestionAnswer.css'

function QuestionAnswer({question, answer}) {
    return (
    <>
        <details className="faqs-item" >
            <summary className="faqs-question" >
                {question} 
                <FontAwesomeIcon icon={faAngleDown}/>
            </summary>
            <div className="faqs-answer">
                <p>
                    {answer}
                </p>
            </div>
        </details>
    </>
    )
}
export default QuestionAnswer