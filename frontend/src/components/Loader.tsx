import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./Loader.scss";

interface LoaderProps {
  marginTop?: "s" | "m" | "l";
}

const Loader: React.FC<LoaderProps> = ({ marginTop = "l" }) => {
  return (
    <div className={`loader mt-${marginTop}`}>
      <PuffLoader size={250} />
    </div>
  );
};

export default Loader;
