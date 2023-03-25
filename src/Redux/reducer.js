import { ADD_NAV_HEAD } from "./action"


const init_store = {
    nav_head:""
}

export const reducer = (store = init_store,{type,payload})=>{
    if(type == ADD_NAV_HEAD){
        return {store,nav_head:payload}
    }else{
        return store
    }
}