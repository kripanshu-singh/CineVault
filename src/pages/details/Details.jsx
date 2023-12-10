import React from "react";

import "./style.scss";
import useFetch from "../../hooks/UseFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailBanner/DetailBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recomendation";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditLoding } = useFetch(
        `/${mediaType}/${id}/credits`
    );
    return (
        <>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />;
            <Cast data={credits?.cast} loading={creditLoding} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </>
    );
};

export default Details;
