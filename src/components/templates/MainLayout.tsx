import React, { Children } from "react";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

type PROPS = {
  children: React.ReactElement;
};

export const MainLayout: React.VFC<PROPS> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
