import styled from 'styled-components';
import AssetGraphMainPage from './AssetGraphMainPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Models';
import { NothingAssetCheckFunc } from '../../../PublicFunc/NothingAssetData';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PcassetGraphMainDivBox = styled.div`
    height: 30vh;
    width: 99%;
    margin-bottom: 20px;

    .Asset_GraphContainer {
        display: flex;
        justify-content: space-around;
        height: 100%;

        border-radius: 5px;
        .Asset_GraphContent {
            position: relative;
            border-radius: 5px;
            background-color: #fff;
            border: 1px solid lightgray;
            padding: 10px;
            width: 30%;
        }
    }
`;

type GraphContainerProps = {
    Asset_Count: number;
    Asset_Count_Null: number;
    DeskTop_Count: number;
    DeskTop_Count_Null: number;
    NoteBook_Count: number;
    NoteBook_Count_Null: number;
};

type GraphContainerPropsType = {
    SelectCompany: string;
};

const GraphContainer = ({ SelectCompany }: GraphContainerPropsType) => {
    // const DeskTopInfo = useSelector((state: RootState) => state.DeskTopAssetData.DeskTopAssetData);
    // const NotBookInfo = useSelector((state: RootState) => state.NoteBookAssetData.NoteBookAssetData);
    // const MonitorInfo = useSelector((state: RootState) => state.MonitorAssetData.MonitorAssetData);

    const [GraphCount, setGraphCount] = useState<GraphContainerProps>({
        Asset_Count: 0,
        Asset_Count_Null: 0,
        DeskTop_Count: 0,
        DeskTop_Count_Null: 0,
        NoteBook_Count: 0,
        NoteBook_Count_Null: 0,
    });

    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        getAllCountAssetData();
    }, [SelectCompany]);

    const getAllCountAssetData = async () => {
        try {
            setLoading(true);
            const getAllCountAssetDataFromServer = await axios.get(
                `${process.env.REACT_APP_API_URL}/Asset_app_server/Asset_Count_For_Graph`,
                {
                    params: {
                        company: SelectCompany,
                    },
                }
            );

            if (getAllCountAssetDataFromServer.data.dataSuccess) {
                console.log(getAllCountAssetDataFromServer);
                setGraphCount(getAllCountAssetDataFromServer.data.datas);
                setLoading(false);
            } else {
                alert('에러 발생');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <PcassetGraphMainDivBox>
            {!Loading ? (
                <div className="Asset_GraphContainer">
                    <div className="Asset_GraphContent">
                        <h3>데스크탑 + 노트북</h3>
                        <h4 style={{ position: 'absolute', left: '20px' }}>
                            {GraphCount.Asset_Count - GraphCount.Asset_Count_Null} / {GraphCount.Asset_Count_Null} /{' '}
                            {GraphCount.Asset_Count}
                        </h4>
                        <AssetGraphMainPage
                            assetType="데스크탑 + 노트북"
                            usedData={[
                                GraphCount.Asset_Count - GraphCount.Asset_Count_Null,
                                GraphCount.Asset_Count_Null,
                                GraphCount.Asset_Count,
                            ]}
                        ></AssetGraphMainPage>
                    </div>
                    <div className="Asset_GraphContent">
                        <h3>데스크탑</h3>
                        <h4 style={{ position: 'absolute', left: '20px' }}>
                            {GraphCount.DeskTop_Count - GraphCount.DeskTop_Count_Null} / {GraphCount.DeskTop_Count_Null} /
                            {GraphCount.DeskTop_Count}
                        </h4>
                        <AssetGraphMainPage
                            assetType="데스크탑"
                            usedData={[
                                GraphCount.DeskTop_Count - GraphCount.DeskTop_Count_Null,
                                GraphCount.DeskTop_Count_Null,
                                GraphCount.DeskTop_Count,
                            ]}
                        ></AssetGraphMainPage>
                    </div>
                    <div className="Asset_GraphContent">
                        <h3>노트북</h3>
                        <h4 style={{ position: 'absolute', left: '20px' }}>
                            {GraphCount.NoteBook_Count - GraphCount.NoteBook_Count_Null} / {GraphCount.NoteBook_Count_Null} /
                            {GraphCount.NoteBook_Count}
                        </h4>
                        <AssetGraphMainPage
                            assetType="노트북"
                            usedData={[
                                GraphCount.NoteBook_Count - GraphCount.NoteBook_Count_Null,
                                GraphCount.NoteBook_Count_Null,
                                GraphCount.NoteBook_Count,
                            ]}
                        ></AssetGraphMainPage>
                    </div>
                    {/* <div className="Asset_GraphContent">
                        <h3>모니터</h3>
                        <h4 style={{ position: 'absolute', left: '20px' }}>
                            {MonitorInfo.data.length - NothingAssetCheckFunc(MonitorInfo.data)}/{NothingAssetCheckFunc(MonitorInfo.data)}/
                            {MonitorInfo.data.length}
                        </h4>
                        <AssetGraphMainPage
                            assetType="모니터"
                            usedData={[
                                MonitorInfo.data.length - NothingAssetCheckFunc(MonitorInfo.data),
                                NothingAssetCheckFunc(MonitorInfo.data),
                                MonitorInfo.data.length,
                            ]}
                        ></AssetGraphMainPage>
                    </div> */}
                </div>
            ) : (
                <div>Loading....</div>
            )}
        </PcassetGraphMainDivBox>
    );
};
export default GraphContainer;
