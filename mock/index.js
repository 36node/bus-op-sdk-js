const alerts = require("./alert");
const faults = require("./fault");
const warnings = require("./warning");

const myRouter = (req, res, next) => {
  /** example */
  // if (req.path === "/sessions" && req.method === "POST") {
  //   req.body.token = TOKEN;
  // }
  next();
};

const rewrites = {};

/**
 * mock
 *
 * @param {object} opt mock options
 * @param {number} opt.count how many pets to be generated
 */
const mock = () => ({
  /**
   * mock data
   */
  db: {
    alerts,
    faults,
    warnings,
  },

  /**
   * rewrite
   */
  rewrites,

  routers: [myRouter],
});

module.exports = mock;
