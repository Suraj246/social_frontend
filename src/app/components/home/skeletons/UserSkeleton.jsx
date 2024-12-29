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
                                <Skeleton width={200} height={15} />
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default UserSkeleton
