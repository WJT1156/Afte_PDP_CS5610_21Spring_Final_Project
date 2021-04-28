
const Comment = ({comment}) => {

    return (
        <>
            <div className="row border">
                <div className="col-3 border-right">
                    {/*{comment.userId}*/}
                    userId
                </div>
                <div className="col-9">
                    <p>
                        {comment.text}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Comment