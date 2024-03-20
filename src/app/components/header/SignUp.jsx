"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser } from '../../redux/slices/userSlice'

const SignUp = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const selector = useSelector(state => state.userInfo)
    const { status } = selector

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !username) {
            alert("Please enter a valid email or password or username")
            return
        }

        dispatch(signUpUser({ username, email, password }))
            .then((res) => {
                if (res.error) {
                    return
                }
                router.push('/login')
            })
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-indigo-500 mb-6">Create an Account</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {status === "failed" ? <span className='text-sm text-red-600 capitalize text-center w-full '>email already exits</span> : ''}
                    <div>
                        <label htmlFor="username" className="block text-gray-800 font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Create a username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-800 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-800 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Create a password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300">
                        Sign Up
                    </button>
                    <p className="text-gray-600 text-center text-sm">
                        Already have an account?
                        <Link href="/login" className="text-indigo-500 hover:text-indigo-600">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
