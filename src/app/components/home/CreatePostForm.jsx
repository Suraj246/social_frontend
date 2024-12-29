import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allPostApi, createPostApi, storePostIdApi } from '../../redux/slices/postsSlice'

const CreatePostForm = () => {
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {}

    const createPost = async () => {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("content", content)
        formData.append("userId", user?.userId)
        // if (!image || !content) {
        //     return false
        // }
        await dispatch(createPostApi({ formData }))
            .then((res) => {
                if (res) {
                    console.log(res?.payload?.new_post?._id)
                    dispatch(allPostApi())
                    dispatch(storePostIdApi(res?.payload?.new_post?._id))
                    setContent("")
                    setImage("")
                }
            })

    }

    // useEffect(() => {
    //     dispatch(allPostApi())
    // }, [dispatch])

    return (
        <div className="p-4">
            <textarea className="w-full h-32 text-gray-800 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Write your post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="flex items-center mt-4">
                <input type="file" className="hidden" id="postImage"
                    onChange={(e) => setImage(e.target.files[0])}


                />
                <label htmlFor="postImage" className="bg-indigo-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-600 transition duration-300 cursor-pointer">
                    Upload Image
                </label>
                <span className='text-sm text-center ml-2'>{image?.name}</span>
            </div>
            <div className="flex justify-end mt-4">
                <button className="bg-indigo-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-indigo-600 transition duration-300"
                    onClick={createPost}
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default CreatePostForm
