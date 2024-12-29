"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validUserEmail } from '../../redux/slices/userSlice'


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const selector = useSelector(state => state.userInfo)
    console.log("forgot password", selector)
    const { status } = selector

    const formHandle = (e) => {
        e.preventDefault()
        if (!email) {
            alert('Please enter your valid email')
            return
        }
        dispatch(validUserEmail({ email }))

    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4 md:p-0" >
            <div className="w-full md:w-2/6 px-6 py-8 bg-white shadow-md rounded-md">
                <form className="space-y-4" onSubmit={formHandle}>
                    {
                        status === "success" ?
                            <span className='text-sm text-green-600 capitalize text-center w-full '>we have sent a link for reset password</span>
                            :
                            status === "failed" ? <span className='text-sm text-red-600 capitalize text-center w-full '>email does not exit</span> : ''
                    }
                    <div>
                        <label htmlFor="username" className="block text-gray-800 font-medium mb-1 capitalize">
                            enter email
                        </label>
                        <input
                            type="text"
                            value={email}
                            id="email"
                            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="capitalize w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300"
                    >
                        send link
                    </button>
                </form>
                <div className='grid'>
                    <span className="text-gray-600 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-indigo-500 hover:text-indigo-600">
                            Sign up
                        </Link>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword
