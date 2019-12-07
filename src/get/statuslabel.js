/*jshint esversion: 6*/

/**
 * Translates a Eurostat status id into a status label
 * @param {Object} ds jsonstat dataset instance
 * @param {string} s Status id
 * @returns {string} Status label
 */
export default function getStatusLabel(ds,s){
  return ds.extension.status.label[s];
}
