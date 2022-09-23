import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";
// https://npm.runkit.com/react-loader-spinner

export const Loader = () => {
  const [playAnimation, setPlayAnimation] = useState(false);

  document.onreadystatechange = () => {
    
    if (document.readyState === "complete") {
      setTimeout(() => {
        console.log("Siden har loaded");
        setPlayAnimation(true);
      }, 1500);
    } else {
      console.log("Siden har ikke loaded");
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
