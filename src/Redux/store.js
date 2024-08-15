
import { legacy_createStore } from "redux";
import myReducer from "./reducers";

const Store = legacy_createStore(
    myReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;