import { useCallback, useRef } from "react";

/**
 * Class representing a store for progress-related data.
 */
class Store {
  /**
   * Create a Store.
   * @param {string} id - The identifier for the progress container.
   */
  constructor(id) {
    this.id = id;
    this.keyframes = undefined;
    this.progressContainer = undefined;
  }

  /**
   * Get the progress container element.
   * @returns {HTMLElement|null} - The progress container element or null if not found.
   */
  getProgressContainer() {
    if (!this.progressContainer) {
      this.progressContainer = document.querySelector(
        `#progressContainer${this.id}`
      );
    }

    return this.progressContainer;
  }

  /**
   * Get or generate keyframes for a given animation.
   * @param {boolean} stale - Flag to refetch data or change animation.
   * @param {string} animationName - The name of the animation.
   * @param {number} progress - The progress percentage.
   * @returns {string} - The keyframes for the translation animation.
   */
  getKeyframes(stale, animationName, progress) {
    if (!this.keyframes || stale) {
      this.keyframes = generateKeyframes(animationName, progress);
    }

    return this.keyframes;
  }
}

/**
 * Creates a frame of keyframes for the translation animation.
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
 * @param {string} animationName - The name of the animation.
 * @param {number} progress - The progress percentage.
 * @returns {string} - The keyframes for the translation animation.
 */
const generateKeyframes = (animationName, progress) => {
  let keyframes = `@keyframes ${animationName} {`;

  for (let percent = 0; percent <= 100; percent += 1) {
    const x = (progress / 100) * percent;
    keyframes += createFrame(percent, x);
  }

  keyframes += `}`;

  return keyframes;
};

/**
 * Custom hook for handling progress updates and animations.
 * @param {number} progress - The progress percentage.
 * @param {string} id - The identifier for the progress container.
 * @returns {Object} - An object containing functions for updating and animating progress.
 */
export function useProgress(progress, id) {
  /**
   * Ref for the Store instance.
   * @type {React.MutableRefObject<Store>}
   */
  const storeRef = useRef(new Store(id));

  /**
   * Ref for the animation name.
   * @type {React.MutableRefObject<string>}
   */
  const animationNameRef = useRef(`translateXAnimation-${id}`);

  /**
   * Updates the background image of the progress container based on the progress percentage.
   * @type {Function}
   */
  const updateProgress = useCallback(() => {
    const progressContainer = storeRef.current.getProgressContainer();
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
  }, [progress]);

  /**
   * Animates the progress container using keyframes.
   * @type {Function}
   */
  const animateProgress = useCallback(() => {
    const progressContainer = storeRef.current.getProgressContainer();
    if (progressContainer) {
      const animationName = animationNameRef.current;
      const progressAnimationKeyframes = generateKeyframes(
        animationName,
        Number(progress)
      );

      const styleSheet = document.styleSheets[0];
      if (
        !styleSheet ||
        !styleSheet.cssRules[0] ||
        !styleSheet.cssRules[0].name ||
        styleSheet.cssRules[0].name !== animationName
      ) {
        styleSheet.insertRule(
          progressAnimationKeyframes,
          styleSheet.cssRules.length
        );
      }

      progressContainer.style.animation = `${animationName} .9s 1 forwards`;
    }
  }, [id, progress]);

  return { updateProgress, animateProgress };
}
