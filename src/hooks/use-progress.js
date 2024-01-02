import { useCallback, useState } from "react";

/**
 * Class representing a store for progress-related data.
 * @class
 */
class Store {
  /**
   * Create a Store instance.
   * @constructor
   * @param {string} id - The identifier for the progress container.
   */
  constructor(id) {
    /**
     * The unique identifier for the progress container.
     * @type {string}
     */
    this.id = id;

    /**
     * Cached keyframes for the animation.
     * @type {string|undefined}
     */
    this.keyframes = undefined;

    /**
     * Cached reference to the progress container element.
     * @type {HTMLElement|undefined}
     */
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
  let x = 0;
  let percent = 0;
  let keyframes = `@keyframes ${animationName} {`;

  while (x <= progress) {
    keyframes += createFrame(percent, x);
    percent += 5;
    x += x <= progress ? progress * 0.05 : 0;
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
  const [store] = useState(new Store(id));

  /**
   * Updates the background image of the progress container based on the progress percentage.
   * @function
   * @returns {void}
   */
  const updateProgress = useCallback(() => {
    const progressContainer = store.getProgressContainer();
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
  }, [progress, store]);

  /**
   * Animates the progress container using keyframes.
   * @function
   * @returns {void}
   */
  const animateProgress = useCallback(() => {
    const progressContainer = store.getProgressContainer();
    if (progressContainer) {
      const animationName = `translateXAnimation-${id}-${Date.now()}`;
      const progressAnimationKeyframes = store.getKeyframes(
        true,
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

      progressContainer.style.animation = `${animationName} 1.3s 1 forwards`;
    }
  }, [id, progress, store]);

  return { updateProgress, animateProgress };
}
