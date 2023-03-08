import './ReviewModal.css'

export default function ReviewModal({trail}) {
    const reviewHandler = function() {
        const modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "block";
    }

    const spanHandler = function() {
        const modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        const modal = document.getElementsByClassName("modal")[0];
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })

    return (
        <>
            <button className='review' onClick={reviewHandler}>Write Review</button>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={spanHandler}>&times;</span>
                    <p>{trail.name}</p>
                    <input className="stars" type="radio"></input>
                    <input className="stars" type="radio"></input>
                    <input className="stars" type="radio"></input>
                    <input className="stars" type="radio"></input>
                    <input className="stars" type="radio"></input>
                    <br></br>Review<br></br>
                    <textarea></textarea><br></br>
                    <button>Post</button>
                </div>
            </div>
        </>
    )
}