"use client";

import Image from "next/image";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

//512
export const NFTimage = ({ Id }: { Id: bigint }) => {
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
        <img src={data.replace(/ipfs:\/\//g, "")} alt="nft dog person" />{" "}
      </div>
    );
  }
  return <span className="loading loading-dots loading-lg"></span>;
};
