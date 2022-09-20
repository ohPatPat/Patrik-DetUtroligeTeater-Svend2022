import { RotatingLines } from "react-loader-spinner";
import { useEffect, useState } from "react";
// https://npm.runkit.com/react-loader-spinner
export const Loader = () => {

    const [playAnimation, setPlayAnimation] = useState(false);

    // This will run one time after the component mounts
    useEffect(() => {
   // Check if the page has already loaded
   if (document.readyState === "complete") {
    setPlayAnimation(true)
    console.log("cake");
  }}, []);
  return (
    <section id={playAnimation ? "LoaderComplete" : "LoaderWrapper"}>
      <RotatingLines id="Loader"
        strokeColor="#d39d5b"
        strokeWidth="3"
        animationDuration="1"
      />
    </section>
  );
};
