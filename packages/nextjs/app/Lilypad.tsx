"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";

export const Lilypad = (): JSX.Element => {
  // State for storing the user's input
  const [userInput, setUserInput] = useState<string>("");
  // State for storing the URL of the generated image
  const [output, setOutput] = useState<string>("");

  // State to track loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Function to handle the form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:3001/api/cliWrapper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      const imageURL = await response.text();
      setOutput(imageURL);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false); // End loading
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center p-24">
        <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center font-mono text-sm space-y-4">
          <h1>Lilypad Image Generator</h1>
          <div className="w-[500px] flex flex-col items-center">
            {" "}
            {/* Container for image and form */}
            {/* Placeholder or Loading Animation */}
            {!output && (
              <div className="border-dashed border-2 border-gray-300 w-full h-[500px] flex items-center justify-center">
                {isLoading ? (
                  <span className="text-gray-500">Loading...</span> // Replace with your loading animation
                ) : (
                  <span className="text-gray-500">Image will appear here</span>
                )}
                {/* Display the generated image if the output URL is available */}
                {output && <Image src={output} alt="Generated" width={500} height={500} />}
                <form onSubmit={handleSubmit} className="w-full mt-2">
                  {/* Textarea for user input */}
                  <textarea
                    className="w-full p-2"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Enter your prompt"
                    rows={4}
                  />
                  <div className="w-full flex justify-end">
                    {/* Submit button for the form */}
                    <button type="submit" className="mt-4">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
