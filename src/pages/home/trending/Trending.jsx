import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWraper/ContentWraper";
import "./style.scss";
import useFetch from "../../../hooks/UseFetch";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
    const [endPoint, setEndPoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endPoint}`);

    const onTabChange = (tab) => {
        setEndPoint(tab == "Day" ? "day" : "week");
    };
    return (
        <div className="carouselSelection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
                <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;
