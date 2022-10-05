import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterPage from './RouterPage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import rootReducer from './Models';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistConfig } from './Configs/ReduxPersistConfig';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(Thunk, createLogger())));
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <RouterPage></RouterPage>
    </Provider>,
    document.getElementById('root')
);
