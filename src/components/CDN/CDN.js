import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "./CDN.css";

import LibraryList from "./LibraryList";
import FindPackage from "./FindPackage";

const CDN = (props) => {

    const [libraries, setLibrary] = useState([]);
    const [title, setTile] = React.useState();
    const [pkg, setPkg] = useState();

    const [spinnerLoading, setSpinnerLoading] = useState(true);

    // component load lifecycle for title
    useEffect(() => {
        setTile(props.data.title);
        document.title = title;
    }, [title]);

    // style
    // const grayStyle = {
    //     fontSize: '12px',
    //     color: '#555555'
    // }

    // life cycle for set libraries
    useEffect(() => {

        // sample response has been trimmed to remove items in the results array.
        // https://api.cdnjs.com/libraries?search=vue&fields=filename,description,version,github&limit=3

        // https://api.cdnjs.com/libraries?search=jquery

        // https://api.cdnjs.com/libraries/vue?fields=name,author,description,filename,sri,version,repository,autoupdate

        // https://api.cdnjs.com/libraries/jquery?fields=assets,versions

        // https://api.cdnjs.com/libraries/jquery/3.5.1

        // https://api.cdnjs.com/libraries/vue/2.6.11?fields=files,sri

        // https://api.cdnjs.com/libraries/vue/tutorials

        // https://api.cdnjs.com/libraries/backbone.js/tutorials?fields=name,modified

        // https://api.cdnjs.com/libraries/vue/tutorials/wtf-is-vuex


        fetch("https://api.cdnjs.com/libraries/?limit=10")
            .then(response => response.json())
            .then(data => {
                console.log(' data ', data);
                setLibrary(data.results);
                setSpinnerLoading(false);
            });
    }, []);


    const findPackageHandler = (searchInput) => {
        setSpinnerLoading(true);
        fetch(`https://api.cdnjs.com/libraries?search=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(' data package', data);
            setPkg(data.results);
            setSpinnerLoading(false);
        });
    }

    const loadLibraryDOM = () => {
        if (spinnerLoading) {
            return (
                <section className="custom-loader">
                    <Loader
                        type="BallTriangle"
                        color="#00BFFF"
                        height={200}
                        width={200}
                        className="loader"
                    />
                </section>
            )
        } else {
            return (
                <section className="">
                    <h3>Libraries</h3>
                    <LibraryList libraries={libraries} />

                </section>

            )
        }
    }

    return (
        <section className="cdn-wrapper">
            <h1>CDN Hub</h1>
            <section className="search-package-wrapper">
                <FindPackage
                    findPackageHandler={findPackageHandler}
                    spinnerLoading={spinnerLoading}
                    pkg={pkg} />

            </section>
            {loadLibraryDOM()}

        </section >
    )
}

export default CDN;