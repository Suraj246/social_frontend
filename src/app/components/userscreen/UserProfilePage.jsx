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

    const id = params?.id

    const dispatch = useDispatch()
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

    const selector = useSelector(state => state.userProfileScreen)
    const { userProfileScreenData, status, error } = selector


    const s = useSelector(state => state.userProfileData)

    const getFriendsIds = s?.userProfileData?.data?.friends.map((item) => item._id)
    console.log(getFriendsIds)
    console.log(getFriendsIds?.includes(id))
    const allPosts = useSelector(state => state.postsData)
    const { postsData } = allPosts
    const userProfileScreenPosts = postsData.filter((item) => item.user._id === id)

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
            <div className="bg-white  rounded-lg p-8 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">


                        <Image
                            src={userProfileScreenData?.image ? `${API}/uploads/${userProfileScreenData?.image}` : <Skeleton width={110} height={110} style={{ borderRadius: "50px" }} />}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mr-6 object-cover"
                            width={400} height={400}
                        />



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
                {/* <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">About Me</h2>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                        consequat risus ligula, vitae gravida purus feugiat eu. Phasellus
                        molestie dolor id mauris ultricies, a mattis velit consequat.
                        Nullam quis leo sapien. Nullam aliquam nec diam a commodo.
                    </p>
                </div>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Interests</h2>
                    <ul className="flex flex-wrap gap-2 text-gray-600">
                        <li>#WebDevelopment</li>
                        <li>#JavaScript</li>
                        <li>#React</li>
                        <li>#Photography</li>
                        <li>#Travel</li>
                    </ul>
                </div> */}
                <div className="mt-5  p-2 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 text-gray-600 ">Documents</h2>
                    <div className="grid grid-cols-1 gap-4 place-items-center">
                        {/* <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 border-2"> */}
                        {status === "loading" ?
                            // <Skeleton width={400} height={200} />
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

                    <div className="flex justify-end">
                        <PageScroller />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserProfilePage;
