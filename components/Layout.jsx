import React from "react";
import Headers from "./Headers";

const Layout = ({ children }) => {
  return (
    <>
      <Headers />
      {children}
    </>
  );
};

export default Layout;
