import { motion } from "framer-motion";

import testImage from "../assets/images/test.jpg";

import useCrowdFunding from "../hooks/use-crowdFunding";
import { Card } from "../ui/Card";

/**
 *
 * TODO:-
 *
 *  Must set process.env.REACT_APP_DOMAIN to domain name ex:- localhost:4000 (if not og:url will fail)
 *
 */

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

function CFContent({ data }) {
  /**
   * Custom hook for handling crowd funding logic and styles.
   * @property {string} resizeStyles - The styles for the MedicalExpenses component based on window size.
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
      {data.map((campaign) => {
        return (
          <li key={campaign._id} className="my-4 mx-auto">
            <Card
              id={campaign._id}
              title={campaign.title}
              img={testImage}
              raisedAmount={campaign.raisedAmount}
              targetAmount={campaign.targetAmount}
            />
          </li>
        );
      })}
    </motion.ul>
  );
}

export default CFContent;
