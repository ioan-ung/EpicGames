import { UPDATE_USER_PREFERENCES_FAIL, UPDATE_USER_PREFERENCES_REQUEST, UPDATE_USER_PREFERENCES_SUCCESS } from "../constants/gamesConstants"

export const handleUserGameInteraction = (tagsArray) =>{
    let tags = localStorage.getItem('tags')

    tags = tags ? JSON.parse(tags) : {}
    
    for(let tag of tagsArray)
    {
        tags[tag] = (tags[tag] || 0) + 1
    }

    localStorage.setItem("tags",JSON.stringify(tags))
    
}

 export const updateUserPreferences = (data) => async(dispatch)=>{
    try{
      dispatch({
        type:UPDATE_USER_PREFERENCES_REQUEST
    })

    const response = {"data":1}

    dispatch({
        type:UPDATE_USER_PREFERENCES_SUCCESS,
        payload:response.data
    })
  
    }
    catch{
        dispatch({
            type: UPDATE_USER_PREFERENCES_FAIL
        });
    }
    
 }