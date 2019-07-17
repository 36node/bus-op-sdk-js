const _ = require("lodash");
const faker = require("faker");

const cookAlerts = require("./alert");
const faults = require("./fault");
const cookVehicles = require("./vehicle");
const cookWarnings = require("./warning");
const statisticsAlert = require("./statisticsAlert");
const statisticsWarning = require("./statisticsWarning");
const { cookStages, cookTickets, cookComments } = require("./ticket");

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
  const comments = cookComments({ users, tickets });

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
    const ticketReg = /^\/tickets\/(.+)$/;
    const match = ticketReg.exec(req.path);
    if (match && req.method === "PATCH") {
      const { state, stage, updatedBy } = req.body;
      const ticket = tickets.find(t => t.id === match[1]);
      ticket.events = ticket.events || [];

      if (stage && stage !== ticket.stage.id) {
        ticket.events.push({
          id: faker.random.uuid(),
          createdAt: Date.now(),
          createdBy: updatedBy,
          name: "STAGE",
          from: ticket.stage.id,
          to: stage,
        });
      }

      if (state && state !== ticket.state) {
        const name = state === "OPEN" ? "REOPEN" : "CLOSE";
        ticket.events.push({
          id: faker.random.uuid(),
          createdAt: Date.now(),
          createdBy: updatedBy,
          name: name,
        });
      }
    }

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
      comments,
    },

    /**
     * rewrite
     */
    rewrites,

    routers: [myRouter],
  };
};

module.exports = mock;
