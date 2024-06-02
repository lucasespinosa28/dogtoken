"use client";

import { useState } from "react";
import Image from "next/image";
import { NFTloadings } from "./NFTloadings";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type Laoding = {
  width: number;
  height: number;
  isLoading: boolean;
};
//512
export const NFTimage = ({ Id }: { Id: bigint }) => {
  const [loading, setLoading] = useState<Laoding>({ width: 0, height: 0, isLoading: true });
  //ipfs://http://localhost:3001/images/QmSnTb9xFRKyeEwh3BWXvqQqAHrk6z9Gezin3GcNEyUP6G/outputs/output_00001_.png
  const { data } = useScaffoldReadContract({
    contractName: "Dogtoken",
    functionName: "tokenURI",
    args: [Id],
  });
  if (data) {
    if (data.includes("empty")) {
      return (
        <figure>
          <Image src="/empty.jpeg" width={512} height={512} alt="Picture of question mark" />
        </figure>
      );
    }
    return (
      <div>
        {loading.isLoading && <NFTloadings />}
        <Image
          src={data.replace(/(ipfs:\/\/)/g, "https://ipfs.io/ipfs/")}
          alt="dog person nft"
          width={loading.width}
          height={loading.height}
          onLoad={() => {
            const newLoading = loading;
            newLoading.height = 512;
            newLoading.width = 512;
            newLoading.isLoading = false;
            setLoading(newLoading);
          }}
        />
      </div>
    );
  }
  return <NFTloadings />;
};
