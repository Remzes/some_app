import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import reduxThunk from 'redux-thunk';

const middleware = applyMiddleware(reduxThunk);
const store = createStore(reducers, {}, middleware);

window.store = store;
export default store;