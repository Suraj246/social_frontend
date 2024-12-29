import React, { useEffect, useState } from 'react'
import { API } from '../../API'
import Image from 'next/image'
import Link from 'next/link'
import LikeButton from '../home/LikeButton'
import MessageButton from '../home/MessageButton'
import { allPostApi, commentPostApi, createCommentPostApi } from '../../redux/slices/postsSlice'
import { useDispatch } from "react-redux";

const UserScreenUploadedFiles = ({ post, handleDelete, user, id, idx }) => {
    const dispatch = useDispatch()
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    const [postId, setPostId] = useState('')
    const [comment, setComment] = useState('')
    const isMessageOpen = selectedPostIndex === idx

    useEffect(() => {
        dispatch(allPostApi())
    }, [dispatch])

    const sendCommentPost = () => {
        dispatch(createCommentPostApi(comment))
            .then((res) => {
                dispatch(commentPostApi({ commentId: res.payload.newComment._id, postId }))
                dispatch(allPostApi())
            })
        setComment('')
    }
    return (
        <>
            <div className="bg-white shadow-md rounded-lg w-full">
                <div className="p-2">
                    <div className='flex justify-end p-2'>
                        {
                            user?.userId === id &&
                            <svg onClick={() => handleDelete(idx, post?._id)} xmlns="http://www.w3.org/2000/svg" className='size-5 cursor-pointer' viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        }
                    </div>
                    <div className='flex gap-2 justify-between'>
                        <p className="text-sm text-gray-600 p-1">{post?.content}</p>
                        <p className="text-sm text-gray-600 p-1">{post?.createdAt.slice(0, 10)}</p>

                    </div>
                    {post?.image === "no image" ? '' :
                        <Image src={post?.image ? `${API}/uploads/${post?.image}` : ""} alt="Post" className="w-full h-64 object-cover" loading="lazy" width={700} height={700} />

                    }
                    <div className="flex items-center space-x-2 mt-4">
                        <LikeButton post={post} />
                        <MessageButton post={post} idx={idx} setSelectedPostIndex={setSelectedPostIndex} setPostId={setPostId} isMessageOpen={isMessageOpen} />
                    </div>

                    {isMessageOpen &&
                        <div className="mt-4">
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="capitalize text-xs w-full h-8 text-gray-800 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                    onClick={sendCommentPost}
                                    type="submit" className="bg-indigo-500 text-white py-2 px-2 rounded-md text-xs font-medium hover:bg-indigo-600 transition duration-300">
                                    Submit
                                </button>
                            </div>

                            {
                                post?.comments?.map((elem, id) => {
                                    return (
                                        <div className="grid mt-4" key={id}>
                                            <Link href={`/userpersonalscreen/${elem?.users?._id}`} className="flex items-start gap-2">
                                                <Image src={elem?.users?.image ? `${API}/uploads/${elem?.users?.image}` : ""} width={100} height={100} alt="User" className="w-6 h-6 rounded-full object-cover " />
                                                <span className="text-sm text-gray-800">{elem?.users?.username}</span>
                                            </Link>
                                            <div className="flex items-center justify-between">
                                                <span className="ml-8 text-sm text-gray-500">{elem?.title}</span>
                                                <span className="text-xs text-gray-800">{elem?.createdAt.slice(0, 10)}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default UserScreenUploadedFiles
