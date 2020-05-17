/**
 * Gets the value of an environment variable.
 *
 * @param {string} key - Environment variable key
 * @param {string|number|boolean} defaultValue - Value will be used if no environment
 * variable exists for the given key
 * @returns {string|number|boolean} The environment variable value
 */
export const env = (key, defaultValue = null) => {
  const value = process.env[key];

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === '(empty)') return '';
  return value || defaultValue;
};

/**
 * Normalize a port into a number, string, or false.
 *
 * @param {number|string|boolean} value - The port value
 * @returns {number|boolean} - Normalized port value or false
 */
export const normalizePort = value => {
  const port = parseInt(value, 10);
  if (Number.isNaN(port)) return port;
  return port >= 0 ? port : false;
};
