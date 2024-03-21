"use client"
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./home.css"
import Link from 'next/link'
import Image from 'next/image'
import LikeButton from './LikeButton'
import MessageButton from './MessageButton'
import SkeletonBlog from './skeletons/skeletonBlog'
import CreatePostForm from './CreatePostForm'
import { allPostApi, commentPostApi, createCommentPostApi } from '../../redux/slices/postsSlice'
import { API } from '../../API'
import { useRouter } from 'next/navigation'
import PageScroller from './PageScroller'
import { selectInputValue } from '../../redux/slices/inputSearchSlice'

const BlogSection = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1);
    const [postId, setPostId] = useState('')
    const [comment, setComment] = useState('')

    const inputValue = useSelector(selectInputValue)
    const selector = useSelector(state => state.postsData)
    const { postsData, error, status } = selector

    if (postsData?.length >= 0) {
        var allPosts = [...postsData]
        var lastPost = allPosts.pop()
        allPosts.unshift(lastPost)
    }

    useEffect(() => {
        dispatch(allPostApi())
    }, [dispatch])

    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}


    useEffect(() => {
        if (!localStorage.getItem("user")) {
            // if (user.token === '') {
            router.push("/login")
        }
    }, [user, router])

    const sendCommentPost = () => {
        dispatch(createCommentPostApi(comment))
            .then((res) => {
                dispatch(commentPostApi({ commentId: res.payload.newComment._id, postId }))
            })
        setComment('')
    }

    return (
        <div className="fullscreen grid grid-cols-1  gap-8 ">
            <div className=" bg-white shadow-md rounded-lg overflow-hidden">
                <CreatePostForm />
            </div>
            {
                status === "loading" ?
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center py-2 px-4 text-white font-medium rounded-md transition duration-300">
                        <svg className="mr-3 h-10 w-10 animate-spin text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </button>
                    :
                    error ? <span>something went wrong</span> :
                        <>
                            {allPosts?.filter((elem) => {
                                if (inputValue === elem?.user?.username) {
                                    return true;
                                } else if (elem?.user?.username && elem?.user?.username.toLowerCase().includes(inputValue)) {
                                    return true;
                                }
                                return false;
                            })

                                .map((post, idx) => {
                                    const isMessageOpen = selectedPostIndex === idx

                                    return (

                                        <div className="bg-white shadow-md rounded-lg overflow-hidden" key={idx}>
                                            <Link href={`/userpersonalscreen/${post?.user?._id}`} className="flex items-center p-4">
                                                <Image src={post?.user?.image ? `${API}/uploads/${post?.user?.image}` : ""} alt="User" width={100} height={100} className="w-8 h-8 rounded-full" loading="lazy" />
                                                <div className="flex justify-between items-center w-full ml-2">
                                                    <span className="text-gray-800 font-semibold">{post?.user?.username}</span>
                                                    <span className="text-gray-500 text-sm">{post?.user?.createdAt.slice(0, 10)}</span>
                                                </div>
                                            </Link>
                                            <div className="p-4">
                                                <p className="text-gray-600 p-1">{post?.content}</p>
                                                {post?.image === "no image" ? '' :
                                                    <Image src={post?.image ? `${API}/uploads/${post?.image}` : ""} alt="Post" className="w-full h-50 object-cover" loading="lazy" width={700} height={700} />

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
                                                                            <span className="text-xs text-gray-800">{elem?.createdAt?.slice(0, 10)}</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                        </>
            }

        </div>
    )
}

export default BlogSection
