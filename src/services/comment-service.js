const COMMENT_DATA_URL = "https://wbdv-generic-server.herokuapp.com/api/xingboliucc"

//fetch url is determinded by server side
const findCommentsForMovie = (imdbID) => {
    return fetch(`${COMMENT_DATA_URL}/comments/${imdbID}`)
        .then(response => response.json)
}

const createCommentForMovie = (imdbID, comment) => {
    return fetch(`${COMMENT_DATA_URL}/comments/${imdbID}`, {
        method: "POST",
        body:JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    })
}

const api = {
    findCommentsForMovie,
    createCommentForMovie
}
export default api