"use client"
import React, { useEffect } from 'react';
import ".././home/home.css"
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { API } from '../../API'
import UserSkeleton from '../home/skeletons/UserSkeleton';
import { userProfileFriendList } from '../../redux/slices/userScreenSlice';
import { userProfile } from '../../redux/slices/profileSlice';
import { removeFriendIdApi } from '../../redux/slices/userSlice';

const FriendListUserScreen = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.userProfileScreen)
    const { userFriendList, status, error } = selector

    useEffect(() => {
        dispatch(userProfileFriendList())
    }, [dispatch])

    const handleRemoveFriend = (friend_index) => {
        dispatch(removeFriendIdApi(friend_index))
            .then((res) => {
                dispatch(userProfileFriendList())
            })
    }

    return (
        <div className="p-1 mt-8">
            <h2 className="text-xl text-semibold mb-4 text-gray-900">Followings</h2>
            <ul className="divide-y divide-gray-300">
                {status === "loading" ? <UserSkeleton cards={1} /> : error ? <span className="text-gray-800">{error}</span> :
                    userFriendList?.data?.friends?.map((friend, idx) => {
                        return (
                            <li key={idx} className="flex justify-between items-center text-gray-900 py-2">
                                <Link href={`/userpersonalscreen/${friend?._id}`} className="flex items-center gap-2">
                                    <Image src={friend?.image ? `${API}/uploads/${friend?.image}` : ""} alt="" width={100} height={100} className="w-8 object-cover h-8 rounded-full" loading="lazy" />
                                    <span className="capitalize">{friend?.username}</span>
                                </Link>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => handleRemoveFriend(idx)}
                                    viewBox="0 0 640 512"
                                    className='size-5 cursor-pointer'
                                >
                                    <path fill="#de1b1b" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                                </svg>
                            </li>
                        )
                    })}
            </ul>
        </div>
    );
};

export default FriendListUserScreen;
