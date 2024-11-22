import { Dispatch, JSX, SetStateAction, useState } from "react";

import { Button } from "./Button";

interface IPopupProps {
  body: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function Popup({
  body,
  setShow: setShowPopup,
}: IPopupProps): JSX.Element {
  const [copyStatus, setCopyStatus] = useState("Copy Text");

  const handleCopy = (): void => {
    navigator.clipboard
      .writeText(body)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy Text"), 2000);
      })
      .catch(() => {
        setCopyStatus("Failed to copy");
        setTimeout(() => setCopyStatus("Copy Text"), 2000);
      });
  };

  return (
    <div className="absolute w-screen h-screen">
      <div
        className="absolute flex flex-col w-full h-full z-30 place-content-center"
        onClick={() => setShowPopup(false)}
      />
      <div className="relative flex flex-col max-w-lg h-1/2 bg-white opacity-100 mx-auto rounded-2xl z-40 top-1/4 place-content-center gap-5 p-5">
        <div className="mx-auto bg-purple-200 h-full rounded-lg p-4 break-words break-before-all w-full">
          {body}
        </div>
        <div className="flex place-content-center gap-5">
          <Button className="w-1/2" onClick={handleCopy}>
            {copyStatus}
          </Button>
          <Button className="w-1/2" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
