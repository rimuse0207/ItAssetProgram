import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Models';

const SettingChangeMainPage = () => {
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);
    const [getSettingTitle, setGetSettingTitle] = useState([]);

    useEffect(() => {
        getLicenseData();
    }, []);

    const getLicenseData = async () => {
        try {
            const GetLicenseData = await axios.get(`${process.env.REACT_APP_API_URL}/Asset_app_server/license_settingData`, {
                params: {
                    id: LoginInfoData.email,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return <div>asdadad</div>;
};

export default SettingChangeMainPage;
