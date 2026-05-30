import { useEffect, useState } from "react";
import UniversalLoadingScreen from "./components/Loading/Layout";
import { useLocation } from "react-router-dom";

const LoadingWrapper = ({
    component: Component,
    loadingTitle = "Loading Dashboard...",
    showMetrics = true,
    showSidebar = true,
    metricsCount = 4,
    contentSections = 2,
    ...props
}) => {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 2 seconds

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (isLoading) {
        return (
            <UniversalLoadingScreen
                title={loadingTitle}
                showMetrics={showMetrics}
                showSidebar={showSidebar}
                metricsCount={metricsCount}
                contentSections={contentSections}
            />
        );
    }

    return <Component {...props} />;
};

export default LoadingWrapper;