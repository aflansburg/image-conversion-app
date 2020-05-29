import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [fileBuffer, setFileBuffer] = useState();
  const [convertedImage, setConvertedImage] = useState();

  useEffect(() => {
    fetchConvertedImage(fileBuffer);
  }, fileBuffer);

  const handleFileInputChange = async (event) => {
    event.preventDefault();
    const buffer = await fileToBase64(event.target.files[0]);
    setFileBuffer(buffer);
  };

  const fileToBase64 = (file) => {
    let fileReader;

    const handleFileReadEnd = (e) => {
      const content = fileReader.result;
      console.log(content);
    };
    fileReader = new FileReader();
    fileReader.onloadend = handleFileReadEnd;
    fileReader.readAsArrayBuffer(file);
  };

  const fetchConvertedImage = async () => {
    const res = await fetch(
      'http://127.0.0.1:5000/image_conversion/convert/to/png',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: fileBuffer,
      }
    );

    console.log(res);
  };

  return (
    <div className="App">
      <h5> Right now can convert any image to PNG - fires on select</h5>
      <input type="file" onChange={handleFileInputChange}></input>
      {fileBuffer && <p>{fileBuffer.toString()}</p>}
    </div>
  );
}

export default App;
