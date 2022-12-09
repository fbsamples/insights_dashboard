import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import reducer from './reducer';

export const makeStore = () => createStore(reducer);

export const wrapper = createWrapper(makeStore, { debug: true });
