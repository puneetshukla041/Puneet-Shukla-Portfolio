"use client";

import Header from "@/components/Header";

const BlackPage = () => {
  return (
    <>
      <Header />
      <div style={{ background: "#000", position: "absolute", inset: 0 }} />
    </>
  );
};

export default BlackPage;
