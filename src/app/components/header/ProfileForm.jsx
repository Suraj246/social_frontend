import React from 'react'

const ProfileForm = ({ input, inputHandler }) => {
    return (
        <div>
            <div className="mb-6">
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={inputHandler}
                    value={input.username}
                    className="w-full text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={inputHandler}
                    value={input.email}

                    className="w-full text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    value={input.location}
                    name="location"
                    onChange={inputHandler}
                    className="w-full text-gray-700 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your location"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md transition duration-300"
            >
                Update
            </button>
        </div>
    )
}

export default ProfileForm
