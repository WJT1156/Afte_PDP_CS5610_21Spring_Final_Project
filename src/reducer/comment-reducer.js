const initialState = {
    comments:[]
}

const commentReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FIND_COMMENTS_FOR_MOVIE":
            return {
                ...state,
                comments: action.comments
            }
        case "CREATE_COMMENT_FOR_MOVIE":
            const newState1 = {
                comments: [
                    ...state.comments,
                    action.comment
                ]
            }
            return newState1
        default:
            return state
    }
}

export default commentReducer