"use client";

import React from "react";
import { Audio } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="teal"
        ariaLabel="loading"
        wrapperStyles
        wrapperClass
      />
    </div>
  );
};

export default Loading;
