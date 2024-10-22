//This file contains the code to understand Redux core with vanilla JS
//Without using any other library(like react-redux or redux/toolkit) or React App

const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

//Constants for actions to be dispatched
const CAKE_ORDERED = "CAKE_ORDERED";
const RESTORE_CAKE = "RESTORE_CAKE";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTORED = "ICECREAM_RESTORED";

//Initial states for different reducers
const initialCakeState = {
  numberOfCakes: 10,
};

const initialIceCreamState = {
  numberOfIcecreams: 20,
};

//Actions creators that returns the action
function cakeOrdered() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

function restoreCake(qty) {
  return {
    type: RESTORE_CAKE,
    quantity: qty,
  };
}

function iceCreamOrdered() {
  return {
    type: ICECREAM_ORDERED,
    quantity: 1,
  };
}

function restoreIceCream(qty) {
  return {
    type: ICECREAM_RESTORED,
    quantity: qty,
  };
}

//Reducer functions to update the store(state) based on the dispatched action
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case RESTORE_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.quantity,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1,
      };
    case ICECREAM_RESTORED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams + action.quantity,
      };
    default:
      return state;
  }
};

//The root reducer which combines all the reducer functions into a single reducer,
//that can be passed to the store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

//Creating the actual store which will hold tha data
const store = createStore(rootReducer);

//Binding the action creators to the dispatch method,
//so we don't have to call the dispatch every time an action needs to triggered
// NOT REALLY NEEDED
const actions = bindActionCreators(
  { cakeOrdered, restoreCake, iceCreamOrdered, restoreIceCream },
  store.dispatch
);

//Logging the state to check the initial state
console.log(store.getState());

//Subscribing to the store, so every time store is updated the listener function will be executed.
//Here just logging the state to check the updated value
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

//Dispatching the actions to update the values in the store
actions.cakeOrdered();
actions.cakeOrdered();
actions.cakeOrdered();
actions.restoreCake(7);
actions.iceCreamOrdered();
actions.iceCreamOrdered();
actions.iceCreamOrdered();
actions.iceCreamOrdered();
actions.iceCreamOrdered();
actions.restoreIceCream(15);

//Unsubscribing from the store
//After unsubscribing any update in the store will not be reflected
unsubscribe();
