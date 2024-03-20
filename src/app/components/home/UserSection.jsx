"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import Ske_User from './skeletons/Ske_User'
import { API } from '../../API'
import { userProfile } from '../../redux/slices/profileSlice'
const UserSection = () => {

    const dispatch = useDispatch()
    const selector = useSelector(state => state.userProfileData)
    const { userProfileData, status, error } = selector
    console.log(userProfileData.data)
    console.log(`${API}/uploads/${userProfileData?.data?.image}`)

    useEffect(() => {
        dispatch(userProfile())
    }, [dispatch])


    return (
        <section className="fullscreen-user" >
            <div className="bg-white shadow-md rounded-md p-2 w-full flex flex-col mt-3">
                {status === "loading" ? <Ske_User /> : error ? <span className="text-sm font-semibold text-red-800">{error}</span> :

                    <Link href={`/userpersonalscreen/${userProfileData?.data?._id}`}>
                        <div className="w-full">
                            <Image
                                src={userProfileData?.data?.image ? `${API}/uploads/${userProfileData?.data?.image}` : ""}
                                alt="image" className="w-14 h-14 rounded-full object-cover"
                                width={100} height={100}
                                style={{ backgroundColor: userProfileData?.data?.image ? "" : "black" }} />
                        </div>
                        <div className="flex flex-col items-start w-full text-sm mt-2">
                            <h2 className="font-semibold capitalize">{userProfileData?.data?.username}</h2>
                            <span className="text-gray-500">Email: {userProfileData?.data?.email}</span>
                            <span className="text-gray-500">Location: {userProfileData?.data?.location}</span>
                            <span className="text-gray-500">Connections: {userProfileData?.data?.friends?.length}</span>
                            <span className="text-gray-500">Joined: {userProfileData?.data?.createdAt.slice(0, 10)}</span>
                        </div>
                    </Link>

                }
            </div>
        </section>
    )
}

export default UserSection
