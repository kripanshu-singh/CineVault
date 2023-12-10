import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWraper/ContentWraper";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopUp/VideoPopUp";
import Img from "../../../components/lazyLoad/Img";
import Carousel from "../../../components/carousel/Carousel";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        <div className="videos">
                            {data?.results?.map((item) => (
                                <div
                                    className="videoItem"
                                    key={item.id}
                                    onClick={() => {
                                        setVideoId(item.key);
                                        setShow(true);
                                    }}
                                >
                                    <div className="videoThumbnail">
                                        <Img
                                            src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                                        />
                                        <PlayIcon />
                                    </div>
                                    <div className="videoTitle">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
