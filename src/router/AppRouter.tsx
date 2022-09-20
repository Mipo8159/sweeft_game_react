import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";

const AppRouter: React.FC = () => {
  return (
    <nav>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </nav>
  );
};

export default AppRouter;
