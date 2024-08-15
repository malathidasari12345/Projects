import { combineReducers } from "redux";
import UserAuthReducer from "./UserAuthReducer";
import projectreducer from "./Projectreducers";
import serachreducer from "./SearchReducer";


const myReducer = combineReducers({
    user : UserAuthReducer,
    projects : projectreducer,
    searchTerm: serachreducer,

    
})
export default myReducer;