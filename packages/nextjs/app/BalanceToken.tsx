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
    return <h1 className="my-2">Dogtoken balance {formatEther(data)}</h1>;
  }
  return <div className="skeleton h-4 w-40  my-2"></div>;
};
