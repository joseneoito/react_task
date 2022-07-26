import { FETCH_USER_BY_ID, FETCH_USER_BY_ID_SUCCESS, FETCH_USER_BY_ID_FAILURE,  CREATE_USER
, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, UPDATE_USER_START, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, PAGINATE_USER_START, PAGINATE_USER_SUCCESS, PAGINATE_USER_FAILURE, DELETE_USER_START, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, SET_USER_SEARCH_PARAMS} from '../actions/userAction';

const initialState = {
    usersCount: 0,
    paginatedUsers:[],
    isLoading: false,
    errors: "",
    user:{},
    userLoading: false,
    searchParams: {
        tmpSearch: "",
        orderBy: "desc",
        sortBy: "createdAt",
        itemOffset: 0
    }
}

function userReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_USER_BY_ID:
            return {...state, userLoading: true, errors: "", user:{}}
        case FETCH_USER_BY_ID_SUCCESS:
            return {...state, userLoading: false, user: action.payload}
        case FETCH_USER_BY_ID_FAILURE:
            return {...state, userLoading: false, errors: action.payload}
        case CREATE_USER:
            return {...state, isLoading: true, user:{}, errors: ""}
        case CREATE_USER_SUCCESS:
            return {...state, isLoading: false, user: action.payload}
        case CREATE_USER_FAILURE:
            return {...state, isLoading: false,  errors: action.payload}
        case UPDATE_USER_START:
            return {...state, isLoading: true, errors:""}
        case UPDATE_USER_SUCCESS:
            return {...state, isLoading: false, user: action.payload}
        case UPDATE_USER_FAILURE:
            return { ...state, isLoading: false }
        case PAGINATE_USER_START:
            return {...state, isLoading: true, errors: "", paginatedUsers: [], usersCount: 0}
        case PAGINATE_USER_SUCCESS:
            return {...state, isLoading: false, errors: "", paginatedUsers: action.payload['data'], usersCount: action.payload['count']}
        case PAGINATE_USER_FAILURE:
            return {...state, isLoading: false,  errors: action.payload, paginatedUsers: [], usersCount: 0}
        case DELETE_USER_START:
            return{...state, isLoading: true, errors: ""}
        case DELETE_USER_SUCCESS:
            return { ...state, isLoading: false, paginatedUsers: state.paginatedUsers?.filter(item=> item.id !== action.payload) }
        case DELETE_USER_FAILURE:
            return { ...state, isLoading: false, errors: action.payload }
        case SET_USER_SEARCH_PARAMS:
            return { ...state, searchParams: {...state.searchParams, [action.payload['key']]: action.payload['value']} }
        default:
            return state;
    }
}

export default userReducer;
