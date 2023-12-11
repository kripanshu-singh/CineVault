import { useEffect, useState } from "react";
import fetchDataApi from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getgenres } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () =>
        fetchDataApi("/configuration").then((response) => {
            const url = {
                backdrop: response.images.base_url + "original",
                poster: response.images.base_url + "original",
                profile: response.images.base_url + "original",
            };
            dispatch(getApiConfiguration(url));
            // console.log("fetchDataApi ~ response :- ", response);
        });

    // console.log(url?.total_pages);
    const genresCall = async () => {
        let promises = [];
        let endPoints = ["movie", "tv"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataApi(`/genre/${url}/list`));
        });
        const data = await Promise.all(promises);
        // console.log("genresCall ~ data :- ", data);

        data?.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });
        dispatch(getgenres(allGenres));
    };
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:mediaType/:id" element={<Details />} />
                    <Route path="/search/:query" element={<SearchResult />} />
                    <Route path="/explore/:mediaType" element={<Explore />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
                <SpeedInsights />
                <Analytics />
            </BrowserRouter>
        </>
    );
}

export default App;
