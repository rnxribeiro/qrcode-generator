"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaUpload } from "react-icons/fa";

export default function Home() {
  const [linkValue, setLinkValue] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logoUrl, setLogoUrl] = useState("/rnx-vetor.svg");
  const [logoSize, setLogoSize] = useState(38);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        setLogoUrl(reader.result as string);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!qrCodeRef.current) return;

    const canvas = qrCodeRef.current.querySelector("canvas");

    if (!canvas) return;

    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = `qrcode-${Date.now()}.png`;

    link.click();
  };

  return (
    <main className="container">
      <section className="title-container">
        <h1 className="page-title">
          Gere e customize QR Codes <span>dinâmicos</span>
        </h1>
      </section>

      <section className="qr-code-container">
        {/* Lado esquerdo */}
        <div className="qr-code">
          <div className="link-input">
            <label htmlFor="link">
              Digite seu link
            </label>

            <input
              type="text"
              id="link"
              placeholder="https://seusite.com"
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
            />
          </div>

          <div className="qr-code-preview">
            <p>QR Code Preview</p>

            <div ref={qrCodeRef}>
              <QRCodeCanvas
                value={linkValue || "https://example.com"}
                title={linkValue || "QR Code"}
                size={240}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                imageSettings={{
                  src: logoUrl,
                  height: logoSize,
                  width: logoSize,
                  opacity: 1,
                  excavate: true,
                }}
              />
            </div>
          </div>
        </div>

        {/* Lado direito */}
        <div className="qr-code-customization">
          <div className="customization-container">
            <h3>Cores</h3>

            <div className="input-container colors">
              <div className="input-box">
                <label htmlFor="fgColor">
                  Cor principal
                </label>

                <input
                  type="color"
                  id="fgColor"
                  className="input-color"
                  value={fgColor}
                  onChange={(e) =>
                    setFgColor(e.target.value)
                  }
                />
              </div>

              <div className="input-box">
                <label htmlFor="bgColor">
                  Cor do fundo
                </label>

                <input
                  type="color"
                  id="bgColor"
                  className="input-color"
                  value={bgColor}
                  onChange={(e) =>
                    setBgColor(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="customization-container">
            <h3>Logo</h3>

            <div className="input-container">
              <div className="input-box">
                <label htmlFor="logo">
                  Insira seu logo
                </label>

                <input
                  type="file"
                  id="logo"
                  className="input-file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />

                <label
                  htmlFor="logo"
                  className="input-file-button"
                >
                  <FaUpload />
                  Escolher arquivo
                </label>
              </div>

              <div className="input-box">
                <label htmlFor="logoSize">
                  Tamanho da logo
                </label>

                <select
                  id="logoSize"
                  value={logoSize}
                  onChange={(e) =>
                    setLogoSize(Number(e.target.value))
                  }
                >
                  <option value={24}>
                    24px x 24px
                  </option>

                  <option value={38}>
                    38px x 38px
                  </option>

                  <option value={50}>
                    50px x 50px
                  </option>

                  <option value={64}>
                    64px x 64px
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button
            className="download-button"
            onClick={handleDownload}
          >
            Baixar QR Code
          </button>
        </div>
      </section>
    </main>
  );
}