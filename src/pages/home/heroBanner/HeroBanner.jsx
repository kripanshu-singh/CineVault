import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import Img from "../../../components/lazyLoad/Img";
import ContentWrapper from "../../../components/contentWraper/ContentWraper";

const HeroBanner = () => {
    const navigate = useNavigate();
    const [backGround, setBackGround] = useState("");
    const [querry, setQuerry] = useState("");
    const { data, loading } = useFetch("/trending/all/day");

    const searchQuerryHandler = (e) => {
        if ((e.key === "Enter" || e.type === "click") && querry.length > 0) {
            navigate(`/search/${querry}`);
        }
    };

    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        const bg =
            url?.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackGround(bg);
    }, [data, url]);
    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backDropImg">
                    <Img src={backGround} />
                </div>
            )}


            
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">
                        Endless Entertainment Awaits! Dive into a World of
                        Movies and TV Shows. Explore now ...
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Search for movie or series ..."
                            value={querry}
                            onChange={(e) => setQuerry(e.target.value)}
                            onKeyUp={searchQuerryHandler}
                        />
                        <button onClick={searchQuerryHandler}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
