import mitt from "mitt";
import { defaultConfing } from "./defaultConfig";

// ToDo
// On Emit get where that emit is commig form
// Update Code so that for each type of event when recieving subescriber --
// -- send Default value or current value of that eventType to the callback

/**
 * Class representing an event emitter for managing and dispatching events.
 *
 * rules: Must be followed to keep Things simple
 *
 * 1. Must only be emitted data from context or hooks
 * 2. Each emitted data must contain a type that is included inside defaultConfig.eventTypes
 *
 * @class
 */
export class EventConstructor {
  /**
   * Types of events supported by the event emitter.
   * @type {Array.<string>}
   */
  #types;

  /**
   * Events supported by the event emitter.
   * @type {Array.<string>}
   */
  #events;

  /**
   * Instance of the mitt event emitter library.
   * @type {mitt.Emitter}
   */
  #EventEmmiter;

  /**
   * Stores last events occured with each evenKey value is eventType
   */
  #prevEvent;
  constructor() {
    this.#EventEmmiter = mitt();
    // > 1225 2xl < 1225 xl < 1015 lg < 800 md < 700 sm  < 500 xsm > 500
    this.#types = defaultConfing.eventTypes;
    this.#events = defaultConfing.eventKeys;
    this.#prevEvent = {};
  }

  /**
   * Singleton instance of the EventConstructor.
   * @type {EventConstructor|undefined}
   * @static
   */
  static instance = undefined;

  /**
   * Get the singleton instance of the EventConstructor.
   * @returns {EventConstructor} The EventConstructor instance.
   * @static
   */
  static get EventEmitter() {
    if (!this.instance) this.instance = new EventConstructor();

    return this.instance;
  }

  /**
   * Emit an event with a specified type and payload.
   * @param {string} eventKey - The key identifying the event.
   * @param {Object} options - Options object containing type and payload properties.
   * @param {string} options.type - The type of the event.
   * @param {*} options.payload - The payload data associated with the event.
   * @throws {Error} Throws an error if the eventKey or type is not valid.
   */
  emit(eventKey, { type: eventType, payload }) {
    this.#isValidEvent(eventKey);
    this.#isValidType(eventType);

    console.log("EventEmitter:emit:", eventType);
    // Will only emit if eventType is not same as stored type
    if (this.#prevEvent.eventKey !== eventType) {
      console.log({ eventKey, eventType, payload });
      this.#EventEmmiter.emit(eventKey, payload);
    } else if (eventType === "sideBar") {
      console.log({ eventKey, eventType, payload });
      this.#EventEmmiter.emit(eventKey, payload);
    }

    this.#prevEvent.eventKey = eventType;
  }

  /**
   * Register a callback function to handle a specific event.
   * @param {string} eventKey - The key identifying the event.
   * @param {Function} callback - The callback function to handle the event.
   */
  on(eventKey, callback) {
    this.#isValidEvent(eventKey);
    this.#EventEmmiter.on(eventKey, callback);
  }

  /**
   * Unregister a callback function from handling a specific event.
   * @param {string} eventType - The type of the event.
   * @param {Function} callback - The callback function to unregister.
   */
  off(eventType, callback) {
    this.#EventEmmiter.off(eventType, callback);
  }

  //  Utility function
  #isValidEvent(eventKey) {
    if (!this.#events.includes(eventKey)) {
      throw new Error(
        `EventConstructor.emit: ${eventKey} is not a valid event`
      );
    }
  }

  //  Utility function
  #isValidType(eventType) {
    if (!this.#types.includes(eventType)) {
      throw new Error(
        `EventConstructor.emit: ${eventType} is not a valid type`
      );
    }
  }
}
