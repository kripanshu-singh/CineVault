import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWraper/ContentWraper";
import logo from "../../assets/try.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => window.scrollTo(0, 0), [location]);
    const controlNavBar = () => {
        if (window.scrollY > 300) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };
    useEffect(() => {
        window.addEventListener("scroll", controlNavBar);
        return () => {
            window.removeEventListener("scroll", controlNavBar);
        };
    }, [lastScrollY]);
    const searchQuerryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
                setQuery("");
            }, 1000);
        }
    };
    const navigateHandler = (type) => {
        type == "movie" ? navigate("/explore/movie") : navigate("/explore/tv");
        setMobileMenu(false);
    };
    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show} `}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => navigateHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigateHandler("tv")}
                    >
                        TV Shows
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Search for movie or series ..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQuerryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
