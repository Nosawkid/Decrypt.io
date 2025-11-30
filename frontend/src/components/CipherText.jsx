import { useState } from "react";
import { encrypt } from "../utils/Caeser";

const CipherText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const onMouseEnter = () => {
    setDisplayText(encrypt(text));
  };

  const onMouseLeave = () => {
    setDisplayText(text);
  };
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={` ${className}`}
    >
      {displayText}
    </div>
  );
};

export default CipherText;
