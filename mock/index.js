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
  const alerts = cookAlerts(vehicles);
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
    const ticketEventReg = /^\/tickets\/(.+)\/events$/;
    const match = ticketEventReg.exec(req.path);
    if (match && req.method === "POST") {
      const { to, name, alerts: bindAlerts = [], createdBy } = req.body;
      const ticket = tickets.find(t => t.id === match[1]);

      switch (name) {
        case "CLOSE":
          ticket.state = "CLOSED";
          ticket.updatedAt = new Date().toISOString();
          break;
        case "REOPEN":
          ticket.state = "OPEN";
          ticket.updatedAt = new Date().toISOString();
          break;
        case "STAGE":
          ticket.stage = to;

          const closeStage = stages.find(s => s.name === "已关闭");

          if (to === closeStage.id) {
            ticket.state = "CLOSE";
          }

          ticket.updatedAt = new Date().toISOString();
          break;
        case "BIND_ALERT":
          ticket.alerts.push(...bindAlerts);
          ticket.updatedAt = new Date().toISOString();

          // 更新报警
          alerts.forEach(a => {
            if (bindAlerts.includes(a.id)) {
              a.state = "CLOSED";
              a.handleWay = "工单";
              a.handler = createdBy;
              a.handleAt = new Date().toISOString();
              a.ticket = ticket.id;
            }
          });
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

    // 新建ticket, 设置默认stage
    if (req.path === "/tickets" && req.method === "POST") {
      const {
        events = [],
        alerts: createAlerts = [],
        createdBy,
        ...rest
      } = req.body;

      const newTicket = {
        id: faker.random.uuid(),
        ...rest,
        alerts: createAlerts,
        createdBy,
        stage: stages[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

        events: [
          ...events.map(e => ({
            ...e,
            id: faker.random.uuid(),
            createdAt: new Date().toISOString(),
          })),
          {
            id: faker.random.uuid(),
            name: "CREATE",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            alerts: req.body.alerts,
            createdBy,
          },
        ],
      };

      alerts.forEach(a => {
        if (createAlerts.includes(a.id)) {
          a.state = "CLOSED";
          a.handleWay = "工单";
          a.handler = createdBy;
          a.handleAt = new Date().toISOString();
          a.ticket = newTicket.id;
        }
      });

      tickets.push(newTicket);

      return res.jsonp(newTicket);
    }

    // ticket 的全局搜索
    if (req.path === "/tickets" && req.method === "GET") {
      const { q } = req.query;
      if (q) {
        const ts = tickets.filter(
          t =>
            t.id.slice(-8) === q ||
            t.vehicle === q ||
            t.vehicleNo === q ||
            t.alerts.map(a => a.slice(-8)).includes(q)
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
