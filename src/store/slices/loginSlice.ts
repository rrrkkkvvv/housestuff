import {  createSlice } from '@reduxjs/toolkit';
   
 
interface ILoginSliceProps {
    isLoggedIn: boolean;

}

const initialState: ILoginSliceProps = {
    isLoggedIn: false,
}
 
 

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

        login :(state)=>{
            state.isLoggedIn = true;
        }
    },
    selectors:{
        selectIsLoggedIn: (state)=> state.isLoggedIn
    }
  

});


export const {login} = loginSlice.actions;
export const {selectIsLoggedIn} = loginSlice.selectors;
const loginReducer = loginSlice.reducer
export default loginReducer;