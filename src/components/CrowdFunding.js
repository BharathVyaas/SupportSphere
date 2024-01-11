import React from "react";
import { Card } from "../ui/Card";
import testImage from "../assets/images/test.jpg";
import useCrowdFunding from "../hooks/use-crowdFunding";

/**
 * React component for displaying crowdfunding projects.
 * @component
 * @returns {JSX.Element} The rendered React element for crowdfunding.
 */
function CrowdFunding() {
  /**
   * Custom hook for handling crowd funding logic and styles.
   * @type {Object}
   * @property {string} resizeStyles - The styles for the crowdfunding component based on window size.
   */
  const { resizeStyles } = useCrowdFunding();
  /**
   * Render the crowdfunding component.
   * @returns {JSX.Element} The rendered React element.
   */
  return (
    // Tailwind replacement mt-[5rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    <ul className={resizeStyles}>
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
