import React from "react";
import { ReactNode } from "react";
import "./Layout.css";

type ComponentProps = {
  children: ReactNode;
};

const Layout = ({ children }: ComponentProps) => {
  return (
    <div className="layout">
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
