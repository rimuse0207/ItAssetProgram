import React, { useEffect, useState } from 'react';
import NavigationMenuBarMainPage from '../Navigation/NavigationMenuBarMainPage';
import styled from 'styled-components';
import { PersonalInfoGet } from '../../Apis/core/api/AuthUnNeedApi/UserInfoApi';
import moment from 'moment';

const PersonalMainPageDivBox = styled.div`
    width: 100%;
    background-color: #efefef;
    overflow-y: auto;
    max-height: 100vh;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 7px solid transparent;
        background-clip: content-box;
        background-color: gray;
    }
    .PersonInfo {
        height: 15vh;
        text-align: end;

        table {
            font-size: 0.8em;
            position: relative;
            width: 500px;
            display: inline-block;
            margin-top: 20px;
            border: 1px solid #ccc;
            margin-right: 30px;
            background-color: #fff;
            border-radius: 5px;
        }

        table.type09 {
            border-collapse: collapse;
            text-align: left;
            line-height: 1.5;
        }
        table.type09 thead th {
            padding: 10px;
            font-weight: bold;
            vertical-align: top;
            color: #369;
            border-bottom: 3px solid #036;
            text-align: center;
        }
        table.type09 tbody th {
            width: 150px;
            padding: 10px;
            font-weight: bold;
            vertical-align: top;
            border-bottom: 1px solid #ccc;
            background: #f3f6f7;
        }
        table.type09 td {
            width: 350px;
            padding: 10px;
            vertical-align: top;
            border-bottom: 1px solid #ccc;
            text-align: center;
        }
    }
    .AssetPersonalInfo {
        padding: 40px;
        .AssetTableContainer {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
                rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
            direction: ltr;
            scrollbar-color: #d4aa70 #e4e4e4;
            scrollbar-width: thin;
            ::-webkit-scrollbar {
                width: 20px;
            }

            ::-webkit-scrollbar-track {
                background-color: #e4e4e4;
                border-radius: 100px;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 100px;
                border: 7px solid transparent;
                background-clip: content-box;
                background-color: #368;
            }
            table {
                font-size: 0.8em;
                position: relative;
                width: 100%;
                margin-top: 30px;
                background-color: #fff;
                border-radius: 5px;
            }

            table.type09 {
                border-collapse: collapse;
                text-align: left;
                line-height: 1.5;
            }
            table.type09 thead th {
                padding: 10px;
                font-weight: bold;
                vertical-align: top;
                color: #369;
                border-bottom: 3px solid #036;
            }
            table.type09 tbody th {
                width: 150px;
                padding: 10px;
                font-weight: bold;
                vertical-align: top;
                border-bottom: 1px solid #ccc;
                background: #f3f6f7;
            }
            table.type09 td {
                width: 350px;
                padding: 10px;
                vertical-align: top;
                border-bottom: 1px solid #ccc;
            }
        }
    }
`;

type UserAssetTypes = {
    asset_explain: string | null;
    asset_purchasedate: string | null;
    code: string | null;
    type: string | null;
    asset_urgentdate: string | null;
};
type UserInfoTypes = {
    companylocation: string | null;
    companyname: string | null;
    name: string | null;
    position: string | null;
    team: string | null;
};

type LicenseTypes = {
    code: string | null;
    explaindesc: string | null;
    license_code: string | null;
    name: string | null;
    prove_file_location: string | null;
    registerdate: string | null;
    terminateddate: string | null;
    userinfo_email: string | null;
};

const PersonalMainPage = () => {
    const [userInfoDatas, setUserInfoDatas] = useState<UserInfoTypes[]>([]);
    const [userAssetDatas, setAssetDatas] = useState<UserAssetTypes[]>([]);
    const [userLicenseDatas, setUserLicenseDatas] = useState<LicenseTypes[]>([]);
    useEffect(() => {
        GetInfoDataPersonal();
    }, []);

    const GetInfoDataPersonal = async () => {
        const Paramas = {
            email: 'sjyoo@dhk.co.kr',
        };
        const PersonalDatas = await PersonalInfoGet('/UserInfo_app_server/getPersonalDatas', Paramas);
        if (PersonalDatas.data.dataSuccess) {
            setUserInfoDatas(PersonalDatas.data.datas.UserInfo);
            setAssetDatas(PersonalDatas.data.datas.Asset);
            var arr = PersonalDatas.data.datas.License;
            arr.sort(function (a: any, b: any) {
                var nameA = a.userinfo_email ? a.userinfo_email.toUpperCase() : 'ZZZZZZZZ'; // ignore upper and lowercase
                var nameB = b.userinfo_email ? b.userinfo_email.toUpperCase() : 'ZZZZZZZZ'; // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // 이름이 같을 경우
                return 0;
            });
            setUserLicenseDatas(arr);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div>
                    <NavigationMenuBarMainPage></NavigationMenuBarMainPage>
                </div>
                <PersonalMainPageDivBox>
                    <div className="PersonInfo">
                        <div>
                            <table className="type09">
                                <thead>
                                    <tr>
                                        <th scope="row">회사</th>
                                        <th scope="row">이름</th>
                                        <th scope="row">직급</th>
                                        <th scope="row">소속</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userInfoDatas.length > 0 ? (
                                        userInfoDatas.map((list, i) => {
                                            return (
                                                <tr key={list.name}>
                                                    <td>
                                                        {list.companyname}_{list.companylocation}
                                                    </td>
                                                    <td>{list.name}</td>
                                                    <td>{list.position}</td>
                                                    <td>{list.team}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td>데이터 없음</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="AssetPersonalInfo">
                        <div>
                            <div>
                                <h3>지급 물품</h3>
                            </div>
                        </div>
                        <div className="AssetTableContainer">
                            <table className="type09">
                                <thead>
                                    <tr>
                                        <th scope="cols">인덱스</th>
                                        <th scope="cols">구분</th>
                                        <th scope="cols">종류</th>
                                        <th scope="cols">지급 날짜</th>
                                        <th scope="cols">고유 ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userAssetDatas.map((list, i) => {
                                        return (
                                            <tr key={list.code}>
                                                <td>{i + 1}</td>
                                                <td scope="row">
                                                    {list.type === 'desktop' ? '데스크탑' : list.type === 'notebook' ? '노트북' : '모니터'}
                                                </td>
                                                <td>
                                                    {list.type === 'desktop' ? '데스크탑' : list.type === 'notebook' ? '노트북' : '모니터'}
                                                    __{list.asset_explain}
                                                </td>
                                                <td>{moment(list.asset_urgentdate).format('YYYY-MM-DD')}</td>
                                                <td>{list.code}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="AssetPersonalInfo">
                        <div>
                            <div>
                                <h3>소프트웨어</h3>
                            </div>
                        </div>
                        <div className="AssetTableContainer">
                            <table className="type09">
                                <thead>
                                    <tr>
                                        <th scope="cols">인덱스</th>
                                        <th scope="cols">구분</th>
                                        <th scope="cols">사용 여부</th>
                                        <th scope="cols">지급 일자</th>
                                        <th scope="cols">고유 ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userLicenseDatas.map((list, i) => {
                                        return (
                                            // <tr style={list.userinfo_email ? { background: '#94b290' } : { background: '#edb0ad' }}>
                                            <tr key={list.code}>
                                                <td>{i + 1}</td>
                                                <td>{list.name}</td>
                                                <td>{list.userinfo_email ? 'O' : 'X'}</td>
                                                <td>{list.userinfo_email ? moment(list.registerdate).format('YYYY-MM-DD') : '-'}</td>
                                                <td>{list.code}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </PersonalMainPageDivBox>
            </div>
        </div>
    );
};

export default PersonalMainPage;
