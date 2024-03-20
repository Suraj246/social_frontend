import React from 'react'
import { Link } from 'react-scroll'

const PageScroller = () => {
    return (
        <>
            <Link to="top" spy={true} smooth={true} offset={-100} duration={400} >

                <svg xmlns="http://www.w3.org/2000/svg" className='size-8  cursor-pointer' viewBox="0 0 512 512"><path fill="#74C0FC" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z" />
                </svg>
            </Link>
        </>
    )
}

export default PageScroller
