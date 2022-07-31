import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "../services";
import { comment } from "postcss";

const CommentsForm = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);
  return (
    <>
      {comment.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length}
            {""}
            Comments
          </h3>
          {comments.map((comment) => (
            <div
              className='border-b border-gray-100 mb-4 pb-4 '
              key={comment.createdAt}
            >
              <p className='mb-4'>
                <span className='font-semibold'>{comment.name}</span>
                {""}
                on
                {""}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentsForm;
