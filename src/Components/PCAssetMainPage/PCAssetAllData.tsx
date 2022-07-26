import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FcInfo } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { RootState } from '../../Models';
import { Link, useParams } from 'react-router-dom';
import UpdatePcAssetUserDataModal from './PcAssetMenuIcons/PcAssetModals/UpdatePcAssetUserDataModal';

const PCAssetAllDataMainDivBox = styled.div`
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    padding-top: 20px;
    padding-left: 10px;
    margin-right: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
    margin-bottom: 80px;
    margin-top: 50px;
    position: relative;
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
        vertical-align: center;
        border-bottom: 1px solid #ccc;
    }
    .table_color_on {
        background-color: #e8e8e8;

        :first-child {
            border-top: 5px solid black;
        }
    }

    .UserMinusIcons,
    .UserPlusIcons {
        font-size: 1.5em;
        display: inline-block;
    }
    .UserMinusIcons {
        :hover {
            cursor: pointer;
            color: red;
        }
    }
    .UserPlusIcons {
        :hover {
            cursor: pointer;
            color: limegreen;
        }
    }
    .Asset_Type_MenuBar {
        position: absolute;
        top: -42px;
        left: 10px;

        ul {
            display: flex;
            height: 40px;
            align-items: center;
            a {
                color: black;
            }
            li {
                width: 150px;
                height: 100%;
                line-height: 40px;
                text-align: center;
                margin-right: 20px;
                background-color: #ffffff;
                font-weight: bolder;
                border-radius: 5px 5px 0px 0px;
                box-shadow: rgba(0, 0, 0, 0.15) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.05) 0px 0.125em 0.5em,
                    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
                :hover {
                    cursor: pointer;
                    background-color: gray;
                    color: white;
                }
            }
            .Select_Menus {
                background-color: gray;
                color: white;
            }
        }
    }
`;

export type DeskTopInfoDataType = {
    asset_management_number: string;
    asset_division: string;
    asset_maker: string | null;
    asset_model: string | null;
    asset_purchase_date: string | null;
    asset_pride: string | null;
    asset_cpu: string | null;
    asset_ram: string | null;
    asset_disk: string | null;
    asset_newcode: string | null;
    asset_distribute_date: string | null;
    asset_destroy_check: number | null;
    userinfo_email: string | null;
    company_info_company_code: string | null;
    company_code: string | null;
    company_name: string | null;
    company_location: string | null;
    company_building: string | null;
    company_floor: string | null;
    email: string | null;
    name: string | null;
    team: string | null;
    position: string | null;
    entercompany: string | null;
    exitcompany: string | null;
    inservice: string | null;
    updatedate: string | null;
    companyInfo_companycode: string | null;
    team_lists_belong_team_id: string;
    team_lists_belong_team_name: string;
    team_lists_company: string;
    team_lists_rank: number;
    team_lists_team_id: string;
    team_lists_team_name: string;
    asset_notepad: string;
};
type getDatasProps = {
    show_team: string;
    show_team_id: string;
    rows2: DeskTopInfoDataType[];
};

type PCAssetAllDataProps = {
    SelectCompany: string;
};

type paramasType = {
    type: string;
};

const PCAssetAllData = ({ SelectCompany }: PCAssetAllDataProps) => {
    const [getDatas, setGetData] = useState<getDatasProps[]>([]);
    const FilteringData = useSelector((state: RootState) => state.FilteringData.FilteringData);
    const [Loading, setLoading] = useState(false);
    const [UserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
    const [SelectAssetData, setSelectAssetData] = useState<DeskTopInfoDataType | null>(null);
    const { type } = useParams<paramasType>();
    useEffect(() => {
        GetAllData();
    }, [type, FilteringData]);

    const GetAllData = async () => {
        try {
            setLoading(true);
            setGetData([]);
            const getData = await axios.post(`${process.env.REACT_APP_API_URL}/Asset_app_server/Asset_Data_Getting`, {
                company: SelectCompany,
                type,
                FilteringData,
            });
            if (getData.data.dataSuccess) {
                setLoading(false);
                console.log(getData);
                setGetData(getData.data.datas);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleMinusUsered = async (data: DeskTopInfoDataType) => {
        try {
            console.log(data);
            setSelectAssetData(data);
            setUserUpdateModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PCAssetAllDataMainDivBox>
            <div className="Asset_Type_MenuBar">
                <ul>
                    <Link to="/PCAsset/All">
                        <li className={type === 'All' ? 'Select_Menus' : ''}>ALL</li>
                    </Link>
                    <Link to="/PCAsset/DeskTop">
                        <li className={type === 'DeskTop' ? 'Select_Menus' : ''}>데스크탑</li>
                    </Link>
                    <Link to="/PCAsset/NoteBook">
                        <li className={type === 'NoteBook' ? 'Select_Menus' : ''}>노트북</li>
                    </Link>
                </ul>
            </div>
            <table className="type09">
                <thead>
                    <tr>
                        <th>부서</th>
                        <th>인덱스</th>
                        <th>이름</th>
                        <th>구분</th>
                        <th>관리번호</th>
                        <th>제조사</th>
                        <th>모델명</th>
                        <th>구입일</th>
                        <th>취득가</th>
                        <th>CPU</th>
                        <th>RAM</th>
                        <th>DISK</th>
                        <th>자산코드</th>
                        <th>메모장</th>
                        <th>정보조회</th>
                    </tr>
                </thead>
                <tbody>
                    {!Loading ? (
                        getDatas.map((list, i) => {
                            return list.rows2.length > 0 ? (
                                list.rows2.map((item, j) => {
                                    return (
                                        <tr
                                            className={i % 2 === 0 ? '' : 'table_color_on'}
                                            style={j === 0 ? { borderTop: '2px solid black' } : {}}
                                            key={item.asset_management_number}
                                        >
                                            {j === 0 ? (
                                                <td rowSpan={list.rows2.length} style={{ fontWeight: 'bold' }}>
                                                    {list.show_team}
                                                </td>
                                            ) : (
                                                <></>
                                            )}
                                            <td>{j + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.asset_division}</td>
                                            <td>{item.asset_management_number}</td>
                                            <td>{item.asset_maker}</td>
                                            <td>{item.asset_model}</td>
                                            <td>{moment(item.asset_purchase_date).format('YYYY-MM-DD')}</td>
                                            <td>{item.asset_pride ? Number(item.asset_pride).toLocaleString('ko-KR') : '-'}</td>
                                            <td>{item.asset_cpu}</td>
                                            <td>{item.asset_ram}</td>
                                            <td>{item.asset_disk}</td>
                                            <td>{item.asset_newcode}</td>
                                            <td>{item.asset_notepad}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {item.asset_destroy_check === 0 ? (
                                                    <div className="UserPlusIcons" onClick={() => handleMinusUsered(item)}>
                                                        <FcInfo></FcInfo>
                                                    </div>
                                                ) : (
                                                    <div>폐기 처리</div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td>{list.show_team}</td>
                                    <td colSpan={13}>데이터 없음</td>
                                </tr>
                            );
                        })
                    ) : (
                        <div>Loading....</div>
                    )}
                    <tr></tr>
                </tbody>
            </table>
            {UserUpdateModalOpen ? (
                <UpdatePcAssetUserDataModal
                    UserAddModalOpen={UserUpdateModalOpen}
                    setUserAddModalOpen={() => setUserUpdateModalOpen(false)}
                    setSelectAssetData={(data: any) => setSelectAssetData(data)}
                    SelectAssetData={SelectAssetData}
                    SelectCompany={SelectCompany}
                ></UpdatePcAssetUserDataModal>
            ) : (
                ''
            )}
        </PCAssetAllDataMainDivBox>
    );
};

export default PCAssetAllData;
