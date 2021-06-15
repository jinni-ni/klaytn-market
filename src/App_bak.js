import { getBalance, readCount } from "./api/UserCaver";
import "./App.css";
import { useState } from "react";
import QRCode from "qrcode.react";
import * as KlipAPI from "./api/UserKlip";

function onPressButton() {
  console.log("hi");
}
const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
};

const DEFAULT_QR_CODE = "DEFAULT";

function App_bak() {
  // Globla Data

  // address
  const [address, setAddress] = usetState("");
  //nft

  const [balance, setBalance] = useState("0");
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  // UI
  // tab
  // mintInput
  // Modal

  // fetchMarketNFTs
  // fetchMyNFTs
  // onClickMint
  // onClickMyCard
  // onClickMarketCard
  // getUserData

  // readCount();
  //  getBalance("0xa1ad3c81445681b0b68701289e2d7ece5997f660");
  const onClickgetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClicksetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* 주소 잔고 */}
        {/* 갤러리 */}
        {/* 발행 */}
        {/* 탭 */}
        {/* 모달 */}

        <button
          onClick={() => {
            onClickgetAddress();
          }}
        >
          주소가져오기
        </button>
        <button
          onClick={() => {
            onClicksetCount();
          }}
        >
          Count 변경
        </button>
        <br />
        <br />
        <QRCode value={qrvalue} />
        <p>{balance}</p>
        <p>
          Good <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App_bak;
