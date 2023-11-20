let user = localStorage.getItem('user')
if (user) {
    user = JSON.parse(user)
}

const intitialState = {
    user
}

export default function authReducer(state = intitialState, action) {
    switch (action.type) {
        case 'auth/login':
            return {
                user: action.payload
            }
        case 'auth/logout':
            return {
                user: null
            }
        default:
            return state
    }
}