const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const ORDER_PIZZA = "ORDER_PIZZA";
const ORDER_BURGER = "ORDER_BURGER";

//action creator
//for pizza
const orderPizza = () =>{
    return {
        type:ORDER_PIZZA,
        shop_name : "pizza_shop"
    }
}
//for burger
const orderBurger = () =>{
    return {
        type:ORDER_BURGER,
        shop_name:"burger_shop"
    }
}

//reducer
const initialStateForPizza = {
    pizzaBase : 100,
}

const initialStateForBurger = {
    burgerBase : 200
}

const reducerForPizza = (state=initialStateForPizza,action) =>{
    switch (action.type){
        case ORDER_PIZZA:
            return{
                ...state,
                pizzaBase: state.pizzaBase + 10 //updating the state..

            }
        default:
            return state
    }
}

const reducerForBurger = (state=initialStateForBurger,action) =>{
    switch (action.type){
        case ORDER_BURGER:
            return{
                ...state,
                burgerBase: state.burgerBase + 20
            }
        default:
            return state
    }
}


//store
//store needs to hold the application state
const rootReducer = combineReducers({
    pizza : reducerForPizza,
    burger : reducerForBurger,
})
const store = createStore(rootReducer);

//it exposes a method called getState() which give the access to you
//application of the current state
console.log("initial state",store.getState());

//registers listeners via subscribe(listener)
const unsubscribe = store.subscribe(()=>console.log("initial state",store.getState()));

//allows updation of state with dispatch(action)
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderBurger());
store.dispatch(orderBurger());
unsubscribe()
store.dispatch(orderBurger());
