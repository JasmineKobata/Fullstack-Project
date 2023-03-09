import './ReviewUpdate.css'
import { getSession } from "../../store/session";
import { useSelector } from "react-redux";
import ReviewUpdateModal from "../ReviewUpdateModal";

export default function ReviewUpdate({review, trail}) {
    const session = useSelector(getSession);

    const modalHandler = function() {
        const modal = document.getElementsByClassName(`updateModal ${review.id}`)[0];
        modal.style.display = "block";
    }

    if (session.user && review.authorId === session.user.id) {
        return (
            <>
                <button className='reviewUpdate' onClick={modalHandler}>Edit</button>
                <ReviewUpdateModal trail={trail} review={review}/>
            </>
        )
    }
}