"use client";

import { useState } from "react";
import { SwapDTl } from "./SwapDTl";
import { SwapFil } from "./SwapFil";

export const Swap = () => {
  const [invert, setInvert] = useState<boolean>(true);
  const [tabs, setTabs] = useState<string[]>(["tab-active", ""]);
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <div role="tablist" className="tabs tabs-bordered">
        <span
          role="tab"
          className={`tab ${tabs[0]}`}
          onClick={() => {
            setInvert(true);
            setTabs(["tab-active", ""]);
          }}
        >
          Filecoin
        </span>
        <span
          role="tab"
          className={`tab ${tabs[1]}`}
          onClick={() => {
            setInvert(false);
            setTabs(["", "tab-active"]);
          }}
        >
          Dogtoken/nft
        </span>
      </div>
      {invert ? <SwapFil /> : <SwapDTl />}
    </div>
  );
};
