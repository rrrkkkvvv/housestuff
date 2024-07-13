import {  createSlice } from '@reduxjs/toolkit';
   
 
interface ILoginSliceProps {
    isLoggedIn: boolean;

}

const initialState: ILoginSliceProps = {
    isLoggedIn: false,
}
 
 

const loginSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

        login :(state)=>{
            state.isLoggedIn = true;
        }
    },
  

});


export const {login} = loginSlice.actions;
const loginReducer = loginSlice.reducer
export default loginReducer;