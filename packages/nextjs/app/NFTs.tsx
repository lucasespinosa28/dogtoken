"use client";

import { FormEvent, useState } from "react";
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
      const response = await fetch("http://localhost:3001/api/cliWrapper", {
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
            <img src={url} alt="dog person nft" />
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
            <h2 className="w-full">NFT balance: {data.length}</h2>
          </div>
          <div className="columns-3">
            {data.map(id => (
              <NFTContainer key={id} id={id} />
            ))}
          </div>
        </div>
      );
    } else {
      return <h2>NFT balance: 0</h2>;
    }
  } else {
    return <div className="skeleton h-4 w-40 my-2"></div>;
  }
};
