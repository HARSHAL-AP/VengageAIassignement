import { createSlice } from "@reduxjs/toolkit";

const contactSlice=createSlice({
    name:"contact",
    initialState:{
        contacts:[],
    
    },

    reducers:{
        add:(state,action)=>{
           state.contacts=[...state.contacts,action.payload]
        },
        edit:(state,action)=>{
      console.log("cslice",action.payload)
           state.contacts=state.contacts.map((el,index)=>{
            if(el._id==action.payload._id){
                return action.payload
            }
            return el
           })
        },
        remove:(state,action)=>{
          state.contacts=state.contacts.filter(el=>el._id!==action.payload)
        },
        get:(state,action)=>{
            state.contacts=action.payload
        }
        ,
        search:(state,action)=>{
            state.contacts=action.payload
        }
    }
})

export const {add,edit,remove,get,search}=contactSlice.actions;
export default contactSlice.reducer;
