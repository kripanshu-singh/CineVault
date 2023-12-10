import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWraper/ContentWraper";
import "./style.scss";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/UseFetch";

const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie");

    const { data, loading } = useFetch(`/${endPoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndPoint(tab == "Movies" ? "movie" : "tv");
    };
    return (
        <div className="carouselSelection">
            <ContentWrapper>
                <span className="carouselTitle">Top-Rated</span>
                <SwitchTab
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endPoint={endPoint}
            />
        </div>
    );
};

export default TopRated;
