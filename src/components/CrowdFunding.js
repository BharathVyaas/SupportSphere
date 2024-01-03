import { useEffect, useRef, useState } from "react";
// Found on Youtube. https://www.youtube.com/watch?v=H2HYccAGR00
function CrowdFunding() {
  const progressRef = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (count === 65) {
        clearInterval(id);
      } else {
        setCount((prevCount) => prevCount + 1);
        progressRef.current.innerHTML = `${count}`;
      }
    }, 1000);

    return () => clearInterval(id);
  }, [count]);

  return (
    <>
      <div className="w-full h-full mt-24">
        <div className="skill">
          <div className="outer">
            <div className="inner">
              <div ref={progressRef} id="number">
                {count}%
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
