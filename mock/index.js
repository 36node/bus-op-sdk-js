const faker = require("faker");

const alerts = require("./alert");
const faults = require("./fault");
const warnings = require("./warning");
const statisticsAlert = require("./statisticsAlert");
const statisticsWarning = require("./statisticsWarning");

const myRouter = (req, res, next) => {
  if (req.path.indexOf("statistics") !== -1) {
    const { group } = req.query;
    if (group && group.length) {
      const tmp = [];
      const a =
        group[0] === "level"
          ? [1, 2]
          : [faker.random.word(), faker.random.word()];
      const b =
        group[1] === "level"
          ? [1, 2]
          : [faker.random.word(), faker.random.word()];
      a.forEach(item => {
        b.forEach(item2 => {
          const t = {};
          t[group[0]] = item;
          t[group[1]] = item2;
          t.count = faker.random.number({ min: 1, max: 1000 });
          t.times = faker.random.number({ min: 1, max: 1000 });
          tmp.push(t);
        });
      });
      return res.json(tmp);
    } else {
      return res.json([
        {
          count: faker.random.number({ min: 1, max: 1000 }),
          times: faker.random.number({ min: 1, max: 1000 }),
        },
      ]);
    }
  }
  next();
};

const rewrites = {
  "/statistics/alert*": "/statisticsAlert$1",
  "/statistics/warning*": "/statisticsWarning$1",
};

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
    statisticsAlert,
    statisticsWarning,
  },

  /**
   * rewrite
   */
  rewrites,

  routers: [myRouter],
});

module.exports = mock;
