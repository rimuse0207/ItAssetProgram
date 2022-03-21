import React, { useState, useEffect } from 'react';
import { LicensMainTableIncludeBox } from '../VolumeLicenseMainPage/VolumeLicenseMainPage';
import { LicenseDataType } from '../VolumeLicenseMainPage/VolumeLicenseDataTypes';
import moment from 'moment';
import { LicenseInfoGet } from '../../../Apis/core/api/AuthNeedApi/LicenseApi';

type NetworkLicenseMainPageProps = {
    SelectCompany: string;
};
const NetworkLicenseMainPage = ({ SelectCompany }: NetworkLicenseMainPageProps) => {
    const [getData, setGetData] = useState<LicenseDataType[]>([]);
    useEffect(() => {
        GetInfoLicensData();
    }, []);
    const GetInfoLicensData = async () => {
        try {
            const ParamasData = {
                company: SelectCompany,
                license: 'network_license',
            };
            const getInfoLicenseData = await LicenseInfoGet('/license_app_server/LicenseSelect', ParamasData);

            if (getInfoLicenseData.data.dataSuccess) {
                setGetData(getInfoLicenseData.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div>
                <div>
                    <div>
                        <h2>Network License</h2>
                    </div>
                    <LicensMainTableIncludeBox>
                        <table className="type09">
                            <thead>
                                <tr>
                                    <th scope="cols">인덱스</th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        코드
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        이름
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        설명
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        구매 날짜
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        종료 날짜
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />키 확인
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        사용 가능 인원
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        사용 인원
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        사용 허용(여유) 인원
                                    </th>
                                    <th scope="cols">
                                        네트워크라이선스 <br />
                                        사용자 정보
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {getData.map((list, i) => {
                                    return (
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td>{list.code}</td>
                                            <td>{list.name}</td>
                                            <td>{list.explaindesc}</td>
                                            <td>{moment(list.contractdate).format('YYYY-MM-DD')}</td>
                                            <td>{moment(list.terminateddate).format('YYYY-MM-DD')}</td>
                                            <td>클릭</td>
                                            <td>{list.max_access}</td>
                                            <td>{list.counts}</td>
                                            <td>{(list.max_access ? list.max_access : 0) - (list.counts ? list.counts : 0)}</td>
                                            <td>클릭</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </LicensMainTableIncludeBox>
                </div>
            </div>
        </div>
    );
};

export default NetworkLicenseMainPage;
