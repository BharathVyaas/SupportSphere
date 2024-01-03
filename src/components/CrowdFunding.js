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
  const [panelStyles, setPanelStyles] = useState("ms-[260px] grid grid-cols-2");

  /**
   * Effect hook to handle panel toggle events and update styles accordingly.
   */
  useEffect(() => {
    const handlePanelToggle = (showPanel) => {
      setPanelStyles(
        showPanel ? "ms-[260px] grid grid-cols-2" : "ms-[0px] grid grid-cols-3"
      );
    };

    EventEmitter.on("togglePanel", handlePanelToggle);

    return () => EventEmitter.off("togglePanel", handlePanelToggle);
  }, []);

  /**
   * Render the crowdfunding component.
   * @returns {JSX.Element} The rendered React element.
   */
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
