import React, { useEffect, useState, PureComponent } from 'react';
import './App.css';

function App() {
  const [fileBuffer, setFileBuffer] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  useEffect(() => {
    if (fileBuffer) {
      console.log('fetching');
      fetchConvertedImage(fileBuffer);
    }
  }, [fileBuffer]);

  const handleFileInputChange = (event) => {
    fileToBase64(event.target.files[0]);
  };

  function fileToBase64(file) {
    let fileReader;

    const handleFileReadEnd = (e) => {
      const content = fileReader.result;
      setFileBuffer(content);
    };
    fileReader = new FileReader();
    fileReader.onloadend = handleFileReadEnd;
    fileReader.readAsArrayBuffer(file);
  }

  function bufferToBase64(arrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  }

  const fetchConvertedImage = async () => {
    fetch('http://127.0.0.1:5000/image_conversion/convert/to/png', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: fileBuffer,
    })
      .then((response) => {
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => setConvertedImage(url))
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div className="App">
      <h5> Right now can convert any image to PNG - fires on select</h5>
      <input type="file" onChange={handleFileInputChange}></input>
      {convertedImage && (
        <a href={`${convertedImage}`} download>
          <img src={convertedImage} alt="converted png" />
        </a>
      )}
    </div>
  );
}

export default App;
