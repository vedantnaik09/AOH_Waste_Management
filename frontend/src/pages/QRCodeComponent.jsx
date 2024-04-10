import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "./qr.css";
import camera from "../utils/camera.js";

const QRCodeComponent = () => {
  const [personalSignResult, setPersonalSignResult] = useState("");
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const [url, setUrl] = useState("")

  const canvasRef = useRef(null);

  useEffect(() => {
    const handlePersonalSign = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        const exampleMessage = "Example `personal_sign` message.";
        const from = account;

        if (!from) {
          throw new Error("No Ethereum account selected");
        }

        const hexMsg = stringToHex(exampleMessage);

        const sign = await window.ethereum.request({
          method: "personal_sign",
          params: [hexMsg, from],
        });

        setPersonalSignResult(sign);
        setLoading(false); // Once signature is received, loading is set to false
      } catch (err) {
        console.error(err);
        setError(`Error: ${err.message}`);
      }
    };

    handlePersonalSign();
  }, []);

  const drawImageAndBoxes = (file, data) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(data);
    img.onload = () => {
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 3;
      ctx.font = "18px serif";
  
      data.forEach(({ name, confidence, box }) => {
        if(confidence < 0.5) return;
        const { x1, y1, x2, y2 } = box;
        
        // Draw bounding box
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        
        // Draw label background
        ctx.fillStyle = "#00ff00";
        const width = ctx.measureText(name).width;
        ctx.fillRect(x1, y1, width + 10, 25);
        console.log(name, x1, y1, width);
        // Draw label text
        ctx.fillStyle = "#000000";
        ctx.fillText(name, x1, y1 + 18);
      });
    };
  };
   // Empty dependency array ensures this effect runs only once on mount

  const stringToHex = (str) => {
    return Array.from(str)
      .map((char) => char.charCodeAt(0).toString(16))
      .join("");
  };

  // const dummyData = {
  //   username: "tirth",
  //   totalDays: 6,
  //   dailyPlan: "plastic",
  //   tokenId: "12345",
  // };

  useEffect(() => {
    const email = localStorage.getItem("email")
    axios
      .post("http://localhost:3000/api/qrcode/generate",{
        email,
      })
      .then((response) => {
        setUrl(response.data.url)
        console.log(response.data.url)
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);



  async function sendImage(e) {
    let form = new FormData();

    form.append("image", e.target.files[0]);

    const options = {
      method: "POST",
      url: "http://localhost:5000/processing",
      headers: {
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      data: form,
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);  
      drawImageAndBoxes(e.target.files[0], data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    console.log(typeof e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));

    sendImage(e);
  }

  return (
    <div className="QRCode flex flex-col">
      <Sidebar />
      {loading ? ( // If loading is true, display loading indicator
        <div>Loading...</div>
      ) : (
        <>
          <div className="p-5">
            <QRCode value={url} style={{ height: "20vw", width: "20vw" }} />
          </div>
          <div className="font1">Scan this QR code</div>
          <div className="font2">
            This is your daily QR code for collection verification
          </div>
        </>
      )}

      <input type="file" onChange={handleChange} />
      <canvas ref={canvasRef}/>
    </div>
  );
};

export default QRCodeComponent;
