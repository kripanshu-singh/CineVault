import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchDataApi from "../../utils/api";
import ContentWrapper from "../../components/contentWraper/ContentWraper";
import noResult from "../../assets/no-results.png";
// import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();
    const fetchInitalState = () => {
        setLoading(true);
        fetchDataApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };
    useEffect(() => {
        setPageNum(1);
        fetchInitalState();
    }, [query]);
    const fetchNextPageData = () => {
        fetchDataApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };
    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data.total_results > 1
                                        ? "results"
                                        : "result"
                                } of ${query}`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results.length || 0} // Ensure it's a number
                                next={fetchNextPageData}
                                hasMore={pageNum < data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") {
                                        return null; // Skip rendering for persons
                                    } else {
                                        return (
                                            <MovieCard
                                                key={index}
                                                data={item}
                                                fromSearch={true}
                                            />
                                        );
                                    }
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
