const redux = require("redux");
const {applyMiddleware,createStore} = redux;
const thunk = require("redux-thunk").thunk;
const axios = require("axios");


//constants
const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";

//state
const initialState = {
    loading : true,
    products : [],
    error : false
}

//action
function fetchRequest(){
    return{
        type:FETCH_REQUEST
    }
}

function fetchSuccess(products){
    return {
        type:FETCH_SUCCESS,
        payload : products
    }
}

function fetchFailure(){
    return{
        type:FETCH_FAILURE
    }
}

//reducer
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_REQUEST:
            return{
                ...state,
                loading : true,
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading : false,
                products: action.payload,
            }
        case FETCH_FAILURE:
            return {
                ...state,
                loading : false,
                error : true
            }
        default:
            return state;

    }
}

//thunk action creator (instead of returning action we are returning a function)
//allowed to perform side effects like asynchronous tasks and action dispatch

const fetchProducts = ()=>{
    return function(dispatch){
        dispatch(fetchRequest())
        //loading the data
        axios.get("https://fakestoreapi.com/products")
            .then(res=>{
                //res.data
                const products = res.data.map(product=>product.title);
                // console.log(products);
                dispatch(fetchSuccess(products));
            }).catch(e=>{
                dispatch(fetchFailure())
            })
        }
}

//creating a store
const store = createStore(reducer,applyMiddleware(thunk));


store.subscribe(()=>console.log(store.getState()));
store.dispatch(fetchProducts());