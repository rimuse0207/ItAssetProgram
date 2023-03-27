import React from 'react';
import styled from 'styled-components';
import { TbWritingSign, TbEyeCheck } from 'react-icons/tb';

const SoftwareContainerMainDivBox = styled.div`
    width: 95%;
    margin: 0 auto;
    margin-top: 30px;
    border-bottom: 1px dashed lightgray;
    padding-bottom: 20px;

    .ContentList_Main_Container {
        ::after {
            clear: both;
            display: block;
            content: '';
        }
        height: 240px;
        .ContentList_Left_Image {
            float: left;
            width: 350px;
            height: 100%;
            .ContentList_Left_Image_Content {
                height: 100%;
                overflow: hidden;
            }
        }
        .ContentList_Right_ContentText {
            position: relative;
            float: right;
            width: calc(100% - 420px);
            margin-right: 30px;
            height: 100%;
            p {
                font-size: 16px;
                width: 80%;
            }
            .ConentList_hashTag {
                color: #368;
                position: absolute;
                bottom: 20px;
            }
            .ContentList_DetailMore {
                position: absolute;
                bottom: 0px;
                color: blue;
                :hover {
                    cursor: pointer;
                    color: #368;
                }
            }
            .ContanteList_HeartCount {
                position: absolute;
                bottom: 0px;
                right: 0px;
                :hover {
                    cursor: pointer;
                }
            }
            .ContanteList_ShowCount {
                position: absolute;
                top: 0px;
                right: 0px;
                color: gray;
            }
        }
    }
    .Delete_HashTag {
        margin-left: 5px;
        margin-right: 5px;
    }
    .container_Delete_HashTag {
        margin-left: 5px;
        margin-right: 5px;
        :hover {
            cursor: pointer;
            color: red;
        }
    }
`;

type SoftwareContainerPropsTypes = {
    name: string;
};

const SoftwareContainer = ({ name }: SoftwareContainerPropsTypes) => {
    return (
        <SoftwareContainerMainDivBox>
            {' '}
            <div>
                <div className="ContentList_Main_Container">
                    <div className="ContentList_Left_Image">
                        <div className="ContentList_Left_Image_Content">사진이 들어갑니다.</div>
                    </div>
                    <div className="ContentList_Right_ContentText">
                        <div>
                            <div>등록자 : 유성재 | 2023-03-27</div>
                            <h2 style={{ fontSize: '2em', marginTop: '0px' }}>{name}</h2>
                            <div>
                                {/* <p>
                                    프로세스 자동화를 피해가는 길은 없습니다. 디지털화 전략을 추구하는 기업이라면 더욱 그렇습니다. 그렇게
                                    보면 12개월 내에 RPA에 투자할 것이라고 답한 기업의 비율이 70%에 육박하는 것도 당연합니다. 이중 약 40%는
                                    이미 RPA에 100만 유로이상의 예산을 책정했습니다.
                                </p> */}
                            </div>
                            <div className="ConentList_hashTag">해쉬태그</div>
                            <div className="ContentList_DetailMore">자세히보기</div>
                            <div className="ContanteList_HeartCount">
                                <div>
                                    <span style={{ color: 'black', fontSize: '20px' }}>
                                        <TbWritingSign></TbWritingSign>
                                    </span>
                                    <span>hashtag 작성</span>
                                </div>
                            </div>
                            <div className="ContanteList_ShowCount">
                                <span>
                                    <TbEyeCheck></TbEyeCheck>
                                </span>
                                <span>숫자</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SoftwareContainerMainDivBox>
    );
};

export default SoftwareContainer;
