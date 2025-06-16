import React, { useState } from 'react';
import { ImBlog } from 'react-icons/im';
import UseAuth from '../Hooks/UseAuth';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxios from '../Hooks/useAxios';

const AddBlog = () => {
  const { user } = UseAuth();
  const [loading, setLoading]=useState(false);
  const { post } = useAxios();
  
  const handleAddBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const category = form.category.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const blog = {
      title,
      image,
      category,
      shortDescription,
      longDescription,
      name,
      email,
      photoURL,
    };

    try {
      const res = await post('/blogs', blog);
      if (res.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Blog has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    } catch (error) {
      
      if (!error.response || error.response.status !== 401) {
        toast.error('Failed to add blog. Please try again.');
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <span className="flex justify-center gap-2 mb-2 py-4  font-[Suse] dark:text-blue-600">
        <h2 className="text-4xl text-orange-500 font-bold  font-[Suse] dark:text-blue-600">
          Post a Blog
        </h2>
        <h2 className="text-2xl text-orange-500 font-bold">
          <ImBlog />
        </h2>
      </span>
      <form 
      onSubmit={handleAddBlog}
      className="fieldset bg-white text-blue-600 border-base-300 rounded-box w-xs border p-4 font-[suse] mt-2 mb-2 shadow-md mx-auto">
        <label className="label font-bold">Title</label>
        <input
          type="text"
          name="title"
          className="input bg-white border-amber-300 text-black"
          placeholder="Blog Title"
          required
        />
        <label className="label font-bold">Image</label>
        <input
          type="text"
          name="image"
          className="input bg-white border-amber-300 text-black"
          placeholder="image URL"
        />
        <label className="label font-bold">Category</label>
        <select
          defaultValue=""
          name="category"
          required
          className="select select-primary rounded bg-white border-amber-300 text-black  outline-blue-500"
        >
          <option disabled value=''>select a category</option>
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
          placeholder="write a short description"
          name="shortDescription"
          required
          className="textarea textarea-xs bg-white border-amber-300 text-black"
        ></textarea>
        <label className="label font-bold">Long Description</label>
        <textarea
          placeholder="write a long description"
          name='longDescription'
          required
          className="textarea textarea-xl bg-white border-amber-300 text-black"
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
          className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer mb-2 mt-2"
        >
          {loading?'submitting...':'Add Blog'}
        </button>
      </form>
    </>
  );
};

export default AddBlog;