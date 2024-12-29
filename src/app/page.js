"use client"
import UserSection from './components/home/UserSection'
import BlogSection from './components/home/BlogSection'
import FriendsLIst from './components/home/FriendsLIst'
import PageScroller from './components/home/PageScroller';

export default function Home() {
  return (
    <main className="flex  md:gap-4 justify-center py-8  sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-white">
      {/* <main className="flex flex-wrap gap-4 justify-center mx-auto py-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-white md:flex-wrap"> */}
      <div className=" page-user ">
        {/* <div className=" page-user sticky"> */}
        <UserSection />
        <BlogSection />
      </div>

      <div className="page-friend-list">
        {/* <div className="page-friend-list sticky"> */}
        <div className=''>
          <FriendsLIst />
        </div>
        <div className='hidden md:flex justify-end '>
          <PageScroller />
        </div>
      </div>

    </main>
  );
}


