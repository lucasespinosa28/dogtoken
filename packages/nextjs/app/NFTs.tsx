"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { BalanceToken } from "./BalanceToken";
import { ChangeUri } from "./ChangeUri";
import { NFTimage } from "./NFTimage";
import { FetchProps } from "./page";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const NFTContainer = ({ id }: { id: bigint }) => {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("https://apiaiconfy.fly.dev/api/cliWrapper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const imageURL = await response.text();
      console.log(imageURL);
      setUrl(imageURL);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false); // End loading
  };

  return (
    <div key={id}>
      <div className="card w-96 bg-base-100 shadow-xl">
        {isLoading && <div className="skeleton w-96 h-96"></div>}
        {url ? (
          <figure>
            <Image src={url} alt="dog person nft" width={512} height={512} />
          </figure>
        ) : (
          !isLoading && <NFTimage Id={id} />
        )}

        <form onSubmit={handleSubmit} className="w-full mt-2">
          {/* Textarea for user input */}
          <div className="w-full flex justify-center">
            {/* Submit button for the form */}
            <button type="submit" className="btn btn-success m-2 mt-4  w-36">
              Gerenete AI NFT
            </button>
          </div>
        </form>
        <ChangeUri id={id} url={url} />
      </div>
      <br></br>
    </div>
  );
};

export const NFTGalerie = ({ address }: FetchProps) => {
  const { data } = useScaffoldReadContract({
    contractName: "Dogtoken",
    functionName: "owned",
    args: [address],
  });

  if (data) {
    if (data.length > 0) {
      return (
        <div>
          <div className="columns-2">
            <BalanceToken address={address} />
            <h1 className="my-4 text-lg inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              NFT balance: {data.length}
            </h1>
          </div>
          <div className={`columns-3`}>
            {data.map(id => (
              <NFTContainer key={id} id={id} />
            ))}
          </div>
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              Lilypad take some time to return a generate image, If Lilypad server are not working try again later
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <h1 className="my-4 text-xl inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
          NFT balance: 0
        </h1>
      );
    }
  } else {
    return <div className="skeleton h-4 w-40 my-2"></div>;
  }
};
