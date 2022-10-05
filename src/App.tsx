import React, { useEffect } from 'react';
import './App.css';
import MainPageComponents from './Components/MainPageComponents';
import axios from 'axios';

function App() {
    // useEffect(() => {
    //     HandleAPI();
    // }, []);
    // const HandleAPI = async () => {
    //     try {
    //         const getAPi = await axios.get(`/organizations?companyCode=A34`, {
    //             headers: {
    //                 'System-ID': 'A34REST00001',
    //             },
    //         });
    //         console.log(getAPi);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return <MainPageComponents></MainPageComponents>;
}

export default App;
