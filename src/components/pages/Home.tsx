import React, { memo } from "react";
import { Data } from "../molecules/Data";
import { MainLayout } from "../templates/MainLayout";

export const Home = memo(() => {
  return (
    <MainLayout>
      <Data />
    </MainLayout>
  );
});
