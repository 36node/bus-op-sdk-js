const faker = require("faker");
const _ = require("lodash");

const companies = require("./company");
const { Faults } = require("./utils/constants");

const generate = (vehicles = []) => {
  // 五十辆车， 每辆车生成两到三个 报警
  const alerts = [];

  _.range(50).forEach(() => {
    const vehicle = faker.random.arrayElement(vehicles);
    const alertCount = faker.random.number({ min: 2, max: 4 });

    alerts.push(
      ..._.range(alertCount).map(() => {
        const f = faker.random.arrayElement(Faults);
        const state = faker.random.arrayElement(["OPEN", "CLOSED"]);

        return {
          id: faker.random.uuid(),
          createdAt: faker.date.recent(), // 创建时间
          updatedAt: faker.date.recent(), // 更新时间
          ns: vehicle.ns, // 报警所属命名空间
          startedAt: faker.date.recent(), // 开始报警的时间
          lastAt: faker.date.recent(), // 最近一次报警时间
          code: f.code.toString(16), // 故障码 16进制
          count: faker.random.number({ min: 1, max: 1000 }), // 次数
          level: f.level, // 故障等级
          line: vehicle.name, // 线路
          name: f.name, // 故障名称
          plate: vehicle.plate, // 车牌号
          state, //状态: 开启，关闭
          vehicle: vehicle.id, // 车辆车架号
          vehicleModel: vehicle.model, // 车型
          vehicleBriefModel: vehicle.modelBrief, // 车型简称
          vehicleNo: vehicle.no, // 车辆自编号
          vehicleMileage: faker.random.number({ min: 100, max: 1000 }), // 车辆里程
          vehicleYearsFromPlate: faker.random.number({ min: 1, max: 5 }), // 车辆使用年限
        };
      })
    );
  });

  return alerts;
};

module.exports = generate;
