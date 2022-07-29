import React from "react";
import moment from "moment";
import { BsCalendar2Date } from "react-icons/bs";

const PostDetails = ({ post }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md mb-6'>
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className='object-top h-full w-full rounded-t-lg'
        />
      </div>
      <div className='px-4 lg:px-0'>
        <div className='flex  items-center mb-8 gap-4 lg:justify-between w-full'>
          <div className='flex items-center lg:mb-4mb-0 justify-center'>
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              height='30px'
              width='30px'
              className='align-middle rounded-full'
            />
            <p className='inline  align-middle text-gray-700 ml-2 text-lg'>
              {post.author.name}
            </p>
          </div>
          <div className='font-medium flex justify-center items-center gap-2 text-gray-700'>
            <span>
              <BsCalendar2Date />
            </span>
            <span>{moment(post.createdAt).format("MM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>
        {console.log(post.content.raw.children)}
      </div>
    </div>
  );
};

export default PostDetails;
