import React, { useState } from "react";
import Modal from "./Modal";
import Loader from "./Loader";

const AllButtons = ({
  isConvertLoading,
  isDebugLoading,
  isCheckQualityLoading,
  handleConvert,
  handleDebug,
  handleCheckQuality,
  handleOpenModal,
  handleCloseModal,
  modalOpen,
  repos,
  convertedText,
  handleClear,
}) => {
  const [accessToken] = useState(localStorage.getItem("token"));

  const handleLoader = () => {
    return (
      <>
        <div class="newtons-cradle">
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
        </div>
      </>
    );
  };

  return (
    <div className="all-buttons">
      <button onClick={handleConvert}>
        {isConvertLoading ? handleLoader() : "Convert"}
      </button>
      <button onClick={handleDebug}>{isDebugLoading ? handleLoader() : "Debug"}</button>
      <button onClick={handleCheckQuality}>{isCheckQualityLoading ? handleLoader() : "Check Quality"}</button>
      <button onClick={handleOpenModal}>Push Code to Github</button>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        accessToken={accessToken}
        repos={repos}
        code={convertedText}
      />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default AllButtons;
