const _ = require("lodash");
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
      const data = req.path.indexOf("Alert") !== -1 ? alerts : warnings;
      let arr = [];
      group.forEach(item => {
        const tmp = [...new Set(_.filter(data, item).map(x => x[item]))];
        if (arr.length) {
          let newArr = [];
          arr.forEach(a => {
            tmp.forEach(t => {
              const newA = _.clone(a);
              newA[item] = t;
              newA.count = faker.random.number({ min: 1, max: 1000 });
              newA.times = faker.random.number({ min: 1, max: 1000 });
              newArr.push(newA);
            });
          });
          arr = newArr;
        } else {
          tmp.forEach(t => {
            const d = {
              count: faker.random.number({ min: 1, max: 1000 }),
              times: faker.random.number({ min: 1, max: 1000 }),
            };
            d[item] = t;
            arr.push(d);
          });
        }
      });
      return res.json(arr);
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
const mock = ({ warningCount = 1000, vehicles = require("./vehicle") }) => ({
  /**
   * mock data
   */
  db: {
    alerts: alerts(warningCount, vehicles),
    faults,
    warnings: warnings(warningCount, vehicles),
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
