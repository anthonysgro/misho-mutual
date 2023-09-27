import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./header/header";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => setLoading(false));
    return (
        <React.Fragment>
            Hello, world!
            {/* <Header /> */}
            {/* <main className="listing-main">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </main> */}
        </React.Fragment>
    );
};

export default App;
