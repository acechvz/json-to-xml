import React, { useState } from "react";
import Button from "./components/Button";
import Label from "./components/Label";
import { fetchXMLData } from "./instance";
import jsonFile from "./entry.json";
import "./App.css";

function App() {
  const [jsonText, setJSON] = useState(JSON.stringify(jsonFile));
  const [xmlText, setXML] = useState("");
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const jsonSuccess = () => {
    setValid(true);
    setError(null);
    setLoading(true);
    fetchXMLData(jsonText).then(data => {
      const xml = new XMLSerializer().serializeToString(data);
      setXML(xml);
      setLoading(false);
    });
  };

  const jsonFailed = ({ message }) => {
    setError(message);
    setValid(false);
    setXML("");
  };

  const validateJSON = (success, failed) => {
    try {
      JSON.parse(jsonText);
      success();
    } catch (err) {
      failed(err);
    }
  };

  return (
    <div className="App">
      <h2>JSON to XML Converter</h2>
      <div className="App-container">
        <div className="converterBlock">
          <textarea
            name="json"
            id="json"
            cols="60"
            rows="10"
            onChange={e => setJSON(e.target.value)}
            value={jsonText}
          >
            {jsonText}
          </textarea>
        </div>
        <div className="converterBlock">
          <textarea
            placeholder={`${
              !isLoading ? "Your XML will appear here" : "Loading XML ..."
            }`}
            name="xml"
            id="xml"
            cols="60"
            rows="10"
            value={xmlText}
            readOnly
          >
            {xmlText}
          </textarea>
        </div>
      </div>
      <Button onClick={() => validateJSON( jsonSuccess, jsonFailed )} />
      <br />
      {valid && !error && <Label type="valid">Valid JSON!</Label>}
      {!valid && error && <Label type="invalid">Invalid JSON :(</Label>}
      <br />
    </div>
  );
}

export default App;
