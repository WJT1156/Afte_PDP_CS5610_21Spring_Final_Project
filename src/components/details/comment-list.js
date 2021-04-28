import {useParams} from "react-router-dom";
import commentService from '../../services/comment-service'
import {useEffect, useState} from "react";
import Comment from "./comment";
import {connect} from "react-redux";

const CommentList = (
    {
        imdbID,
        comments = [],
        findCommentsForMovie,
        createCommentForMovie
}) => {
    // const {imdbID} = useParams()
    useEffect(() => findCommentsForMovie(imdbID), [imdbID])
    const [editing, setEditing] = useState(false)
    const [newComment, setNewComment] = useState({text: ""})
    return (
        <div>
            <ul className="list-group">
                {
                    comments.map(comment =>
                        <li className="list-group-item">
                            <Comment comment={comment}/>
                        </li>
                    )
                }
            </ul>
            {
                !editing &&
                    <>
                        <button className="btn btn-primary"
                                onClick={() =>
                                    setEditing(true)
                                }>Add comment</button>
                    </>
            }

            {
                editing &&
                <>
                    <textarea onChange={(e) => {
                        setNewComment({
                            ...newComment,
                            text: e.target.value,
                        })
                    }} value={newComment.text} className="form-control"></textarea>
                    <button className="btn btn-primary float-right"
                            onClick={() => {
                                createCommentForMovie(imdbID, newComment)
                                setEditing(false)
                            }}>Submit</button>
                </>
            }
        </div>
    )
}

const stpm = (state) => {
    return {
        comments: state.commentReducer.comments
    }
}

const dtpm = (dispatch) => {
    return {
        createCommentForMovie: (imdbID, comment) => {
            commentService.createCommentForMovie(imdbID, comment)
                .then(actualComment => dispatch({
                    type: "CREATE_COMMENT_FOR_MOVIE",
                    comment: comment
                }))
        },
        findCommentsForMovie: (imdbID) => {
            commentService.findCommentsForMovie(imdbID)
                .then(actualComments => dispatch({
                    type: "FIND_COMMENTS_FOR_MOVIE",
                    comments: actualComments
                }))
        }
    }
}

export default connect(stpm, dtpm)(CommentList)