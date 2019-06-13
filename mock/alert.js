const faker = require("faker");
const _ = require("lodash");

const vehicles = require("./vehicle");
const companies = require("./company");
const producers = require("./producers");
const { Faults } = require("./utils/constants");

module.exports = _.range(100).map(() => {
  const c = faker.random.arrayElement(companies);
  const l = faker.random.arrayElement(c.lines);
  const f = faker.random.arrayElement(Faults);
  const v = faker.random.arrayElement(vehicles);
  const state = faker.random.arrayElement(["TODO", "DOING", "DONE"]);
  const producer = faker.random.arrayElement(producers);

  return {
    id: faker.random.uuid(),
    lastAt: new Date(), // 最近一次报警时间
    startedAt: new Date(), // 开始报警的时间
    code: f.code.toString(16), // 故障码 16进制
    company: c.name, // 公司
    count: faker.random.number({ min: 1, max: 1000 }), // 次数
    level: f.level, // 故障等级
    line: l.name, // 线路
    name: f.name, // 故障名称
    plate: v.plate, // 车牌号
    state,
    vehicle: v.id,
    vehicleModel: v.model, // 车型
    vehicleNo: v.no, // 车辆自编号
    vehicleProducer: producer,
  };
});
