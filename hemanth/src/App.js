import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      console.log(parsedInput);
      const res = await axios.post("http://localhost:3000/bfhl", parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error("Invalid JSON or API call failed", error);
      alert("Invalid JSON or API call failed");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="response">
        {selectedOptions.includes("Alphabets") && (
          <div>
            <h3>Alphabets:</h3>
            <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes("Numbers") && (
          <div>
            <h3>Numbers:</h3>
            <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <pre>
              {JSON.stringify(response.highest_lowercase_alphabet, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>JSON Input and Filter</h1>
      <textarea
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder='Enter JSON, e.g., {"data": ["A", "C", "Z", "c", "i"]}'
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div className="dropdown">
          <label htmlFor="filter">Filter Response:</label>
          <select
            id="filter"
            multiple={true}
            value={selectedOptions}
            onChange={handleOptionChange}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
