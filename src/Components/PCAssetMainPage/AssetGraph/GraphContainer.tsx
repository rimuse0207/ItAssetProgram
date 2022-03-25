import styled from 'styled-components';
import AssetGraphMainPage from './AssetGraphMainPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Models';
import { NothingAssetCheckFunc } from '../../../PublicFunc/NothingAssetData';

const PcassetGraphMainDivBox = styled.div`
    height: 30vh;
    width: 99%;
    margin-bottom: 20px;

    .Asset_GraphContainer {
        display: flex;
        justify-content: space-between;
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

const GraphContainer = () => {
    const DeskTopInfo = useSelector((state: RootState) => state.DeskTopAssetData.DeskTopAssetData);
    const NotBookInfo = useSelector((state: RootState) => state.NoteBookAssetData.NoteBookAssetData);
    const MonitorInfo = useSelector((state: RootState) => state.MonitorAssetData.MonitorAssetData);

    return (
        <PcassetGraphMainDivBox>
            {DeskTopInfo.data || NotBookInfo.data || MonitorInfo.data ? (
                <div className="Asset_GraphContainer">
                    <div className="Asset_GraphContent">
                        <h2>데스크탑</h2>
                        <h4 style={{ position: 'absolute', left: '20px' }}>
                            {DeskTopInfo.data.length - NothingAssetCheckFunc(DeskTopInfo.data)}/{NothingAssetCheckFunc(DeskTopInfo.data)}/
                            {DeskTopInfo.data.length}
                        </h4>
                        <AssetGraphMainPage
                            assetType="데스크탑"
                            usedData={[
                                DeskTopInfo.data.length - NothingAssetCheckFunc(DeskTopInfo.data),
                                NothingAssetCheckFunc(DeskTopInfo.data),
                                DeskTopInfo.data.length,
                            ]}
                        ></AssetGraphMainPage>
                    </div>
                    <div className="Asset_GraphContent">
                        <h2>노트북</h2>
                        <h4 style={{ position: 'absolute', left: '20px' }}>
                            {NotBookInfo.data.length - NothingAssetCheckFunc(NotBookInfo.data)}/{NothingAssetCheckFunc(NotBookInfo.data)}/
                            {NotBookInfo.data.length}
                        </h4>
                        <AssetGraphMainPage
                            assetType="노트북"
                            usedData={[
                                NotBookInfo.data.length - NothingAssetCheckFunc(NotBookInfo.data),
                                NothingAssetCheckFunc(NotBookInfo.data),
                                NotBookInfo.data.length,
                            ]}
                        ></AssetGraphMainPage>
                    </div>
                    <div className="Asset_GraphContent">
                        <h2>모니터</h2>
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
                    </div>
                </div>
            ) : (
                <div>Loading....</div>
            )}
        </PcassetGraphMainDivBox>
    );
};
export default GraphContainer;
