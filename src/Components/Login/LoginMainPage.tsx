import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillMail } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';
import { LoginCheckAPI } from '../../Apis/core/api/AuthUnNeedApi/LoginCheck/LoginCheck';
import { LoginCheckRedux } from '../../Models/LoginCheckRedux/LoginCheckRedux';
import { useDispatch } from 'react-redux';
import { toast } from '../../PublicComponents/ToastMessage/ToastManager';
import { ToastTime } from '../../Configs/ToastTimerConfig';
import { AccessKeyMenuBarRedux } from '../../Models/AccessKeyMenuBarRedux/AccessKeyMenuBarRedux';
import PasswordChangeModal from './PasswordChangeModal/PasswordChangeModal';

const LoginMainPageDivBox = styled.div`
    .page-container {
        width: 100vw;
        height: 100vh;
        background: #eff0f2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shadow {
        -webkit-box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
        -moz-box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
        box-shadow: 27px 43px 43px -26px rgba(89, 89, 89, 0.39);
    } /*
.shadow-light{
    -webkit-box-shadow: 45px 45px 104px -33px rgba(38,38,38,0.92);
    -moz-box-shadow: 45px 45px 104px -33px rgba(38,38,38,0.92);
    box-shadow: 45px 45px 104px -33px rgba(38,38,38,0.92);

}*/
    .login-form-container {
        background: #f5f5f5;
        width: 860px;
        height: 540px;
        display: flex;
        flex-direction: row;
        box-shadow: 10px black;
        border-radius: 10px;
    }
    .login-form-right-side {
        width: 50%;
        border-radius: 10px 0px 0px 10px;
        padding: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        background-image: radial-gradient(ellipse farthest-corner at 0 140%, #5d9dff 0%, #2178ff 70%, #3585ff 70%);
    }
    .login-form-right-side h1 {
        color: white;
        width: 100%;
        text-align: right;
        opacity: 0.9;
    }
    .login-form-right-side p {
        padding-top: 50px;
        font-size: 12px;
        text-align: right;
        opacity: 1;
    }
    .login-form-left-side {
        width: 50%;
        border-radius: 0px 10px 10px 0px;
        display: flex;

        flex-direction: column;
        align-items: center;
        padding: 40px;
        background: rgb(255, 255, 255);
        background: linear-gradient(287deg, rgba(255, 255, 255, 1) 0%, rgba(243, 244, 244, 1) 0%, rgba(255, 255, 255, 1) 100%);
    }
    .login-form-left-side .login-top-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
    }
    .login-form-left-side .login-top-wrap span {
        color: gray;
        font-size: 11px;
        padding-right: 20px;
    }
    .login-form-left-side .login-top-wrap .create-account-btn {
        background: white;
        border: 0;
        width: 85px;
        height: 35px;
        font-size: 11px;
        color: #2178ff;
        border-radius: 3px;
    }
    .login-input-container {
        padding-top: 120px;
        width: 300px;
    }
    .login-input-container .login-input-wrap {
        width: 300px;
        height: 45px;
        margin-top: 20px;
        border-radius: 2px;
        border-bottom: solid 2px #2178ff;
    }
    .login-input-container .login-input-wrap i {
        color: #2178ff;
        line-height: 45px;
    }

    .login-input-container .login-input-wrap input {
        background: none;

        border: none;
        line-height: 45px;
        padding-left: 10px;
        width: 267px;
    }
    .login-input-container .login-input-wrap input:focus {
        outline: none;
    }
    .login-btn-wrap {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .login-btn-wrap .login-btn {
        width: 95px;
        height: 35px;
        color: white;
        border: 0;
        border-radius: 4px;

        background: rgb(105, 163, 255);
        background: linear-gradient(162deg, rgba(105, 163, 255, 1) 0%, rgba(43, 125, 254, 1) 50%, rgba(43, 125, 254, 1) 100%);
    }
    .login-btn-wrap a {
        margin-top: 10px;
        text-decoration: none;
        font-size: 11px;
        color: gray;
    }
`;

type LoginDataInfoTypes = {
    email: string | null;
    password: string | null;
};

const LoginMainPage = ({ history }: any) => {
    const dispatch = useDispatch();
    const [LoginDataInfo, setLoginDataInfo] = useState<LoginDataInfoTypes>({
        email: localStorage.getItem('id') ? localStorage.getItem('id') : '',
        password: '',
    });
    const [PasswordChangeModalState, setPasswordChangeModalState] = useState(false);

    const handleClicksLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (LoginDataInfo.email === '' || LoginDataInfo.password === '') {
                toast.show({
                    title: `ID 또는 패스워드를 확인 해 주세요.`,
                    successCheck: false,
                    duration: ToastTime,
                });
                return;
            }

            const LoginCheckFromServer = await LoginCheckAPI(`/LoginCheck_app_server/LoginCheckData`, LoginDataInfo);

            if (LoginCheckFromServer.data.dataSuccess) {
                if (LoginCheckFromServer.data.PasswordChange) {
                    setPasswordChangeModalState(LoginCheckFromServer.data.PasswordChange);
                    setLoginDataInfo({
                        ...LoginDataInfo,
                        password: '',
                    });
                    // alert('초기 비밀번호이므로 패스워드 변경 후 이용 가능합니다.');
                    toast.show({
                        title: `초기 비밀번호이므로 패스워드 변경 후 이용 가능합니다.`,
                        successCheck: true,
                        duration: ToastTime,
                    });
                } else {
                    const testSuccess = {
                        LoginCheck: true,
                        email: LoginDataInfo.email,
                        LoginToken: LoginCheckFromServer.data.token,
                        refreshToken: LoginCheckFromServer.data.refreshToken,
                        AdminAccess: LoginCheckFromServer.data.AdminAccess,
                    };
                    await dispatch(AccessKeyMenuBarRedux(LoginCheckFromServer.data.CompanySelectAccessKey));
                    await dispatch(LoginCheckRedux(testSuccess));

                    localStorage.setItem('id', LoginDataInfo.email ? LoginDataInfo.email : '');
                    sessionStorage.setItem('email', LoginCheckFromServer.data.email);
                    sessionStorage.setItem('name', LoginCheckFromServer.data.name);
                    setLoginDataInfo({
                        email: '',
                        password: '',
                    });
                    history.push('/');
                }
            } else {
                if (!LoginCheckFromServer.data.LoginChecking) {
                    toast.show({
                        title: `ID 또는 패스워드를 확인 해 주세요.`,
                        successCheck: false,
                        duration: ToastTime,
                    });
                    setLoginDataInfo({
                        ...LoginDataInfo,
                        password: '',
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: `서버와의 연결 끊김 IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: ToastTime,
            });
        }
    };

    return (
        <div>
            <LoginMainPageDivBox>
                <div className="page-container">
                    <div className="login-form-container shadow">
                        <div className="login-form-right-side">
                            <div className="top-logo-wrap"></div>
                            <h1>IT 자산 프로그램</h1>
                            <p>* 스마트 IT팀에 허가 되지 않은 소프트웨어 프로그램 사용 시에는 책임은 본인에게 있습니다.</p>
                        </div>
                        <div className="login-form-left-side">
                            {/* <div className="login-top-wrap">
                    <span>Don't have an account?</span>
                    <button className="create-account-btn shadow-light">Create Profile</button>
                </div> */}
                            <form onSubmit={e => handleClicksLogin(e)}>
                                <div className="login-input-container">
                                    <div className="login-input-wrap input-id">
                                        <i className="far fa-envelope">
                                            <AiFillMail></AiFillMail>
                                        </i>
                                        <input
                                            placeholder="Email"
                                            type="text"
                                            value={LoginDataInfo.email ? LoginDataInfo.email : ''}
                                            onChange={e => setLoginDataInfo({ ...LoginDataInfo, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="login-input-wrap input-password">
                                        <i className="fas fa-key">
                                            <BsKey></BsKey>
                                        </i>
                                        <input
                                            placeholder="Password"
                                            type="password"
                                            value={LoginDataInfo.password ? LoginDataInfo.password : ''}
                                            onChange={e => setLoginDataInfo({ ...LoginDataInfo, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="login-btn-wrap">
                                    <button className="login-btn" type="submit">
                                        Login
                                    </button>
                                    {/* <a href="#" >Forgot password?</a> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </LoginMainPageDivBox>
            {PasswordChangeModal ? (
                <PasswordChangeModal
                    PasswordChangeModalState={PasswordChangeModalState}
                    setPasswordChangeModalState={() => setPasswordChangeModalState(false)}
                    LoginDataInfo={LoginDataInfo}
                ></PasswordChangeModal>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default LoginMainPage;
