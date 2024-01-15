import React from "react";
import { Card } from "../ui/Card";
import testImage from "../assets/images/test.jpg";
import useCrowdFunding from "../hooks/use-crowdFunding";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";

const cardVariants = {
  visible: {
    x: 0,
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 120,
      staggerChildren: 0.02,
    },
  },
  hidden: {
    x: 30,
    y: 60,
  },
};

function CrowdFunding() {
  const medicalExpensesData = useLoaderData();
  console.log(medicalExpensesData);
  /**
   * Custom hook for handling crowd funding logic and styles.
   * @property {string} resizeStyles - The styles for the crowdfunding component based on window size.
   */
  const { resizeStyles } = useCrowdFunding();

  return (
    // Tailwind replacement mt-[5rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    <motion.ul
      className={resizeStyles}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <li className="my-4 mx-auto">
        <Card
          id="1"
          title="My Portfolio Project"
          img={testImage}
          raisedAmount="1500"
          targetAmount="5000"
        />
      </li>
      {medicalExpensesData.map((campaign) => {
        return (
          <li key={campaign._id} className="my-4 mx-auto">
            <Card
              id={campaign._id}
              title={campaign.title}
              img={testImage}
              raisedAmount="1500"
              targetAmount="5000"
            />
          </li>
        );
      })}
    </motion.ul>
  );
}

export default CrowdFunding;
