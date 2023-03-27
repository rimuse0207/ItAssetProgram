import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { request } from '../../../Apis/core';
import SoftwareContainer from './SoftwareContainer/SoftwareContainer';
import { FloatingMenu, MainButton, ChildButton, Directions } from 'react-floating-button-menu';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { CgPlayListAdd } from 'react-icons/cg';
import SoftwareInstallModal from './SoftwareInstallModal/SoftwareInstallModal';

const SoftwareInstallContainerMainDivBox = styled.div`
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

    #info-block {
        padding: 30px;

        padding-bottom: 50px;
    }
    #info-block section {
        border: 2px dashed lightgray;
        padding-bottom: 50px;
    }

    .file-marker > div {
        padding: 0 2px;
        min-height: 100vh;
        margin-top: -2.5em;
        .box-title {
            background: white none repeat scroll 0 0;
            display: inline-block;
            padding: 0 1px;
            margin-left: 1em;
            font-size: 3em;
            font-weight: bolder;
        }
    }
    .ContentBox_NextContentShowButton {
        button {
            border: 1px solid black;
            text-align: center;
            width: 300px;
            height: 40px;
            border-radius: 30px;
            font-size: 1.3em;
            font-weight: bolder;
            :hover {
                cursor: pointer;
            }
        }
        width: 300px;
        margin: 0 auto;
        margin-top: 50px;
    }
    .Floating_Menus {
        position: fixed;
        bottom: 50px;
        right: 50px;
    }
`;

type SoftwareInstallContainerPropsType = {
    SelectCompany: string;
};

const SoftwareInstallContainer = ({ SelectCompany }: SoftwareInstallContainerPropsType) => {
    const [dataTest, setDataTest] = useState([{ name: '1' }, { name: '1' }, { name: '1' }, { name: '1' }]);
    const [isOpen, setisOpen] = useState(true);
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    const Software_state_getting = async () => {
        try {
            const Software_state_getting_Axios = await request.get(`/license_app_server/software_state_getting`);

            if (Software_state_getting_Axios.data.dataSuccess) {
                setDataTest(Software_state_getting_Axios.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Software_state_getting();
    }, []);

    return (
        <SoftwareInstallContainerMainDivBox>
            <aside id="info-block">
                <section className="file-marker">
                    <div>
                        <div className="box-title">{SelectCompany} 설치 소프트웨어</div>
                        <div className="box-contents">
                            <div id="audit-trail">
                                {dataTest.map(list => {
                                    return <SoftwareContainer name={list.name}></SoftwareContainer>;
                                })}
                            </div>
                        </div>
                        <div className="ContentBox_NextContentShowButton"></div>
                    </div>
                </section>
            </aside>
            <div className="Floating_Menus">
                <FloatingMenu slideSpeed={500} direction={Directions.Up} spacing={8} isOpen={isOpen}>
                    <MainButton
                        iconResting={<IoMdAdd style={{ fontSize: 20 }} color="black" />}
                        iconActive={<IoMdClose style={{ fontSize: 20 }} color="black" />}
                        background="white"
                        onClick={() => setisOpen(!isOpen)}
                        size={56}
                    />
                    <ChildButton
                        icon={<CgPlayListAdd style={{ fontSize: 20 }} />}
                        background="white"
                        size={40}
                        onClick={() => setModalIsOpen(true)}
                    />
                </FloatingMenu>
            </div>
            <SoftwareInstallModal ModalIsOpen={ModalIsOpen} setModalIsOpen={data => setModalIsOpen(data)}></SoftwareInstallModal>
        </SoftwareInstallContainerMainDivBox>
    );
};

export default SoftwareInstallContainer;
