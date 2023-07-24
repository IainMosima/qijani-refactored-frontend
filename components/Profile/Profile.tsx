"use client";
import { useRouter } from 'next/router';
import "./Profile.scss";
import { User } from "@/models/user";
import Loading from '../Loading/Loading';
import Image from "next/image";
import { Images } from "@/constants";
import { Input, Tooltip, Select, Button } from '@mantine/core';
import { useAppSelector } from '@/hooks/reduxHook';


interface ViewUserProfileProps {
    loggedInUser: User;
}

const ViewUserProfile = () => {
    const user = useAppSelector(state => state.login.user)

    return (
        <div className="app__profile sm:mt-[8.5rem] mt-[7.5rem]">
            <div className="profile_intro">
                <div className="mini_intro">
                    {user?.profileImgKey && (
                        <Image
                            className="intro_image"
                            width={40}
                            height={40}
                            src={user?.profileImgKey}
                            alt="default" />
                    )}
                    <Image className="edit1" src={Images.edit} alt="edit-icon" />
                </div>
                <div className="mini_intro">
                    <div className="mini_details">
                        <p><b>{user?.username}</b></p>
                        <small>{user?.location}</small>
                    </div>
                    <Image className="edit1" src={Images.edit} alt="edit-icon" />
                </div>
            </div>
            <div className="profile_details">
                <div className="phone">
                    <Image className='phone_icon' src={Images.phoneIcon} alt="phone-icon" />
                    <div className="phone_mini">
                        <h3><b>PHONE</b></h3>
                        <div className="number">
                            <p>{user?.phoneNumber}</p>
                            <Image className="edit1" src={Images.edit} alt="edit-icon" />
                        </div>
                    </div>
                </div>
                <div className="email">
                    <Image className='email_icon' src={Images.emailIcon} alt="phone-icon" />
                    <div className="email_mini">
                        <h3><b>EMAIL</b></h3>
                        <div className="mail">
                            <p>{user?.email}</p>
                            <Image className="edit1" src={Images.edit} alt="edit-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="delivery_details">
                <h5><b>Delivery Info.</b></h5>
                <div className="county">
                    <div>
                        <h5>County:</h5>
                    </div>
                    <div>
                        <Select
                            placeholder="Select County"
                            data={['County1', 'County2', 'County3', 'County4']}
                            transitionProps={{ transition: 'skew-up', duration: 300, timingFunction: 'ease' }}
                        />
                    </div>
                </div>
                <div className="area">
                    <div>
                        <h5>Area:</h5>
                    </div>
                    <div>
                        <Select
                            placeholder="Select County"
                            data={['Area1', 'Area2', 'Area3', 'Area4']}
                            transitionProps={{ transition: 'skew-up', duration: 300, timingFunction: 'ease' }}
                        />
                    </div>
                </div>
                <div className="landmark">
                    <div>
                        <h5>Landmark:</h5>
                    </div>
                    <div>
                        <Input
                            placeholder="E.g. Building name"
                            rightSection={
                                <Tooltip label="Enter a well known building near you!" position="top-end" withArrow>
                                    <div>
                                        <Image className="info" src={Images.info} alt="info-icon" />
                                    </div>
                                </Tooltip>
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="bottom_details">
                <p className="change">Change password?</p>
                <Button className="save" variant="white" color="gray">
                    Save Changes
                </Button>

            </div>
            {/* <div className="mt-[23rem]">
                <Loading />
            </div> */}
        </div>
    );
}

export default ViewUserProfile;