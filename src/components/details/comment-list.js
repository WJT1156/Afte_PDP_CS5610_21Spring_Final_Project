import {useParams} from "react-router-dom";
import commentService from '../../services/comment-service'
import {useEffect, useState} from "react";
import Comment from "./comment";
import {connect} from "react-redux";
import {read_cookie} from "sfcookies";

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
    const [newComment, setNewComment] = useState({imdbID:imdbID, userName: read_cookie('firstName') + ' ' + read_cookie('lastName'), text: ""})
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
                                onClick={() => {
                                    if(read_cookie('loginCookie') !== true){
                                        alert("Log in to make a comment!")
                                    } else {
                                        setEditing(true)
                                    }

                                }}>Add comment</button>
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
                    <button className="btn btn-light float-right"
                            onClick={() => {
                                setEditing(false)
                            }
                            }>Cancel</button>
                    <button className="btn btn-primary float-right"
                            onClick={() => {
                                createCommentForMovie(newComment)
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
        createCommentForMovie: (comment) => {
            commentService.createCommentForMovie(comment)
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