import React from 'react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import MainLayout from './Components/Layout/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Components/redux/store';
import Login from './Components/Login/login';

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainLayout />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
