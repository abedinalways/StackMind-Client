import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ImBlog } from 'react-icons/im';
import UseAuth from '../Hooks/UseAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxios from '../Hooks/useAxios';

const UpdateBlog = () => {
  const { user } = UseAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const { get, patch} = useAxios();

  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await get(`http://localhost:3000/allBlogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        
        console.error('Error fetching blog:', err);
      }
    };
    fetchBlog();
  }, [id, get]);

 
  if (blog && user?.email !== blog.email) {
    toast.error('You are not authorized to edit this blog');
    navigate('/blogs');
    return null;
  }

  
  const handleUpdateBlog = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const updatedBlog = {
      title: form.title.value,
      image: form.image.value,
      category: form.category.value,
      shortDescription: form.shortDescription.value,
      longDescription: form.longDescription.value,
      name: form.name.value,
      email: form.email.value,
      photoURL: form.photoURL.value,
    };

    try {
      const res = await patch(
        `http://localhost:3000/allBlogs/${id}?email=${user?.email}`,
        updatedBlog
      );
      if (res.data.message === 'Blog updated successfully') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Blog updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/allBlogs/${id}`);
      }
    } catch (err) {
      
      console.error('Error updating blog:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <>
      <span className="flex justify-center gap-2 mb-2 py-4 font-[Suse] dark:text-blue-600">
        <h2 className="text-4xl text-orange-500 font-bold font-[Suse] dark:text-blue-600">
          Update Blog
        </h2>
        <h2 className="text-2xl text-orange-500 font-bold">
          <ImBlog />
        </h2>
      </span>
      <form
        onSubmit={handleUpdateBlog}
        className="fieldset bg-white text-blue-600 border-base-300 rounded-box w-xs border p-4 font-[suse] mt-2 mb-2 shadow-md mx-auto"
      >
        <label className="label font-bold">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={blog.title}
          className="input bg-white border-amber-300 text-black"
          placeholder="Blog Title"
          required
        />
        <label className="label font-bold">Image</label>
        <input
          type="text"
          name="image"
          defaultValue={blog.image}
          className="input bg-white border-amber-300 text-black"
          placeholder="Image URL"
        />
        <label className="label font-bold">Category</label>
        <select
          name="category"
          defaultValue={blog.category}
          required
          className="select select-primary rounded bg-white border-amber-300 text-black outline-blue-500"
        >
          <option disabled value="">
            Select a category
          </option>
          <option value="animation">Animation</option>
          <option value="accessibility">Accessibility</option>
          <option value="ux">UX</option>
          <option value="css">CSS</option>
          <option value="javascript">JavaScript</option>
          <option value="web-design">Web Design</option>
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="figma">Figma</option>
          <option value="round-ups">Round-Ups</option>
          <option value="workflow">Workflow</option>
          <option value="tools">Tools</option>
          <option value="tutorials">Tutorials</option>
          <option value="guides">Guides</option>
          <option value="performance">Performance</option>
          <option value="freebies">Freebies</option>
        </select>
        <label className="label font-bold">Short Description</label>
        <textarea
          name="shortDescription"
          defaultValue={blog.shortDescription}
          required
          className="textarea textarea-xs bg-white border-amber-300 text-black"
          placeholder="Write a short description"
        ></textarea>
        <label className="label font-bold">Long Description</label>
        <textarea
          name="longDescription"
          defaultValue={blog.longDescription}
          required
          className="textarea textarea-xl bg-white border-amber-300 text-black"
          placeholder="Write a long description"
        ></textarea>
        <label className="label font-bold">Author</label>
        <input
          type="text"
          name="name"
          value={user?.displayName || ''}
          className="input bg-white border-amber-300 text-black"
          readOnly
        />
        <label className="label font-bold">Email</label>
        <input
          type="email"
          name="email"
          value={user?.email || ''}
          className="input bg-white border-amber-300 text-black"
          readOnly
        />
        <label className="label font-bold">Profile Picture</label>
        <input
          type="text"
          name="photoURL"
          value={user?.photoURL || ''}
          className="input bg-white border-amber-300 text-black"
          readOnly
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer mb-2 mt-2"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </>
  );
};

export default UpdateBlog;
