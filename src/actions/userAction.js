
export const FETCH_USER_BY_ID = "FETCH_USER_BY_ID"
export const FETCH_USER_BY_ID_SUCCESS = "FETCH_USER_BY_ID_SUCCESS"
export const FETCH_USER_BY_ID_FAILURE = "FETCH_USER_BY_ID_FAILURE"

export const FETCH_USERS = "FETCH_USERS"
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

export const CREATE_USER = "CREATE_USER"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE"

export const UPDATE_USER_START = "UPDATE_USER_START"
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"

export const DELETE_USER_START = "DELETE_USER_START"
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE"
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"


export const PAGINATE_USER_START = "PAGINATE_USER_START"
export const PAGINATE_USER_FAILURE = "PAGINATE_USER_FAILURE"
export const PAGINATE_USER_SUCCESS = "PAGINATE_USER_SUCCESS"

const API_URL = "http://localhost:3333"

export const deleteUser = (id) => (dispatch) => {
    dispatch({ type: DELETE_USER_START })
    fetch(API_URL + `/users/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return dispatch({ type: DELETE_USER_SUCCESS, payload: id })
    })
    .catch(err => {
        return dispatch({ type: DELETE_USER_FAILURE, payload: err })
    })
}

export const createUser = (user) => (dispatch) => {
    dispatch({ type: CREATE_USER })

    fetch(API_URL + `/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return dispatch({ type: CREATE_USER_SUCCESS, payload: data })
    })
    .catch(err => {
        return dispatch({ type: CREATE_USER_FAILURE, payload: err })
    })
}

export const updateUser = (user) => (dispatch) => {
    dispatch({ type: UPDATE_USER_START })

    fetch(API_URL + `/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
    })
    .catch(err => {
        return dispatch({ type: UPDATE_USER_FAILURE, payload: err })
    })
}
export const fetchUser = (id) => (dispatch) => {
    dispatch({ type: FETCH_USER_BY_ID })
    fetch(API_URL + `/users/${id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return dispatch({ type: FETCH_USER_BY_ID_SUCCESS, payload: data })
    })
    .catch(err => {
        return dispatch({ type: FETCH_USER_BY_ID_FAILURE, payload: err })
    })
}


export const fetchUsers = () => (dispatch) => {

    dispatch({ type: FETCH_USERS })
    fetch(API_URL + `/users`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return dispatch({ type: FETCH_USERS_SUCCESS, payload: data })
    })
    .catch(err => {
        return dispatch({ type: FETCH_USERS_FAILURE, payload: err })
    })
}

export const fetchPaginatedUsers = (page=1, limit=12, sort ="id", order="asc", q="") => (dispatch) => {
    const t = q == "" ? `/users?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}` :`/users?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&${q}`
    dispatch({ type: PAGINATE_USER_START })
    fetch(API_URL + t)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        return dispatch({ type: PAGINATE_USER_SUCCESS, payload: data })
    })
    .catch(err => {
        return dispatch({ type: PAGINATE_USER_FAILURE, payload: err })
    })
}
