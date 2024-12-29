import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Ske_User = () => {
    return (
        <div className="rounded-md flex flex-col mt-3 items-center p-2 ">
            <div className=" w-full">
                <Skeleton width={50} height={50} style={{ borderRadius: "50px" }} />
            </div>
            <div className=" w-full flex flex-col items-start">
                <Skeleton width={100} height={12} />
                <Skeleton width={180} height={12} />
                <Skeleton width={120} height={12} />
                <Skeleton width={100} height={12} />
                <Skeleton width={130} height={12} />
            </div>
        </div>
    )
}

export default Ske_User
