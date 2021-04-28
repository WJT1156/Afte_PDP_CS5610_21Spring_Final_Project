const initialState = {
    users:[]
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FIND_USER_BY_ACCOUNT":
            return {
                ...state,
                user: action.user
            }
        case "CREATE_USER":
            return {
                users: [
                    ...state.users,
                    action.user
                ]
            }

        default:
            return state
    }
}

export default userReducer