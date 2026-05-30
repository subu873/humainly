import { useState, useEffect } from "react";
import PrivateRoutes from "./PrivateRoutes";



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  //todo here we can check if the user is authenticated by making an API call 
  // to the backend or by checking the presence of a token in local storage/cookies

  return (
    <>
      {isAuthenticated ? (
        <PrivateRoutes />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Please log in to access the app.</h1>
        </div>
      )}
    </>
  );
};

export default App;