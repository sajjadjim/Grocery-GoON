import { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router";
import { FaHome, FaAppleAlt, FaLifeRing, FaPlus, FaList, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded hover:bg-base-300 transition ${
      isActive ? "text-white font-semibold" : "text-black"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkClass}>
        <FaHome /> Home
      </NavLink>
      <NavLink to="/fridge" className={linkClass}>
        <FaAppleAlt /> Fridge
      </NavLink>
      <NavLink to="/support" className={linkClass}>
        <FaLifeRing /> Support
      </NavLink>

      {user ? (
        <>
          <NavLink to="/add-food" className={linkClass}>
            <FaPlus /> Add Food
          </NavLink>
          <NavLink to={`/my-foods/${user?.email}`} className={linkClass}>
            <FaList /> My Items
          </NavLink>
          <div className="flex items-center gap-2">
            <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
              <img
                src={user?.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
            </div>
            <button onClick={handleLogout} className="btn btn-sm bg-white text-primary">
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/login" className="btn btn-sm bg-white text-primary flex items-center gap-1">
            <FaSignInAlt /> Login
          </NavLink>
          <NavLink to="/register" className="btn btn-sm bg-white text-primary flex items-center gap-1">
            <FaUserPlus /> Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-xl font-bold text-white flex justify-center items-center gap-2"
        >
          <img
            src="https://img.icons8.com/?size=100&id=9150kZKYypO8&format=png&color=000000"
            alt="logo"
            className="w-10 h-10"
          />
          <span>Grocery GoON</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">{navLinks}</nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="btn btn-ghost text-xl text-white">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2 bg-base-100 p-3 rounded shadow-md">
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
