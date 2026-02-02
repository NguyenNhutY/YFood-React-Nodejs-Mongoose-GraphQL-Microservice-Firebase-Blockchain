import React, { useState, ChangeEvent, MouseEvent }  from "preact/hooks";
import "./passGenerator.scss";
import { FunctionalComponent } from "preact";

interface PasswordGeneratorProps {
  onPasswordGenerated?: (password: string) => void;
  onClose: () => void;
}

const PasswordGenerator: FunctionalComponent<PasswordGeneratorProps> = ({
  onPasswordGenerated,
  onClose,
}) => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(8);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumber, setIncludeNumber] = useState<boolean>(true);
  const [includeSymbol, setIncludeSymbol] = useState<boolean>(true);
  const [copySuccess, setCopySuccess] = useState<string>("");

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("passgenerator-overlay")) {
      onClose();
    }
  };

  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+=";

  const getLowercase = () =>
    lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
  const getUppercase = () =>
    upperLetters[Math.floor(Math.random() * upperLetters.length)];
  const getNumber = () => numbers[Math.floor(Math.random() * numbers.length)];
  const getSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const generateX = (): string => {
    const xs: string[] = [];
    if (includeUpper) xs.push(getUppercase());
    if (includeLower) xs.push(getLowercase());
    if (includeNumber) xs.push(getNumber());
    if (includeSymbol) xs.push(getSymbol());

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
  };

  const generatePassword = () => {
    if (length <= 0) return;

    let newPassword = "";

    if (includeUpper) newPassword += getUppercase();
    if (includeLower) newPassword += getLowercase();
    if (includeNumber) newPassword += getNumber();
    if (includeSymbol) newPassword += getSymbol();

    for (let i = newPassword.length; i < length; i++) {
      newPassword += generateX();
    }

    newPassword = newPassword
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setPassword(newPassword);
    if (onPasswordGenerated) onPasswordGenerated(newPassword);
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((error) => {
        setCopySuccess("Failed to copy!");
        console.error("Failed to copy text: ", error);
      });
  };

  return (
    <div
      class='password-generator passgenerator-overlay'
      onClick={handleOverlayClick}
    >
      <div class='passgenerator-container'>
        <h3>Password Generator</h3>
        <div>
          <label>Length:</label>
          <input
            type='number'
            value={length}
            min={8}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLength(Number(e.target.value))
            }
            aria-label='Password length'
          />
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
              aria-label='Include uppercase letters'
            />{" "}
            Uppercase
          </label>
          <label>
            <input
              type='checkbox'
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
              aria-label='Include lowercase letters'
            />{" "}
            Lowercase
          </label>
          <label>
            <input
              type='checkbox'
              checked={includeNumber}
              onChange={() => setIncludeNumber(!includeNumber)}
              aria-label='Include numbers'
            />{" "}
            Numbers
          </label>
          <label>
            <input
              type='checkbox'
              checked={includeSymbol}
              onChange={() => setIncludeSymbol(!includeSymbol)}
              aria-label='Include symbols'
            />{" "}
            Symbols
          </label>
        </div>
        <button class='passgenerator-button' onClick={generatePassword}>
          Generate Password
        </button>
        <div>
          Password:
          <span
            onClick={handleCopyClick}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {password}
          </span>
          {copySuccess && <div style={{ color: "green" }}>{copySuccess}</div>}
        </div>
        <button
          onClick={onClose}
          class='cancel-button'
          aria-label='Close password generator'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
