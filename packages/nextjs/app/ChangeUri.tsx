"use client";

import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const ChangeUri = ({ id, url }: { id: bigint; url: string }) => {
  const regex = /^http:\/\/localhost:3001\/images\//;
  url.replace(regex, "ipfs://");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("Dogtoken");
  return (
    <div className="w-full flex justify-center h-12  mt-2">
      {url != "" && (
        <button
          className="btn btn-success w-36"
          onClick={async () => {
            try {
              await writeYourContractAsync({
                functionName: "updatedtokenURI",
                args: [id, url],
              });
            } catch (e) {
              console.error("Error setting greeting:", e);
            }
          }}
        >
          Save NFT
        </button>
      )}
    </div>
  );
};
