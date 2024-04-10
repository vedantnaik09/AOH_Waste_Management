import React, { useState, useEffect, useRef, useCallback } from 'react';
import QrReader from '../components/QrReader';
import Sidebar from '../components/Sidebar';
import { useDispatch } from "react-redux";
import {setIndex} from '../slices/generalSlice'


const QRCodeScanner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIndex(5))
  }, [])
  // const [result, setResult] = useState('');
  // const [reader, setReader] = useState(null);
  // const [imgSrc, setImgSrc] = useState(null);
  // const email = localStorage.getItem("email")
  // const webcamRef = useRef(null);

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setImgSrc(imageSrc);
  // }, [webcamRef]);

  // useEffect(() => {
  //   const codeReader = new BrowserQRCodeReader();
  //   setReader(codeReader);

  //   return () => {
  //     codeReader.reset();
  //   };
  // }, []);

  // const handleScan = data => {
  //   if (data) {
  //     console.log('Result: ', data);
  //   }
  // }

  // const handleError = err => {
  //   console.error(err);
  // }

  // const scanCode = async () => {
  //   try {
  //     const videoElement = webcamRef.current.video;
  //     const result = await reader.decodeFromVideoElement(videoElement);
  //     console.log(result.getText())
  //     setResult(result.getText());
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="QRCode flex flex-col">
      <Sidebar/>
      {/* <Webcam
      ref={webcamRef}
        id="webcam"
        audio={false}
        width={400}
        height={400}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: 'environment',
        }}
      /> */}
      {/* <button onClick={capture}>Scan QR Code</button>
      <p>{result}</p> */}
      <QrReader/>
    </div>
  );
}

export default QRCodeScanner;
