import { Card } from "../ui/Card";
import testImage from "../assets/images/test.jpg";
import { useEffect, useRef, useState } from "react";
import { EventEmitter } from "../util";
import { useSelector } from "react-redux";

/**
 * React component for displaying crowdfunding projects.
 * @component
 * @returns {JSX.Element} The rendered React element for crowdfunding.
 */
function CrowdFunding() {
  const progressRef = useRef();
  const [count, setCount] = useState();

  useEffect(() => {
    const id = setInterval(() => {
      if (count === 65) {
        clearInterval(id);
      } else {
        setCount((prevCount) => prevCount + 1);
        progressRef.current.innerHtml = `${count}`;
      }
    });
  }, []);

  return (
    <>
      <div className="w-full h-full mt-24">
        <div className="skill">
          <div className="outer">
            <div className="inner">
              <div ref={progressRef} id="number">
                65%
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="160px"
            height="160px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor="#DA2277" />
                <stop offset="100%" stopColor="#9733EE" />
              </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default CrowdFunding;
