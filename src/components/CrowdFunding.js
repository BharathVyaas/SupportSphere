import { Card } from "../ui/Card";
import testImage from "../assets/images/test.jpg";
import { useEffect, useState } from "react";
import { EventEmitter } from "../util";

/**
 * React component for displaying crowdfunding projects.
 * @component
 * @returns {JSX.Element} The rendered React element for crowdfunding.
 */
function CrowdFunding() {
  /**
   * State for managing styles of the crowdfunding component.
   * @type {string}
   */
  const [panelStyles, setPanelStyles] = useState("ms-[260px]");
  let viewSize = " mt-[5rem] grid grid-cols-";
  const [resizeStyles, setResizeStyles] = useState(
    panelStyles + viewSize + "1"
  );

  /**
   * Effect hook to handle panel toggle events and update styles accordingly.
   */
  useEffect(() => {
    const handleResize = (size) => {
      if (size === "2xl" || size === "xl") {
        setResizeStyles(panelStyles + viewSize + 3);
      } else if (size === "lg" || size === "md") {
        setResizeStyles(panelStyles + viewSize + 2);
      } else if (size === "sm") {
        setResizeStyles(panelStyles + viewSize + 1);
      }
    };

    EventEmitter.on("reSize", handleResize);

    return () => EventEmitter.off("reSize", handleResize);
  }, []);

  /**
   * Render the crowdfunding component.
   * @returns {JSX.Element} The rendered React element.
   */
  return (
    <ul className={panelStyles + resizeStyles}>
      <li className="my-4 mx-auto">
        <Card
          id="1"
          title="My Portfolio Project"
          img={testImage}
          raisedAmount="1500"
          targetAmount="5000"
        />
      </li>
      <li className="my-4 mx-auto">
        <Card
          id="2"
          title="Another Portfolio Project"
          img={testImage}
          raisedAmount="5200"
          targetAmount="5000"
        />
      </li>
      <li className="my-4 mx-auto">
        <Card
          id="3"
          title="This is my Portfolio"
          img={testImage}
          targetAmount="5200"
          raisedAmount="5000"
        />
      </li>
      <li className="my-4 mx-auto">
        <Card
          id="4"
          title="This is my Portfolio"
          img={testImage}
          raisedAmount="2300"
          targetAmount="5000"
        />
      </li>
      <li className="my-4 mx-auto">
        <Card
          id="5"
          title="This is my Portfolio"
          img={testImage}
          raisedAmount="3600"
          targetAmount="5000"
        />
      </li>
      <li className="my-4 mx-auto">
        <Card
          id="6"
          title="This is my Portfolio"
          img={testImage}
          raisedAmount="4800"
          targetAmount="5000"
        />
      </li>
      <li className="my-4 mx-auto">
        <Card
          id="7"
          title="This is my Portfolio"
          img={testImage}
          raisedAmount="1400"
          targetAmount="5000"
        />
      </li>
    </ul>
  );
}

export default CrowdFunding;
/* 
import { Card } from "../ui/Card";
import testImage from "../assets/images/test.jpg";
import { useEffect, useState } from "react";
import { EventEmitter } from "../util";


function CrowdFunding() {

  const [panelStyles, setPanelStyles] = useState("ms-[260px] grid grid-cols-2");


  useEffect(() => {
    const handlePanelToggle = (showPanel) => {
      setPanelStyles(
        showPanel ? "ms-[260px] grid grid-cols-2" : "ms-[0px] grid grid-cols-3"
      );
    };

    EventEmitter.on("togglePanel", handlePanelToggle);

    return () => EventEmitter.off("togglePanel", handlePanelToggle);
  }, []);


  return (
    <div className={panelStyles}>
      <div className="my-4 mx-auto">
        <Card
          id="1"
          title="My Portfolio Project"
          img={testImage}
          raisedAmount="1500"
          targetAmount="5000"
        />
      </div>
      <div className="my-4 mx-auto">
        <Card
          id="2"
          title="Another Portfolio Project"
          img={testImage}
          raisedAmount="5200"
          targetAmount="5000"
        />
      </div>
      <div className="my-4 mx-auto">
        <Card
          id="2"
          title="This is my Portfolio"
          img={testImage}
          raised="5200"
          needed="5000"
        />
      </div>
      <div className="my-4 mx-auto">
        <Card
          id="3"
          title="This is my Portfolio"
          img={testImage}
          raised="2400"
          needed="5000"
        />
      </div>
      <div className="my-4 mx-auto">
        <Card
          id="4"
          title="This is my Portfolio"
          img={testImage}
          raised="3600"
          needed="5000"
        />
      </div>
      <div className="my-4 mx-auto">
        <Card
          id="5"
          title="This is my Portfolio"
          img={testImage}
          raised="4800"
          needed="5000"
        />
      </div>
      <div className="my-4 mx-auto">
        <Card
          id="6"
          title="This is my Portfolio"
          img={testImage}
          raised="1400"
          needed="5000"
        />
      </div>
    </div>
  );
}

export default CrowdFunding;
 */
