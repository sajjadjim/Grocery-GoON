import { use } from "react";
import { Link, NavLink } from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaHome,
  FaSnowflake,
  FaHandsHelping,
  FaPlusCircle,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";


const Footer = () => {
  const { user } = use(AuthContext);

  const navLinks = (
    <ul className="flex flex-wrap gap-4 ">
      <li>
        <NavLink
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded hover:text-white transition-colors"
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/fridge"
          className="flex items-center gap-2 px-3 py-2 rounded hover:text-white transition-colors"
        >
          <FaSnowflake /> Fridge
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/support"
          className="flex items-center gap-2 px-3 py-2 rounded hover:text-white transition-colors"
        >
          <FaHandsHelping /> Support
        </NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink
              to="/add-food"
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-white transition-colors"
            >
              <FaPlusCircle /> Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/my-foods/${user?.email}`}
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-white transition-colors"
            >
              <FaClipboardList /> My Items
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-white transition-colors"
            >
              <FaSignInAlt /> Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="flex items-center gap-2 px-3 py-2 rounded hover:text-white transition-colors"
            >
              <FaUserPlus /> Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <footer className="bg-[#78C841] text-gray-200 pt-10 mt-10 pb-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-4 items-start">

        <div>
          <Link
            to="/"
            className="flex items-center gap-3 text-white font-extrabold text-2xl mb-3 select-none"
          >
            <img
              src="https://i.ibb.co/bgM4k74g/icons8-shopping-cart-100.png"
              alt="FoodGroceryo"
              className="w-12 h-12 rounded-full shadow-lg"
              loading="lazy"
            />
            Grocery GoON
          </Link>
          <p className="text-gray-300 leading-relaxed text-sm drop-shadow-sm">
            Smartly track expiry dates, reduce food waste, and organize your fridge with Grocery GoON.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xl font-bold mb-4 text-white tracking-wide drop-shadow-md">
            Quick Links
          </h4>
          {navLinks}
        </div>

        <div className="text-right">
          <h4 className="text-xl font-bold mb-4 text-white tracking-wide drop-shadow-md">
            Follow Us
          </h4>
          <div className="flex justify-end gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="btn btn-circle bg-white text-primary shadow-lg hover:bg-indigo-100 hover:text-indigo-900 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="btn btn-circle bg-white text-primary shadow-lg hover:bg-indigo-100 hover:text-indigo-900 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="btn btn-circle bg-white text-primary shadow-lg hover:bg-indigo-100 hover:text-indigo-900 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:support@gardenhub.com"
              aria-label="Email"
              className="btn btn-circle bg-white text-primary shadow-lg hover:bg-indigo-100 hover:text-indigo-900 transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
