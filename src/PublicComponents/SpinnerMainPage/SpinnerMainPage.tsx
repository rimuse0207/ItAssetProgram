import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

type SpinnerMainPageProsp = {
    LoadingState: boolean;
};

const SpinnerMainPage = () => {
    return (
        <div style={{ marginTop: '30px' }}>
            <TailSpin color="#515151" height={30} width={30}></TailSpin>
        </div>
    );
};

export default SpinnerMainPage;
