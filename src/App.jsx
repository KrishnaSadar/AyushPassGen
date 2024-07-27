import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (characterAllowed) str += "!@#$%^&*(){}[]";
    if (numberAllowed) str += "123456789";

    for (let i = 0; i < length; ++i) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500' style={{ boxSizing: 'border-box' }}>
      <h1 className='text-3xl font-bold mb-2 text-center'>Password Generator</h1>
      <div className='flex flex-col shadow rounded-lg overflow-hidden mb-4'>

        <div className='flex mb-3'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='bg-blue-700 text-white outline-none px-3 py-0.5 shrink-0' onClick={copyToClipboard}>
            Copy
          </button>
        </div>

        <div className='flex flex-row'>

          <div className='flex text-sm gap-x-2 mx-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type='range'
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor='length'>Length: {length}</label>
            </div>
          </div>

          <div className='flex text-sm gap-x-2 mx-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                checked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='number'>Numbers</label>
            </div>
          </div>

          <div className='flex text-sm gap-x-2 mx-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                checked={characterAllowed}
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
              <label htmlFor='character'>Characters</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
