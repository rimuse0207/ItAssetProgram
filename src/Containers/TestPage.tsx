import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';

const TestPageMainDivBox = styled.div`
    border: 3px solid black;
    width: 100%;
    .First {
        border: 1px solid black;
        width: 300px;
        height: 30px;
    }
    .Second {
        border: 1px solid black;
        width: 300px;
        height: 30px;
    }
    .Third {
        border: 1px solid black;
        width: 300px;
        height: 30px;
    }
`;

type UserConnectData = {
    UserName: string;
};

const TestPage = () => {
    const [UserConnectData, setUserConnectData] = useState<UserConnectData[]>([]);

    useEffect(() => {
        getDataNames();
    }, []);
    const getDataNames = async () => {
        try {
            const datas = await axios.get('http://192.168.2.155:3001/LoginCheck_app_server/qweqwe');
            console.log(datas);

            setUserConnectData(datas.data.result.recordset);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TestPageMainDivBox>
            <div>
                <h2>금일 {moment().format('YYYY년 MM월 DD일')}</h2>
                <div>
                    <h4>접속자 ( {UserConnectData.length} )</h4>
                </div>
                <div>
                    <ul>
                        {UserConnectData.map(list => {
                            return <li>{list.UserName}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </TestPageMainDivBox>
    );
};

export default TestPage;
