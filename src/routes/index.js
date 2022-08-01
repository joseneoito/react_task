import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

const PageLayout = React.lazy(() => import("../components/Layout"));
const Users = React.lazy(() => import("../views/Users"));
const UserDetails = React.lazy(() => import("../views/UserDetails"));

function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to={"/users"} />,
        },
        {
            children: [
                {
                    path: "/users",
                    element: (
                        <PageLayout>
                            <Users />
                        </PageLayout>
                    ),
                },
                {
                    path: "/user/:id",
                    element: (
                        <PageLayout>
                            <UserDetails />
                        </PageLayout>
                    ),
                },
                {
                    path: "/users/create",
                    element: (
                        <PageLayout>
                            <UserDetails />
                        </PageLayout>
                    ),
                },
            ],
        },
    ]);
}

export default Router;
