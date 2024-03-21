import React from 'react'
import { API } from '../../API';
import Image from 'next/image';

const ProfileImage = ({ userProfileData, imagePreview }) => {
    return (
        <div className=' w-full h-full'>
            <Image
                src={imagePreview ? imagePreview : `${API}/uploads/${userProfileData?.data?.image}`}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover"
                width={500} height={500}
                style={{ backgroundColor: imagePreview ? "black" : "white" }} // Adjusted style based on image availability
            />
        </div>
    )
}
// src={imagePreview ? `${imagePreview}` : userProfileData?.data?.image ? `${API}/uploads/${userProfileData?.data?.image} ` : ""}

export default ProfileImage
