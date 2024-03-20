import React from 'react'
import Skeleton from 'react-loading-skeleton'

const UserSkeleton = ({ cards }) => {
    return (
        <>
            {
                Array(cards).fill(0).map((item, idx) => {
                    return (
                        <div className="flex justify-between items-center" key={idx}>
                            <div className="flex items-center gap-2 ">
                                <Skeleton width={30} height={30} style={{ borderRadius: "50px" }} />
                                <Skeleton width={70} height={12} />
                            </div>
                            <Skeleton width={20} height={20} />

                        </div>
                    )
                })
            }
        </>
    )
}

export default UserSkeleton
