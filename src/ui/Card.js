import { motion } from "framer-motion";
import { useEffect } from "react";

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
export function Card({ id, title, img, progress, raised, needed }) {
  useEffect(() => {
    /**
     * Updates the background image of the progress container based on the progress percentage.
     * @function
     * @inner
     * @param {string} `#progressContainer${id}` - The ID of the progress container element.
     * @returns {void}
     */
    const updateProgressContainer = () => {
      const progressContainer = document.querySelector(
        `#progressContainer${id}`
      );

      if (progressContainer) {
        progressContainer.style.backgroundImage = `
        radial-gradient(
          closest-side,
          rgba(255, 255, 255, 0.357) 60%,
          #32076360
        ),
        conic-gradient(#32076360 ${progress}%, #ecf0f1 ${(
          100 - Number(progress)
        ).toString()}%)
      `;
      }
    };

    updateProgressContainer();
  }, [progress]);

  useEffect(() => {
    /**
     * Creates a frame of keyframes for the translation animation.
     * @function
     * @inner
     * @param {number} percent - The percentage value of the keyframe.
     * @param {number} x - The x value for the conic gradient.
     * @returns {string} - The frame of keyframes for the translation animation.
     */
    const createFrame = (percent, x) => {
      return `${percent}% {
        background: radial-gradient(
          closest-side,
          rgba(255, 255, 255, 0.357) 0%,
          #32076360
        ),
        conic-gradient(#32076350 ${x}%, #ecf0f1 ${0}%)
      }`;
    };

    /**
     * Generates the keyframes for the translation animation.
     * @function
     * @inner
     * @param {string} animationName - The name of the animation.
     * @param {number} progress - The progress percentage.
     * @returns {string} - The keyframes for the translation animation.
     */
    const generateKeyframes = (animationName, progress) => {
      let x = 0;
      let percent = 0;
      let keyframes = `@keyframes ${animationName} {`;

      while (x <= progress) {
        keyframes += createFrame(percent, x);
        percent += 2;
        x += x <= progress ? progress * 0.02 : 0;
      }

      keyframes += `}`;

      return keyframes;
    };

    const progressContainer = document.querySelector(`#progressContainer${id}`);
    if (progressContainer) {
      const animationName = `translateXAnimation-${id}`;
      const progressAnimationKeyframes = generateKeyframes(
        animationName,
        Number(progress),
        100 - Number(progress)
      );

      const styleSheet = document.styleSheets[0];
      if (
        !styleSheet ||
        !styleSheet.cssRules[0] ||
        styleSheet.cssRules[0].name !== animationName
      ) {
        styleSheet.insertRule(
          progressAnimationKeyframes,
          styleSheet.cssRules.length
        );
      }

      progressContainer.style.animation = `${animationName} 1.3s 1 forwards`;
    }
  }, []);

  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="inline-block w-[260px] h-[310px] rounded-xl shadow-lg border-solid border-[2px] border-softPurple"
    >
      {/* card head */}
      <figure className="border-b-2 h-[auto] shadow-md relative after:w-[96%] after:absolute after:top-[101%] after:left-[2%] after:h-[0.2rem] after:bg-softPurple">
        <img
          src={img}
          width="260"
          height="180"
          className="h-[180px] rounded-t-xl"
          alt="test"
        />
      </figure>
      {/* card body */}
      <figcaption className="mt-3 flex justify-between">
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
