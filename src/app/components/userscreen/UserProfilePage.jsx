"use client"

import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../API";
import { sendFriendRequestApi, userProfileById, userProfileFriendList } from "../../redux/slices/userScreenSlice";
import FriendListUserScreen from './FriendListUserScreen'
import { userProfile } from "../../redux/slices/profileSlice";
import { allPostApi, postDeleteUserScreen } from "../../redux/slices/postsSlice";
import PageScroller from "../home/PageScroller";
import UserScreenUploadedFiles from "./UserScreenUploadedFiles";

function UserProfilePage({ params }) {
    const router = useRouter()

    const parsedValue = JSON.parse(params.value)
    const id = parsedValue.id
    const dispatch = useDispatch()
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

    const selector = useSelector(state => state.userProfileScreen)

    const { userProfileScreenData, status, error } = selector
    console.log(userProfileScreenData)

    const s = useSelector(state => state.userProfileData)

    const getFriendsIds = s?.userProfileData?.data?.friends.map((item) => item._id)

    const allPosts = useSelector(state => state.postsData)
    const { postsData } = allPosts
    const userProfileScreenPosts = postsData.filter((item) => item.user?._id === id)

    useEffect(() => {
        dispatch(allPostApi())
    }, [dispatch])

    useEffect(() => {
        dispatch(userProfileById(id))
        dispatch(userProfileFriendList())
        dispatch(userProfile())
    }, [dispatch])


    const handleDelete = (post_index, postId) => {
        dispatch(postDeleteUserScreen({ post_index, postId }))
            .then((res) => {
                dispatch(userProfileById(id))
            })

    }
    const sendFriendId = (friendId) => {
        dispatch(sendFriendRequestApi(friendId))
            .then((res) => {
                dispatch(userProfile())
            })
    }

    return (
        <div className="container shadow-md mx-auto py-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16">
            <div className="bg-white  rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">

                        <div> {
                            userProfileScreenData?.image ?


                                (<Image src={`${API}/uploads/${userProfileScreenData?.image}`}
                                    alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" width={400} height={400} />)
                                :
                                // (<Skeleton width={110} height={110} style={{ borderRadius: "50px" }} />)
                                <span>error{error}</span>

                        }
                        </div>

                        <div>
                            <h1 className="text-gray-600 text-2xl font-semibold mb-2">{userProfileScreenData?.username || <Skeleton width={200} height={25} />}</h1>
                            <p className="text-gray-500">{userProfileScreenData?.location || <Skeleton width={200} height={25} />}</p>
                        </div>
                    </div>


                    {
                        user?.userId !== id &&
                        <button
                            onClick={() => sendFriendId(userProfileScreenData?._id)}
                            className="bg-indigo-500 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-600 transition duration-300">
                            {getFriendsIds?.includes(id) ? "Following" : "Follow" || <Skeleton width={200} height={25} />}
                        </button>
                    }
                </div>
                {
                    user?.userId === id &&
                    <FriendListUserScreen />
                }

                <h2 className="text-xl font-semibold my-4 text-gray-600 "> Posts</h2>
                <div className=" flex ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 w-full">
                        {status === "loading" ?
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center py-2 px-4 text-white font-medium rounded-md transition duration-300">
                                <svg className="mr-3 h-10 w-10 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </button>
                            : error ? <span className="text-gray-600">{error}</span>
                                :
                                userProfileScreenPosts?.map((item, idx) => {
                                    return (
                                        <UserScreenUploadedFiles key={idx} post={item} user={user} id={id} handleDelete={handleDelete} idx={idx} />
                                    )

                                })}
                    </div>

                    <div className="hidden md:flex justify-end items-end">
                        <PageScroller />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserProfilePage;
