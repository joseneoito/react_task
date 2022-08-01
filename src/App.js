import React, { Suspense } from "react";
import { Routes } from "react-router-dom";
const Router = React.lazy(() => import("./routes"));
const Loading = React.lazy(() => import("./components/Loading"));
function App() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Router />
            </Suspense>
        </>
    );
}

export default App;
