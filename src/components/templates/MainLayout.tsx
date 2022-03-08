import React, { Children, memo } from "react";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

type PROPS = {
  children: React.ReactElement;
};

export const MainLayout: React.VFC<PROPS> = memo(({ children }) => {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
});
