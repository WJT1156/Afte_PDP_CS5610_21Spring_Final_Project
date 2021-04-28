import React, {useEffect, useState} from 'react'
import {combineReducers, createStore} from 'redux'
import {useHistory, useParams} from 'react-router-dom'
import movieService from '../../services/movie-service'
import MovieInfo from "./movie-info";
import {Provider} from 'react-redux'
import commentReducer from "../../reducer/comment-reducer";
import CommentList from "./comment-list";



const DetailsScreen = () => {
    const {imdbID} = useParams()
    const history = useHistory()
    const [movie, setMovie] = useState({})
    useEffect(() => {
        findMovieByImdbID()
    }, [])
    const findMovieByImdbID = () => {
        movieService.findMovieByImdbID(imdbID)
            .then((data) => {
                setMovie(data)
            })
    }
    return(

            <div>
                <button onClick={()=>{history.goBack()}}>Back</button>
                <MovieInfo movie={movie}/>
                <CommentList imdbID={movie.imdbID}/>
            </div>


    )
}

export default DetailsScreen