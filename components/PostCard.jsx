import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar2Date } from "react-icons/bs";
import moment from "moment";

const PostCard = ({ post }) => {
  console.log(post.node);
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <img
          src={post.node.featuredImage.url}
          alt={post.node.title}
          className='object-top absolute h-80 w-full object-cover shadow-lg lg:rounded-lg'
        />
      </div>
      <h1 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold'>
        <Link href={`/post/${post.node.slug}`}>{post.node.title}</Link>
      </h1>
      <div className='block lg:flex text-center gap-8 mb-4 items-center justify-center '>
        <div className='flex items-center mb-4 lg:mb-0 justify-center'>
          <img
            src={post.node.author.photo.url}
            alt={post.node.author.name}
            height='30px'
            width='30px'
            className='align-middle rounded-full'
          />
          <p className='inline  align-middle text-gray-700 ml-2 text-lg'>
            {post.node.author.name}
          </p>
        </div>
        <div className='font-medium flex justify-center items-center gap-2 text-gray-700'>
          <span>
            <BsCalendar2Date />
          </span>
          <span>{moment(post.node.createdAt).format("MM DD, YYYY")}</span>
        </div>
      </div>
      <p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8'>
        {post.node.excerpt}
      </p>
      <div className='text-center'>
        <Link href={`/post/${post.slug}`}>
          <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
