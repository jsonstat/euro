/*jshint esversion: 6*/

/**
 * Safely checks the existance of property f in object q
 * @param {Object} q Object
 * @param {string} f Property name
 * @returns {boolean} Similar implicit query filtered for the last time period
 */
export default function hasProp(q, f){
  return Object.prototype.hasOwnProperty.call(q, f);
}
