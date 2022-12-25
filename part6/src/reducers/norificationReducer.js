import { createSlice } from '@reduxjs/toolkit'

const notificationSLice=createSlice({
    name:'notification',
    initialState:'hey there!',
    reducers:{
        setNotificaion(state,action){
            return action.payload
        },
        removeNotification(state,action){
            return action.payload
        }
    }
})


export const{setNotificaion,removeNotification}=notificationSLice.actions
export const notifyApp=(content,time)=>{
    return async dispatch=>{
        dispatch(setNotificaion(content))
        setTimeout(()=>dispatch(removeNotification('')),time)
    }
}
export default notificationSLice.reducer