"use client";

import { NFTGalerie } from "./NFTs";
import { Swap } from "./Swap";
//import { Lilypad } from "./lilypad";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";

//512

export type FetchProps = {
  address?: AddressType;
};

// const TokenOnwer = () => {
//   const { data } = useScaffoldReadContract({
//     contractName: "Dogtoken",
//     functionName: "ownerOf",
//     args: [57896044618658097711785492504343953926634992332820282019728792003956564819970n],
//   });
//   if (data) {
//     return <h1>owner {data.toString()}</h1>;
//   }
//   return <h1>owner loading...</h1>;
// };

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <div className="flex justify-center">
            <Swap />
          </div>
          {/* <TokenOnwer /> */}
          <NFTGalerie address={connectedAddress} />
        </div>
      </div>
    </>
  );
};

export default Home;
