const _ = require("lodash");
const faker = require("faker");

const cookAlerts = require("./alert");
const faults = require("./fault");
const cookVehicles = require("./vehicle");
const cookWarnings = require("./warning");
const statisticsAlert = require("./statisticsAlert");
const statisticsWarning = require("./statisticsWarning");
const { cookStages, cookTickets } = require("./ticket");

const defaultUsers = [
  {
    id: 1,
    name: "张三",
    avatar:
      "http://www.sucaijishi.com/uploadfile/2014/0524/20140524012041558.png",
  },
];

/**
 * mock
 *
 * @param {object} opt mock options
 * @param {number} opt.count how many pets to be generated
 */
const mock = ({
  users = defaultUsers,
  warningCount = 1000,
  vehicles = cookVehicles({ count: 2 }),
}) => {
  const alerts = cookAlerts(warningCount, vehicles);
  const warnings = cookWarnings(warningCount, vehicles);
  const stages = cookStages();
  const tickets = cookTickets({ users, alerts, vehicles, stages });

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

    /**
     * ticket router
     */
    const ticketReg = /^\/tickets\/(.+)\/events$/;
    const match = ticketReg.exec(req.path);
    if (match && req.method === "POST") {
      const { to, name, alerts = [] } = req.body;
      const ticket = tickets.find(t => t.id === match[1]);

      switch (name) {
        case "CLOSE":
          ticket.state = "CLOSED";
          ticket.updatedAt = new Date();
          break;
        case "REOPEN":
          ticket.state = "OPEN";
          ticket.updatedAt = new Date();
          break;
        case "STAGE":
          ticket.stage = to;
          ticket.updatedAt = new Date();
          break;
        case "BIND_ALERT":
          ticket.alerts.push(...alerts);
          ticket.updatedAt = new Date();
          break;
        default:
          break;
      }

      ticket.events = ticket.events || [];

      const newEvent = {
        ...req.body,
        id: faker.random.uuid(),
        createdAt: new Date().toISOString(),
      };
      ticket.events.push(newEvent);

      return res.jsonp(newEvent);
    }

    // ticket 的全局搜索
    if (req.path === "/tickets" && req.method === "GET") {
      const { q } = req.query;
      if (q) {
        const ts = tickets.filter(
          t =>
            t.id === q ||
            t.vehicle.id === q ||
            t.vehicle.no === q ||
            t.alerts.includes(q)
        );
        return res.jsonp(ts);
      }
    }

    next();
  };

  const rewrites = {
    "/statistics/alert*": "/statisticsAlert$1",
    "/statistics/warning*": "/statisticsWarning$1",
  };

  return {
    /**
     * mock data
     */
    db: {
      alerts,
      faults,
      warnings,
      statisticsAlert,
      statisticsWarning,
      stages,
      tickets,
      // comments,
    },

    /**
     * rewrite
     */
    rewrites,

    routers: [myRouter],
  };
};

module.exports = mock;
