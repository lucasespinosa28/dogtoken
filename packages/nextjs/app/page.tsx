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

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Dogtoken</span>
            <span className="block mb-2 w-full text-center w-96">
              ERC404 is an open, mixed ERC-20 and ERC-721 implementation designed to provide native fractionalization
              while supporting seamless integration with existing protocols.
            </span>
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
