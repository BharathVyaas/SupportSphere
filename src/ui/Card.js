import { motion } from "framer-motion";
import { useEffect } from "react";

import { useProgress } from "../hooks/use-progress";

/**
 * Variants for the animation of the entire card.
 * @constant
 * @type {Object}
 * @property {Object} visible - Visible state with spring animation.
 * @property {number} visible.x - X-axis position.
 * @property {number} visible.y - Y-axis position.
 * @property {Object} visible.transition - Transition settings.
 * @property {string} visible.transition.type - Type of animation (spring).
 * @property {number} visible.transition.stiffness - Stiffness of the spring.
 * @property {number} visible.transition.staggerChildren - Stagger animation of children.
 * @property {Object} hidden - Hidden state without animation.
 * @property {number} hidden.x - X-axis position.
 * @property {number} hidden.y - Y-axis position.
 */
const cardVariants = {
  visible: {
    x: 0,
    y: 0,
    transition: {
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

/**
 * Variants for the animation of the card description elements.
 * @constant
 * @type {Object}
 * @property {Object} visible - Visible state with spring animation.
 * @property {number} visible.x - X-axis position.
 * @property {number} visible.y - Y-axis position.
 * @property {number} visible.scale - Scale of the element.
 * @property {Object} visible.transition - Transition settings.
 * @property {string} visible.transition.type - Type of animation (spring).
 * @property {number} visible.transition.stiffness - Stiffness of the spring.
 * @property {Object} hidden - Hidden state without animation.
 * @property {number} hidden.x - X-axis position.
 * @property {number} hidden.y - Y-axis position.
 * @property {number} hidden.scale - Scale of the element.
 */
const cardDescriptionVariants = {
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
  hidden: {
    x: 10,
    y: 30,
    scale: 0.5,
  },
};

/**
 * Card component representing a project fundraising list item.
 * @component
 * @param {Object} props - The properties of the Card component.
 * @param {string} props.id - The unique identifier for the card.
 * @param {string} props.title - The title of the project.
 * @param {string} props.img - The source URL of the project image.
 * @param {string} props.raisedAmount - The amount raised for the project.
 * @param {string} props.targetAmount - The total amount needed for the project.
 * @returns {JSX.Element} - The Card component JSX.
 */
export function Card(props) {
  const id = props.id;
  const title = props.title;
  const imgSrc = props.img;
  const progress = Math.floor((props.raisedAmount / props.targetAmount) * 100);
  const formattedRaisedAmount = Number(props.raisedAmount).toLocaleString(
    "en-US"
  );
  const formattedTargetAmount = Number(props.targetAmount).toLocaleString(
    "en-US"
  );

  const { updateProgress, animateProgress } = useProgress(progress, id);

  useEffect(() => {
    updateProgress();
    animateProgress();
  }, [progress, id, animateProgress, updateProgress]);

  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="inline-block w-[280px] h-[310px] rounded-xl shadow-xl border-solid border-[2px] border-softPurple"
    >
      {/* Card Head */}
      <figure className="border-b-2 border-softPurple h-[auto] shadow-xl rounded-t-xl">
        <img
          src={imgSrc}
          width="280"
          height="180"
          className="h-[180px] rounded-t-xl"
          alt={title}
        />
      </figure>
      {/* Card Body */}
      <figcaption className="mt-2 flex justify-between">
        <div className="w-full">
          {/* Card Title */}
          <h2 className="ms-[9%] w-[84%] line-clamp-1" title={title}>
            {title}
          </h2>
          {/* Card Description */}
          <div className="flex justify-between w-[100%]">
            <div className="w-[26%] grid place-content-end">
              <motion.p
                variants={cardDescriptionVariants}
                id={`progressContainer${id}`}
                className="grid place-content-center w-[60px] h-[60px] rounded-full mt-[0.6rem]"
              >
                <span className="font-[600]">{progress}%</span>
              </motion.p>
            </div>

            <p className="inline-flex flex-col border-e-[3px] py-2 border-lightText w-[33%]">
              <motion.span
                variants={cardDescriptionVariants}
                className="py-1 font-semibold"
              >
                Raised
              </motion.span>
              <motion.span variants={cardDescriptionVariants}>
                {formattedRaisedAmount}
              </motion.span>
            </p>

            <p
              variants={cardDescriptionVariants}
              className="inline-flex flex-col py-2 w-[33%]"
            >
              <motion.span
                variants={cardDescriptionVariants}
                className="py-1 font-semibold w-[90%]"
              >
                Target
              </motion.span>
              <motion.span
                variants={cardDescriptionVariants}
                className="overflow-hidden w-[90%]"
              >
                {formattedTargetAmount}
              </motion.span>
            </p>
          </div>
        </div>
      </figcaption>
    </motion.section>
  );
}
