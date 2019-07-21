const faker = require("faker");
const _ = require("lodash");

const companies = require("./company");
const { Faults } = require("./utils/constants");

const generate = (count = 100, vehicles = []) => {
  return _.range(100).map(() => {
    const c = faker.random.arrayElement(companies);
    const l = faker.random.arrayElement(c.convoys);
    const f = faker.random.arrayElement(Faults);
    const v = faker.random.arrayElement(vehicles);
    const state = faker.random.arrayElement(["OPEN", "CLOSED"]);

    return {
      id: faker.random.uuid(),
      createdAt: new Date(), // 创建时间
      updatedAt: new Date(), // 更新时间
      ns: v.ns, // 报警所属命名空间
      startedAt: new Date(), // 开始报警的时间
      lastAt: new Date(), // 最近一次报警时间
      code: f.code.toString(16), // 故障码 16进制
      count: faker.random.number({ min: 1, max: 1000 }), // 次数
      level: f.level, // 故障等级
      line: l.name, // 线路
      name: f.name, // 故障名称
      plate: v.plate, // 车牌号
      state, //状态: 开启，关闭
      vehicle: v.id, // 车辆车架号
      vehicleModel: v.model, // 车型
      vehicleBriefModel: v.modelBrief, // 车型简称
      vehicleNo: v.no, // 车辆自编号
      vehicleMileage: faker.random.number({ min: 100, max: 1000 }), // 车辆里程
      vehicleYearsFromPlate: faker.random.number({ min: 1, max: 5 }), // 车辆使用年限
    };
  });
};

module.exports = generate;
