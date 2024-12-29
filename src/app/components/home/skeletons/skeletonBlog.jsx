import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonBlog = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 gap-8 overflow-hidden">
            {
                Array(cards).fill().map((idx) => {
                    return (
                        <div className="grid  rounded-lg overflow-hidden" key={idx}>
                            <div className="flex items-center justify-between p-2 ">
                                <Skeleton width={50} height={50} style={{ borderRadius: "30px" }} />
                                <div className="flex justify-between items-center w-full ml-2">
                                    <Skeleton width={150} height={20} />
                                    <Skeleton width={70} height={20} />
                                </div>
                            </div>
                            <Skeleton width={400} height={17} className='mt-4' />
                            <div className='border'>
                                <Skeleton width={560} height={450} />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center space-x-2 mt-4">
                                    <Skeleton width={50} height={25} style={{ borderRadius: "30px" }} />
                                    <Skeleton width={50} height={25} style={{ borderRadius: "30px" }} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SkeletonBlog
