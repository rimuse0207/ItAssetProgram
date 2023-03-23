import React, { useCallback, useState } from 'react';
import Modal from 'react-modal';
import { CgClose } from 'react-icons/cg';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { request } from '../../../Apis/core';
import { toast } from '../../../PublicComponents/ToastMessage/ToastManager';
import { ko } from 'date-fns/esm/locale';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Models';

const ConsumableListsInsertMainDivBox = styled.div`
    .Close_button_container {
        position: fixed;
        top: 10px;
        right: 10px;
        color: red;
        font-weight: bolder;
        font-size: 1.3em;
        :hover {
            cursor: pointer;
        }
    }
    .Menu_Title {
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 1.1em;
        font-weight: bolder;
    }
    input {
        border: 1px solid lightgray;
        width: 90%;
        padding-left: 15px;
        min-height: 40px;
    }
    .Count_Select_Container {
        display: flex;
        align-items: center;

        button {
            height: 30px;
            width: 50px;
            border: none;
            border-radius: 10px;
            margin-left: 10px;
            margin-right: 10px;
            :hover {
                cursor: pointer;
            }
        }
        input {
            width: 100px;
            margin: 0px;
            text-align: center;
            font-weight: bolder;
            font-size: 1em;
            padding: 0px;
        }
    }

    .Button_Cotainer {
        max-width: 500px;
        width: 100%;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
        button {
            width: 120px;
            height: 40px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }
        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        animation: 'smoothAppear 0.5s ease',
        zIndex: '105',
        width: '90%',
        padding: '20px',
        height: '90vh',
        overflow: 'auto',
    },
};
Modal.setAppElement('#ModalMainDiv');

type ConsumableListsInsertPropsTypes = {
    ModalisOpen: boolean;
    setModalisOpen: () => void;
    Consumable_List_Data_Getting: () => void;
    SelectCompany: string;
};

type FileStateDataTypes = {
    filename: string;
};

const ConsumableListsInsert = ({
    ModalisOpen,
    setModalisOpen,
    Consumable_List_Data_Getting,
    SelectCompany,
}: ConsumableListsInsertPropsTypes) => {
    const LoginInfoData = useSelector((state: RootState) => state.LoginCheck);
    const [FileStateData, setFileStateData] = useState<FileStateDataTypes | null>(null);
    const [ConsumableList_Data, setConsumableList_Data] = useState({
        ConsumableList_Code: uuid(),
        ConsumableList_Name: '',
        ConsumableList_Count: 1,
        ConsumableList_Compnay: SelectCompany,
        ConsumableList_Date: new Date(),
        ID: LoginInfoData.email,
    });

    const plusCount = () => {
        setConsumableList_Data({ ...ConsumableList_Data, ConsumableList_Count: ConsumableList_Data.ConsumableList_Count + 1 });
    };
    const minusCount = () => {
        if (ConsumableList_Data.ConsumableList_Count - 1 < 0) {
        } else {
            setConsumableList_Data({ ...ConsumableList_Data, ConsumableList_Count: ConsumableList_Data.ConsumableList_Count - 1 });
        }
    };

    const HandleDataAdd = async () => {
        try {
            if (!FileStateData || !ConsumableList_Data.ConsumableList_Name || ConsumableList_Data.ConsumableList_Count < 0) {
                alert('정확하게 공란을 적어 주세요.');
                return;
            }

            const Add_Insert_ConsumableList_Data_Axios = await request.post(`/IT_Consumable_app_server/Consumable_Stock_Data_Insert`, {
                FileStateData,
                ConsumableList_Data,
            });

            if (Add_Insert_ConsumableList_Data_Axios.data.dataSuccess) {
                toast.show({
                    title: `소모품 등록을 완료하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                Consumable_List_Data_Getting();
                setModalisOpen();
            } else {
                toast.show({
                    title: `확인 후 다시 시도해주세요.`,
                    successCheck: false,
                    duration: 4000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 이미지 파일 업로드
    const onUploadImage = useCallback(async e => {
        if (!e.target.files) {
            return;
        }

        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const dataSendImageFromServer = await request.post(`/IT_Consumable_app_server/Consumable_Image_Upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (dataSendImageFromServer.data.dataSuccess) {
            console.log(dataSendImageFromServer);
            setTimeout(() => {
                setFileStateData(dataSendImageFromServer.data.Image_data);
            }, 2000);
        } else {
        }
    }, []);
    return (
        <div>
            <Modal isOpen={ModalisOpen} style={customStyles} contentLabel="데이터 입력 Modal">
                <ConsumableListsInsertMainDivBox>
                    <div className="Close_button_container">
                        <CgClose onClick={() => setModalisOpen()}></CgClose>
                    </div>
                    <h3>소모품 물품 등록</h3>
                    <div>
                        <div className="Menu_Title">소모품 등록 사진 : </div>
                        {FileStateData ? (
                            <div style={{ marginBottom: '50px' }}>
                                <div></div>
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/license/${FileStateData?.filename.split('.')[0]}_resize.jpg`}
                                    width="300px"
                                    alt="사진업로드"
                                ></img>
                            </div>
                        ) : (
                            <div>
                                <input type="file" accept="image/*" name="thumbnail" onChange={onUploadImage}></input>
                            </div>
                        )}

                        <div>
                            <div className="Menu_Title">소모품 메뉴명 : </div>
                            <input
                                value={ConsumableList_Data.ConsumableList_Name}
                                placeholder="소모품 메뉴명을 입력 해주세요."
                                onChange={e => setConsumableList_Data({ ...ConsumableList_Data, ConsumableList_Name: e.target.value })}
                            ></input>
                        </div>
                        <div>
                            <div className="Menu_Title">소모품 구매날짜 : </div>
                            <DatePicker
                                selected={ConsumableList_Data.ConsumableList_Date}
                                onChange={(date: Date) => setConsumableList_Data({ ...ConsumableList_Data, ConsumableList_Date: date })}
                                locale={ko}
                                dateFormat="yyy-MM-dd"
                                maxDate={new Date()}
                            />
                        </div>
                        <div>
                            <div className="Menu_Title">등록 회사명 : </div>
                            <input value={ConsumableList_Data.ConsumableList_Compnay} placeholder="조식 메뉴명을 입력 해주세요."></input>
                        </div>
                        <div>
                            <div className="Menu_Title">수량 : </div>
                            <div className="Count_Select_Container">
                                <button
                                    onClick={() => {
                                        minusCount();
                                    }}
                                >
                                    <BiMinusCircle></BiMinusCircle>
                                </button>
                                <input
                                    style={{ width: '80px', textAlign: 'center' }}
                                    type="number"
                                    value={ConsumableList_Data.ConsumableList_Count}
                                    onChange={e =>
                                        setConsumableList_Data({ ...ConsumableList_Data, ConsumableList_Count: Number(e.target.value) })
                                    }
                                ></input>
                                <button
                                    onClick={() => {
                                        plusCount();
                                    }}
                                >
                                    <BiPlusCircle></BiPlusCircle>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="Button_Cotainer">
                        <button className="Submit" onClick={() => HandleDataAdd()}>
                            물품 등록
                        </button>

                        <button
                            className="Cancle"
                            onClick={() => {
                                setModalisOpen();
                            }}
                        >
                            취소
                        </button>
                    </div>
                </ConsumableListsInsertMainDivBox>
            </Modal>
        </div>
    );
};

export default ConsumableListsInsert;
