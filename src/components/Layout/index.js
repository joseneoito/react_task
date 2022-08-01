import React from "react";
const ButtonAppBar = React.lazy(() => import("../Navbar"));
export default function Layout({ children }) {
    return (
        <>
            <ButtonAppBar />
            {children}
        </>
    );
}
