import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(16)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [inputText, setInputText] = useState("")


  const passwordReference = useRef(null)

  const copyPasswordToClipboard = useCallback( () => {
    passwordReference.current?.select()
    window.navigator.clipboard.writeText(inputText)
  }, [inputText])


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) {
      characters += "0123456789"
    }
    if(symbolAllowed) {
      characters += "!@#$%^&*(){}]["
    }

    for(let i = 1; i <= length; i++) {
      
      let random = Math.floor(Math.random() * characters.length + 1)

      pass += characters.charAt(random)

      setInputText(pass)
    }
  }, [length, numberAllowed, symbolAllowed])


  useEffect( () => {
    passwordGenerator()
  }, [length, numberAllowed, symbolAllowed])


  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-around items-center bg-gray-800 w-96 h-32">
          <div className='text-white flex flex-col justify-centre'>
            <div className="text-center mb-5">
              <h1 className="text-3xl">Password Generator</h1>
            </div>
            <div className="flex justify-center mb-2">
              <input className="text-black" type='text' value={inputText} ref={passwordReference} readOnly/>
              <button onClick={copyPasswordToClipboard}>copy</button>
            </div>
            <div className="flex">
              <div className="mr-2">
                <input type="range" min={6} max={50} value={length} onChange={ (e) => setLength(e.target.value) }/>
                <label>length{length}</label>
              </div>
              <div className="mr-2">
                <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={ () => setNumberAllowed(prev => !prev) }/>
                <label>Number</label>
              </div>
              <dv>
                <input type="checkbox" defaultChecked={symbolAllowed} id="symbolInput" onChange={ () => setSymbolAllowed(prev => !prev) } />
                <label>Symbol</label>
              </dv>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
