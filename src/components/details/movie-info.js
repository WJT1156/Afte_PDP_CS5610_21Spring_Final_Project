const MovieInfo = ({movie}) => {

    return(
        <>
            <h2>{movie.Title}</h2>
            <div className="row border m-3 p-2">
                <div className="col-8">
                    <h4>Plot:</h4>
                    <div>
                        {movie.Plot}
                    </div>
                    <h4>Actors:</h4>
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
                    <h4>Ratings:</h4>
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
                <div className="col-4">
                    <img src={movie.Poster}/>
                </div>
            </div>
        </>
    )

}

export default MovieInfo