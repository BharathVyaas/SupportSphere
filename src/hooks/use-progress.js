import { useCallback } from "react";

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

/**
 * Custom hook for handling progress updates and animations.
 * @function
 * @param {number} progress - The progress percentage.
 * @param {string} id - The identifier for the progress container.
 * @returns {Object} - An object containing functions for updating and animating progress.
 */
export function useProgress(progress, id) {
  /**
   * Updates the background image of the progress container based on the progress percentage.
   * @function
   * @inner
   * @returns {void}
   */
  const updateProgress = useCallback(() => {
    const progressContainer = document.querySelector(`#progressContainer${id}`);
    if (progressContainer) {
      progressContainer.style.backgroundImage = `
          radial-gradient(
            closest-side,
            rgba(255, 255, 255, 0.357) 60%,
            #32076360
          ),
          conic-gradient(#32076360 ${progress}%, #ecf0f1 ${0}%)
        `;
    }
  }, [id, progress]);

  /**
   * Animates the progress container using keyframes.
   * @function
   * @inner
   * @returns {void}
   */
  const animateProgress = useCallback(() => {
    const progressContainer = document.querySelector(`#progressContainer${id}`);
    if (progressContainer) {
      const animationName = `translateXAnimation-${id}`;
      const progressAnimationKeyframes = generateKeyframes(
        animationName,
        Number(progress)
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
  }, [id, progress]);

  return { updateProgress, animateProgress };
}
