const redux = require("redux");
const createStore = redux.createStore;

const ORDER_pizza = "order_pizza"

//action
// const action = {
//         type : ORDER_pizza,
//         shop_name : "pizza_shop"
// }

//action creator
const order_pizza = () => {
        return {
            type : ORDER_pizza,
            shop_name : "pizza_shop"
        }
}

//reducer
const initialState = {
    pizzaBase : 100,
    toppings : ["cheese","capsicum"]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ORDER_pizza:
            return {
                ...state,
                pizzaBase : state.pizzaBase + 10
            }
        default:
            return state
    }
}

//store

//1.store needs to hold the application state
const store = createStore(reducer);

//2. it exposes a method called getState() which gives
// access to your application of the current state.
console.log(store.getState())

//3.registers listeners via subscribe(listener)
const unsubscribe = store.subscribe(()=>console.log("Initial state:", store.getState()));


//4.allows updation of state with dispatch(action)
store.dispatch(order_pizza());
store.dispatch(order_pizza());
store.dispatch(order_pizza());
store.dispatch(order_pizza());
store.dispatch(order_pizza());
unsubscribe()
store.dispatch(order_pizza());