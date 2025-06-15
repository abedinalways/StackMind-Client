import axios from 'axios';
import React, { useEffect, useState } from 'react';
import lottie from '../assets/lottie.json'
import Lottie from 'lottie-react';
const StarPerson = () => {
  const [person, setPerson] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3000/api/starPerson').then(res => {
      setPerson(res.data)
    })
  }, [])
  if(!person) return <span className="loading loading-ball loading-xs"></span>;
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 md:px-10 py-10 relative">
      <div className="flex flex-col md:flex-row items-start gap-6 border-l-5 border-orange-400 pl-4 my-12 mx-20">
        <img
          referrerPolicy="no-referrer"
          src={person.photoURL}
          alt={person.name}
          className="md:w-45 md:h-30 w-25 rounded-xl border-4 cursor-pointer rotate-[-25deg] hover:rotate-0 transition-transform duration-300 border-red-400 shadow-md"
        />
        <div>
          <p className="font-[suse] text-4xl font-bold tracking-widest text-gray-500">
            PERSON OF THE MOMENT
          </p>
          <h1 className="font-[sora] text-sm ml-2 mt-2 font-semibold text-[#00de56]">
            {person.name}
          </h1>
          <p className="text-xs text-gray-600 mt-4 font-bold md:w-3/5 font-[Mulish]">
            {person.bio}
          </p>
        </div>
      </div>
      <div className="absolute md:mr-30 md:block w-full lg:w-[300px]">
        <Lottie
          animationData={lottie}
          loop={true}
          autoplay
          className="w-full"
        ></Lottie>
      </div>
    </div>
  );
};

export default StarPerson;