import {Navigate} from "react-router";
import {type ComponentType, lazy, type LazyExoticComponent, Suspense} from "react";

const withSuspense = (Component: LazyExoticComponent<ComponentType>) => {
    return (
        <Suspense fallback={<div>Loading。。。</div>}>
            <Component/>
        </Suspense>
    )
}

const Page1 = lazy(() => import("@/pages/page1.tsx"))
const Page2 = lazy(() => import("@/pages/page2.tsx"))
const Routes = [
    {
        path: "/",
        element: withSuspense(Page1)
    },
    {
        path: "*",
        element: <Navigate to="/" replace/>
    }, {
        path: "/page2",
        element: withSuspense(Page2)
    }
]

export default Routes;