"use client";

import { FetchProps } from "./page";
import { formatEther } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const BalanceToken = ({ address }: FetchProps) => {
  const { data } = useScaffoldReadContract({
    contractName: "Dogtoken",
    functionName: "erc20BalanceOf",
    args: [address],
  });
  if (data) {
    return (
      <h1 className="my-4 text-xl inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
        Dogtoken balance {formatEther(data)}
      </h1>
    );
  }
  return <div className="skeleton h-4 w-40  my-2"></div>;
};
