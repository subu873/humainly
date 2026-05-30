import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components";
import { Chat } from "./pages";

const PrivateRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Chat />} />
                    <Route path="/threads/:threadId" element={<Chat />} />
                </Route>
            </Routes>
        </>
    );
};

export default PrivateRoutes;
