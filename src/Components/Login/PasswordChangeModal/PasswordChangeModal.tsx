import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { LoginCheckAPI } from '../../../Apis/core/api/AuthUnNeedApi/LoginCheck/LoginCheck';

const PasswordChangeMainDivBox = styled.div`
    padding: 10px;
    margin: 0 auto;
    width: 60%;
    .InputContainer {
        margin-bottom: 20px;
        label {
            display: block;
            font-size: 1.1em;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input {
            width: 100%;
            height: 40px;
            border: 2px solid lightgray;
            padding-left: 10px;
            border-radius: 5px;
            :focus {
                outline: none;
                border: 2px solid #368;
            }
        }
    }
    .btns {
        padding: 30px 0 0 200px;
        .btn {
            display: inline-block;
            margin-right: 2px;
            padding: 10px 25px;
            background: none;
            border: 1px solid #c0c0c0;
            border-radius: 2px;
            color: #666;
            font-size: 1.125em;
            outline: none;
            transition: all 100ms ease-out;

            &:hover,
            &:focus {
                transform: translateY(-3px);
                cursor: pointer;
            }
            &-confirm {
                border: 1px solid #2962ff;
                background: #2962ff;
                color: #fff;
            }
        }
    }
`;

const customStyles = {
    content: {
        top: '25%',
        left: '25%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-25%',
        transhtmlForm: 'translate(-25%, -25%)',
        // animation: 'smoothAppear 0.5s ease',
        zIndex: '105',
        padding: '20px',
        width: '50%',
        height: '500px',
        backgroundColor: '#efefef',
    },
};

type PasswordChangeModalProps = {
    PasswordChangeModalState: boolean;
    setPasswordChangeModalState: () => void;
    LoginDataInfo: {
        email: string;
        password: string;
    };
};

const PasswordChangeModal = ({ PasswordChangeModalState, setPasswordChangeModalState, LoginDataInfo }: PasswordChangeModalProps) => {
    const [NewPassword, setNewPassword] = useState({
        NowPassword: '',
        NewPassword: '',
        NewPasswordCheck: '',
    });

    const hanldeClicksCancel = (e: React.FormEvent<HTMLButtonElement>) => {
        setPasswordChangeModalState();
    };

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (LoginDataInfo.password !== NewPassword.NowPassword) {
                alert('기존 비밀번호가 틀립니다.');
                return;
            } else if (NewPassword.NewPassword !== NewPassword.NewPasswordCheck) {
                alert('신규비밀번호가 틀립니다.');
                return;
            } else {
                const Parmas = {
                    LoginDataInfo,
                    NewPassword,
                };
                const ChangePasswordFromServer = await LoginCheckAPI('/LoginCheck_app_server/LoginPasswordChangeData', { Parmas });

                if (ChangePasswordFromServer.data.dataSuccess) {
                    alert('비밀번호 성공');
                    setPasswordChangeModalState();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal isOpen={PasswordChangeModalState} style={customStyles} contentLabel="비밀번호 변경 Modal">
                <PasswordChangeMainDivBox>
                    <h2 style={{ marginBottom: '30px' }}>비밀번호 변경</h2>
                    <form onSubmit={e => handleChangePassword(e)}>
                        <div>
                            <div className="InputContainer">
                                <label>기존 비밀번호</label>
                                <input
                                    type="password"
                                    value={NewPassword.NowPassword}
                                    onChange={e => setNewPassword({ ...NewPassword, NowPassword: e.target.value })}
                                ></input>
                            </div>
                            <div className="InputContainer">
                                <label>신규 비밀번호</label>
                                <input
                                    type="password"
                                    value={NewPassword.NewPassword}
                                    onChange={e => setNewPassword({ ...NewPassword, NewPassword: e.target.value })}
                                ></input>
                            </div>
                            <div className="InputContainer">
                                <label>신규 비밀번호 재확인</label>
                                <input
                                    type="password"
                                    value={NewPassword.NewPasswordCheck}
                                    onChange={e => setNewPassword({ ...NewPassword, NewPasswordCheck: e.target.value })}
                                ></input>
                            </div>

                            <div className="btns">
                                <button className="btn btn-confirm">저장</button>
                                <button className="btn btn-cancel" onClick={e => hanldeClicksCancel(e)}>
                                    취소
                                </button>
                            </div>
                        </div>
                    </form>
                </PasswordChangeMainDivBox>
            </Modal>
        </div>
    );
};

export default PasswordChangeModal;
