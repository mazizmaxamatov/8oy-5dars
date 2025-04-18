"use client";

import Auth from "../Auth";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, LogIn } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setIsLogged(!!storedUser);
  }, [isLogged]);

  return (
    <nav className="w-full z-50 bg-white">
      <div className="flex justify-between items-center max-w-[1240px] mx-auto py-5">
        <Link to="/">
          <img src="/images/logo.svg" alt="logo" width={150} height={35} />
        </Link>
        <ul className="flex gap-8 font-size-[24px] text-lg text-gray-700">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
        <div className="flex items-center gap-6">


          <div className="flex items-center gap-6">
            {/* Search icon */}
            <button className="hover:text-[#46A358] transition-all">
              <Search size={24} />
            </button>

            {/* Heart icon */}
            <button
            onClick={() => navigate("/profile/wishlist")}
            className="hover:text-[#46A358] transition-all">
              <Heart size={24} />
            </button>

            {/* ShoppingCart icon */}
            <button
              onClick={() => navigate("/shoppingcart")}
              className="hover:text-[#46A358] transition-all"
              
            >
              <ShoppingCart size={24} />
            </button>
          </div>


          {isLogged ? (
            <button onClick={() => router("/profile/account")} className="bg-[#46A358] hover:bg-[#46A358] px-6 py-1.5 text-lg rounded text-white flex items-center gap-2">
              {user?.user?.name || "User"}
            </button>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="bg-[#46A358] font-semibold hover:bg-[#46A358] text-base  px-4 py-2 rounded-md text-white flex items-center gap-2">
              <LogIn size={18} /> Login
            </button>
          )}
        </div>
      </div>
      <hr className="max-w-[1280px] mx-auto bg-[#46A35880] border-none h-[1px]" />
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <div className="flex justify-center items-center gap-3 text-xl backdrop-blur-sm font-semibold my-4">
          {["Login", "Register"].map((text, i) => (
            <button key={text} onClick={() => setIsLoginOpen(i === 0)} className={isLoginOpen === (i === 0) ? "text-[#46A358]" : ""}>
              {text}
            </button>
          ))}
        </div>
        <Auth isLoginOpen={isLoginOpen} isRegisterOpen={!isLoginOpen} setIsModalOpen={setIsModalOpen} setIsLogged={setIsLogged} />
      </Modal>
    </nav>
  );
}







  {/* {[Search, Heart, ShoppingCart].map((Icon, i) => {
            const linkPaths = ["/search", "/favorites", "/cart"]; 
            return (
              <Link key={i} to={linkPaths[i]} className="hover:text-[#46A358] transition-all">
                <Icon size={24} />
              </Link>
            );
          })} */}
          {/* {[Search, Heart, ShoppingCart].map((Icon, i) => (
            <button key={i} className="hover:text-[#46A358] transition-all">
              <Icon size={24} />
            </button>
          ))} */}