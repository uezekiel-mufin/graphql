import React, { useState, useEffect, useRef } from "react";

import { submitComment } from "../services";
const Comments = () => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const emailEl = useRef();
  const nameEl = useRef();
  const commentEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
    console.log(nameEl.current.value);
    console.log(emailEl.current.value);
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: email } = emailEl.current;
    const { value: name } = nameEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, storeData };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      console.log("I LOVE JAVASCRIPT");
      setShowSuccessMessage(true);
      console.log(res);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Leave a reply
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700'
          name='comment'
          placeholder='comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          type='text'
          ref={nameEl}
          className='px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700'
          name='name'
          placeholder='name'
        />
        <input
          type='email'
          ref={emailEl}
          className='px-4 py-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700'
          name='email'
          placeholder='email'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            type='checkbox'
            ref={storeDataEl}
            id='storeData'
            name='storeData'
            value='true'
          />
          <label
            className='text-gray-500 ml-2  cursor-pointer'
            htmlFor='storeData'
          >
            Save my email for the next time I comment
          </label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleCommentSubmission}
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className='text-xl float-right font-semibold mt-3 text-green-500'>
            Comment Submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default Comments;
