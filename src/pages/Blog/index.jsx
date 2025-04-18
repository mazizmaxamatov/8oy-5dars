import axios from 'axios';
import { Eye, Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BiComment } from 'react-icons/bi';

const Blog = () => {
    const api = import.meta.env.VITE_API;
    const token = import.meta.env.VITE_PUBLIC_ACCESS_TOKEN;


    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const url = `${api}user/blog?access_token=${token}&search=`;
            console.log("✅ So‘rov yuborilmoqda:", url);

            try {
                const response = await axios.get(url);
                console.log("📦 API javobi:", response.data);

                if (response.data && response.data.data) {
                    setBlogs(response.data.data);
                    localStorage.setItem('blogs', JSON.stringify(response.data.data));
                } else {
                    setBlogs([]);
                }
            } catch (err) {
                console.error("❌ Xatolik yuz berdi:", err);
                setError('Maʼlumotni olib kelishda xatolik yuz berdi.');

            }
        };

        const storedBlogs = localStorage.getItem('blogs');
        if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs));
        } else {
            fetchData();
        }
    }, []);



    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <div className="max-w-[800px] text-center mx-auto">
                <h1 className='text-[30px] text-[#000000] font-bold mt-[20px]'>My Feed</h1>
                <input className='w-[700px] border hover:border-blue-500 p-[10px] mt-[18px] rounded-md' type="text" placeholder='Search...' />
            </div>

            <div className='grid grid-cols-3 gap-10 mt-10'>
            {blogs.map((blog, index) => (
                <div key={blog.id || index} className="" >

                    <div className="border rounded pt-5">
                        <div className='px-5'>
                        <h1 className='text-xl font-semibold'>{blog.title}</h1>
                        <p className='font-semibold line-clamp-4'>{blog.short_description.slice(0, 200)}...</p>
                        </div>
                        <div className='border-t flex justify-between items-center'>
                        <p className='border-r pl-5 pr-10 py-2  flex items-center gap-2'><Eye size={16} className='text-gray-500'/> {blog.views}</p>
                        <p className=' flex items-center gap-2'><BiComment size={16} className='text-gray-500'/> {blog.reaction_length}</p>
                        <p cl  className='border-l pr-5 pl-10 py-2 flex items-center gap-2'><Heart size={16} className='text-gray-500'/> {blog.__v}</p>
                        </div>
                    </div>

                </div>
            ))}
            </div>
        </div>
    );
};

export default Blog;
