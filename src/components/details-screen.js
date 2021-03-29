import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import movieService from '../services/movie-service'

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
            <h2>{movie.Title}</h2>
            <p>
                <img src={movie.Poster} width={100} style={{float: "right"}}/>
                Plot:
                <div>
                    {movie.Plot}
                </div>

            </p>
            <div>
                Actors:
                <ul>
                    {
                        movie.Actors && movie.Actors.split(",")
                            .map((actor)=>{
                                return(
                                    <li>{actor}</li>
                                )
                            })
                    }
                </ul>
                <div>
                    Ratings:
                </div>
                <ul>
                    {
                        movie.Ratings && movie.Ratings
                            .map((rating)=>{
                                return(
                                    <li>{`${rating.Source} : ${rating.Value}` }</li>
                                )
                            })
                    }
                </ul>
            </div>
        </div>
    )
}

export default DetailsScreen