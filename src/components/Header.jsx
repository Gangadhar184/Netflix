import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../constants/constants.js';
import { changeLanguage } from '../utils/configSlice.js';
import { Menu, X } from 'lucide-react';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);


    const handleSignOut = () => {
        signOut(auth).catch(() => {
            navigate("/error");
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleGPTSearchClick = () => {
        dispatch(toggleGPTSearchView());
        setIsMenuOpen(false); // close on navigation
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <div className='w-full z-50'>
            <div className='container mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6 flex flex-wrap items-center justify-between absolute z-50  bg-gradient-to-b from-black'>
                {/* Logo */}
                <Link to="/" className='w-24 md:w-32'>
                    {/* SVG logo here */}
                    <svg className='fill-red-600 w-full' viewBox="0 0 111 30" xmlns="http://www.w3.org/2000/svg">
                        <g><path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path></g>
                    </svg>
                </Link>

                {/* Hamburger for mobile */}
                <button onClick={toggleMenu} className='md:hidden text-white'>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menu */}
                <div className={`absolute md:static top-full left-0 w-full md:w-auto bg-black md:bg-transparent flex-col md:flex-row md:flex items-center gap-4 transition-all duration-300 z-40 ${isMenuOpen ? "flex" : "hidden"}`}>
                    {user && (
                        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center p-4 md:p-0">
                            {showGptSearch && (
                                <select className='bg-gray-700 text-white rounded p-2' onChange={handleLanguageChange}>
                                    {SUPPORTED_LANGUAGES.map((lang) => (
                                        <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                                    ))}
                                </select>
                            )}
                            <button
                                onClick={handleGPTSearchClick}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {showGptSearch ? "Home Page" : "GPT Search"}
                            </button>
                            {user.photoURL && (
                                <div className="flex flex-col items-center">
                                    <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border-2 border-red-600" />
                                    {user.displayName && (
                                        <span className="text-xs text-gray-300 mt-1 text-center max-w-[80px] truncate">
                                            {user.displayName}
                                        </span>
                                    )}
                                </div>
                            )}
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;



