import { motion } from "framer-motion";
import { useEffect } from "react";

import { useProgress } from "../hooks/use-progress";

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
 * @param {string} props.progress - The progress percentage of the fundraising.
 * @param {string} props.raised - The amount raised for the project.
 * @param {string} props.needed - The total amount needed for the project.
 * @returns {JSX.Element} - The Card component JSX.
 */
export function Card(props) {
  const id = props.id;
  const title = props.title;
  const img = props.img;
  const progress = Math.floor((props.raised / props.needed) * 100);
  const raised = Number(props.raised).toLocaleString("en-US");
  const needed = Number(props.needed).toLocaleString("en-US");

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
      {/* card head */}
      <figure className="border-b-2 border-softPurple h-[auto] shadow-xl rounded-t-xl">
        <img
          src={img}
          width="280"
          height="180"
          className="h-[180px] rounded-t-xl"
          alt="test"
        />
      </figure>
      {/* card body */}
      <figcaption className="mt-2 flex justify-between">
        <div className="w-full">
          {/* card title */}
          <h2 className="ms-[9%] w-[84%] line-clamp-1" title={title}>
            {title}
          </h2>
          {/* card description */}
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

            <p className="inline-flex flex-col border-e-[3px] py-2 border-lightText  w-[33%]">
              <motion.span
                variants={cardDescriptionVariants}
                className="py-1 font-semibold"
              >
                Raised
              </motion.span>
              <motion.span variants={cardDescriptionVariants}>
                {raised}
              </motion.span>
            </p>

            <p
              variants={cardDescriptionVariants}
              className="inline-flex flex-col py-2 w-[33%]"
            >
              <motion.span
                variants={cardDescriptionVariants}
                className="py-1 font-semibold  w-[90%]"
              >
                Needed
              </motion.span>
              <motion.span
                variants={cardDescriptionVariants}
                className="overflow-hidden w-[90%]"
              >
                {needed}
              </motion.span>
            </p>
          </div>
        </div>
      </figcaption>
    </motion.section>
  );
}
