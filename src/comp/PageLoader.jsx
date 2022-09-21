import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";
import { useAuth } from "../page/login/Auth";
// https://npm.runkit.com/react-loader-spinner

export const Loader = () => {
  const [playAnimation, setPlayAnimation] = useState(false);

  // This will run one time after the component mounts
  document.onreadystatechange = () => {
    // Check if the page has already loaded
    if (document.readyState === "complete") {
      setTimeout(() => {
        console.log("ready");
        setPlayAnimation(true);
      }, 1500);
    } else {
      console.log("notready");
      setPlayAnimation(false);
    }
  };

  if (!playAnimation) {
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.height = "auto";
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <section id={playAnimation ? "LoaderComplete" : "LoaderWrapper"}>
        <RotatingLines
          id="Loader"
          strokeColor="#d39d5b"
          strokeWidth="3"
          animationDuration="1"
        />
      </section>
    </>
  );
};
