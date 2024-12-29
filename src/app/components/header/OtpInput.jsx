import React, { useState } from 'react';

const OtpInput = () => {
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (index, value) => {
        if (!/^[0-9]$/.test(value) && value !== '') return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input box automatically
        if (value !== '' && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };
    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                document.getElementById(`otp-${index - 1}`).focus();

            }
        }
    };
    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Enter OTP</h1>
                <div className="flex space-x-2">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>
                <button
                    className="mt-6 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
                    onClick={() => console.log('OTP:', otp.join(''))}
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default OtpInput;
