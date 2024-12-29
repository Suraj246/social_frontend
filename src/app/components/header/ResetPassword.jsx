"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetUserPassword } from '../../redux/slices/userSlice'
import { useRouter } from 'next/navigation'


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const dispatch = useDispatch()
    const selector = useSelector(state => state.userInfo)
    const router = useRouter()
    const { status } = selector

    const formHandle = (e) => {
        e.preventDefault()
        if (!newPassword) {
            alert('Please enter your valid new Password')
            return
        }
        dispatch(resetUserPassword(newPassword))
            .then((res) => {
                if (res.error) {
                    return
                }
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            })
        return
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4 md:p-0" >
            <div className="w-full md:w-2/6 px-6 py-8 bg-white shadow-md rounded-md">
                <form className="space-y-4" onSubmit={formHandle}>
                    {
                        status === "success" ?
                            <span className='text-sm text-green-600 capitalize text-center w-full '>password updated, redirecting to login page</span>
                            :
                            status === "failed" ? <span className='text-sm text-red-600 capitalize text-center w-full '>try later</span> : ''
                    }
                    <div>
                        <label htmlFor="username" className="block text-gray-800 font-medium mb-1 capitalize">
                            set new password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            id="newPassword"
                            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="set new password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="capitalize w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300"
                    >
                        create new password
                    </button>
                </form>
                <div className='grid'>
                    <span className="text-gray-600 text-center text-sm">
                        <Link href="/login" className="text-indigo-500 hover:text-indigo-600">
                            Sign in
                        </Link>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ResetPassword
