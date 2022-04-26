import api from "./api";

export const ACTION_TYPES = {
   CREATE : 'CREATE',
   UPDATE : 'UPDATE',
   DELETE : 'DELETE',
   FETCH_ALL : 'FETCH_ALL'
}

export const fetchAll = () => dispatch => {
    //get 
    api.contact().fetchAll()
    .then(response => {
        dispatch({
            type:ACTION_TYPES.FETCH_ALL,
            payload: response.data
        })
    })
    .catch(error => console.log(error))
}

export const create = (data, onSuccess) => dispatch => {
    api.contact().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(error => console.log(error))
}

export const update = (id, data, onSuccess) => dispatch => {
    api.contact().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(error => console.log(error))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.contact().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(error => console.log(error))
}