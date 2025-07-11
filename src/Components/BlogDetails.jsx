import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { TbArrowBadgeRight } from 'react-icons/tb';
import { BiSolidCategory } from 'react-icons/bi';
import UseAuth from '../Hooks/UseAuth';
import toast from 'react-hot-toast';
import useAxios from '../Hooks/useAxios';

const BlogDetails = () => {
  const blog = useLoaderData();
  const { id } = useParams();
  const { user } = UseAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const { get, post } = useAxios();

  const formattedDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };

  const isAuthor = user?.email === blog?.email;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await get(`/comments?blogId=${id}`);
        setComments(res);
      } catch (error) {
        toast.error('Failed to load comments');
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [id, get]);

  const handleComment = async () => {
    if (!user) {
      toast.error('Please login to comment.');
      return;
    }

    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    setSubmittingComment(true);
    const commentData = {
      blogId: id,
      text: commentText,
      userName: user?.displayName || 'Anonymous',
      userPhoto: user?.photoURL || '',
      userEmail: user?.email || '',
    };

    try {
      await post('/comments', commentData);
      const res = await get(`/comments?blogId=${id}`);
      setComments(res);
      setCommentText('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatLongDescription = text => {
    const sentences = text.split(/([.!?])\s(?=[A-Z])/).filter(s => s.trim());
    const chunks = [];
    for (let i = 0; i < sentences.length; i += 4) {
      chunks.push(sentences.slice(i, i + 4).join(' '));
    }
    return (
      <div className="text-gray-600 text-md leading-relaxed space-y-4">
        {chunks.map((chunk, index) => (
          <p key={index}>{chunk}</p>
        ))}
      </div>
    );
  };

  if (!blog)
    return (
      <p className="text-center text-red-500">
        Blog not found or access denied.
      </p>
    );

  return (
    <div className="bg-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 mx-auto md:px-20 px-10">
      <div className="p-4 flex flex-col justify-between font-[sora] text-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm text-gray-500 flex items-center justify-between gap-10">
            <p className="font-semibold text-red-950 underline">
              {blog.name} / {formattedDate()} / {comments.length} comment
            </p>
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 mb-4">
          {blog.title}
        </h2>
        <span className="px-2 py-1 bg-gray-400 text-purple-100 flex items-center text-sm font-semibold rounded mb-2 gap-2 w-40">
          <BiSolidCategory /> {blog.category}
        </span>
        <div className="md:flex items-center justify-around mb-4 md:gap-40">
          <p className="text-gray-600 text-md mb-4">
            <span className="text-red-950 font-bold text-lg flex items-center">
              Quick Summary <TbArrowBadgeRight size="20px" />{' '}
            </span>{' '}
            {blog.shortDescription}
          </p>
          <div>
            <motion.img
              initial={{ rotate: -15 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              src={blog.photoURL || '/default-avatar.png'}
              referrerPolicy="no-referrer"
              className="w-30 h-30 rounded-xl object-cover mr-10 cursor-pointer rotate-[-15deg] hover:rotate-0 transition-transform duration-300"
            />
            <div className="text-sm text-gray-500">
              <h3 className="mt-2 text-red-950 font-bold font-[suse]">
                About this Author
              </h3>
              <p className="text-gray-600 text-xs w-2/3">
                {blog.name} writes about simplifying the overly complex world of
                front-end development using vanilla JavaScript and CSS. He is
                currently a software engineer at ASTHA IT.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-yellow-300 pt-4 text-sm"></div>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-[70%] rounded-lg mb-4"
        />
        <div className="text-gray-600 text-md w-5/6 leading-relaxed mb-6">
          {formatLongDescription(blog.longDescription)}
        </div>
      </div>

      {isAuthor && (
        <Link
          to={`/updateBlog/${id}`}
          className="mb-4 bg-green-500 hover:bg-green-700 inline-block px-4 py-2 rounded text-purple-100 font-bold transition-colors duration-300 font-[lora]"
        >
          Update Blog
        </Link>
      )}

      <div className="border-t pt-6 mt-6">
        <h2 className="text-2xl font-bold text-[#00d493] mb-4 font-[Suse]">
          LEAVE A COMMENT
        </h2>

        {!user ? (
          <p className="text-sm text-blue-600 font-semibold">
            Please{' '}
            <Link to="/login" className="underline">
              log in
            </Link>{' '}
            to leave a comment.
          </p>
        ) : isAuthor ? (
          <p className="text-sm text-red-400">
            You cannot comment on your own blog.
          </p>
        ) : (
          <>
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="w-full p-3 rounded bg-white shadow-md text-black mb-2 resize-none"
              placeholder="Add your comment..."
              rows={3}
              disabled={submittingComment}
            />
            <button
              onClick={handleComment}
              className="bg-[#00d493] font-bold text-lg text-white px-4 py-2 rounded-md"
              disabled={submittingComment}
            >
              {submittingComment ? 'Submitting...' : 'Post Comment'}
            </button>
          </>
        )}

        <div className="mt-6 space-y-4 font-[Mulish]">
          {loadingComments ? (
            <p className="text-center">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500">No comments yet.</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="flex items-start gap-3">
                <img
                  src={comment.userPhoto || '/default-avatar.png'}
                  className="w-8 h-8 rounded-full"
                  alt={comment.userName}
                />
                <div>
                  <p className="text-xs font-semibold text-purple-600">
                    {comment.userName || 'Anonymous'}
                  </p>
                  <p className="text-md font-bold text-red-950 mb-4">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
