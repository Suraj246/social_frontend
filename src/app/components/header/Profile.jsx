"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/userSlice'
import { userProfile, userProfileUpdate } from '../../redux/slices/profileSlice';
import ProfileImage from './ProfileImage'
import ProfileForm from './ProfileForm'
// import Cookies from 'js-cookie';

const Profile = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const selector = useSelector(state => state.userProfileData)
    const { userProfileData, status, error } = selector

    // const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}
    // console.log(user)

    const [imagePreview, setImagePreview] = useState(null);
    // const [input, setInput] = useState({ username: user?.username || "", email: user?.email || "", location: user?.location || "" });
    const [input, setInput] = useState({ username: userProfileData?.data?.username || "", email: userProfileData?.data?.email || "", location: userProfileData?.data?.location || "unknown" });

    useEffect(() => {
        dispatch(userProfile())
    }, [dispatch, input])

    const [image, setImage] = useState('')

    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()

        formData.append("image", image)
        formData.append("username", input.username)
        formData.append("location", input.location)
        dispatch(userProfileUpdate(formData))
            .then((res) => {
                console.log(res.payload)
                if (res?.payload?.success === "user updated") {
                    // setInput((prev) => {
                    //     return {
                    //         ...prev,
                    //         username: user?.username,
                    //         location: user?.location,
                    //         location: user?.email,
                    //     }
                    // })
                    setInput((prev) => {
                        return {
                            ...prev,
                            username: userProfileData?.data?.username,
                            location: userProfileData?.data?.location,
                            location: userProfileData?.data?.email,
                        }
                    })
                    router.push('/')
                }
                return
            })

    };

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            router.push("/login")
            window.location.reload()
        }
        return
    }, [router])

    const Logout = () => {
        dispatch(logout())
        router.push("/login")
        setTimeout(() => {
            window.location.reload()
        }, 300)
    }

    return (

        <div className="container mx-auto px-4 py-4 h-fit">
            <div className=" mx-auto bg-white rounded-lg shadow-md p-3">
                <h1 className="text-2xl font-semibold text-gray-700">Update Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center mb-6">
                        <label htmlFor="image" className="relative cursor-pointer">
                            <div className="w-24 h-24  bg-gray-200 rounded-full mb-4">
                                <ProfileImage userProfileData={userProfileData} imagePreview={imagePreview} />
                            </div>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <div className="absolute bottom-0 right-0 rounded-full bg-indigo-500 text-white px-2 py-1 text-sm">
                                Upload
                            </div>
                        </label>
                    </div>
                    {error ? <span className='text-red-800 capitalize '>something went wrong</span> : ''}

                    <ProfileForm input={input} inputHandler={inputHandler} />

                </form>
                <button
                    className="w-full mt-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-300"
                    onClick={Logout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile
