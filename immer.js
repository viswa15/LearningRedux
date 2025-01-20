const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const ORDER_TOPPINGS = "ORDER_TOPPINGS";

//action creator
const orderToppings = (topping) =>{
    return {
        type : ORDER_TOPPINGS,
        payload : topping
    }
}

const initialState = {
    name : "Masala Dosa",
    ingredients : {
        flour : "1KG",
        toppings : "Special Masala with Onions",
        oil : "1Litre"
    }
}

//reducer
const reducer = (state = initialState,action) =>{
    switch(action.type){
        case ORDER_TOPPINGS:
            return produce(state,(draft)=>{
                draft.ingredients.toppings = action.payload
            })

        default:
            return state
    }
}

const store = createStore(reducer);
console.log("Initial State:",store.getState());

const unsubscribe = store.subscribe(()=> {
    console.log("Updated State:", store.getState())
});


store.dispatch(orderToppings("Mysore Masala with Grated Panner"));

unsubscribe();

