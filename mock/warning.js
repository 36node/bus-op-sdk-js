const faker = require("faker");
const _ = require("lodash");

const { WarningTypes, Tires } = require("./utils/constants");

const fakeWarningData = type => {
  switch (type) {
    case "BATTERY_EXCEPTION":
      return {
        temperature: faker.random.number({ min: 10, max: 100 }),
        soc: faker.random.number({ min: 10, max: 100 }),
      };
    case "INSULATION_EXCEPTION":
      return {
        resistance: faker.random.number({ min: 0, max: 1000, precision: 2 }),
      };
    case "TYRE_EXCEPTION":
      const tire = faker.random.arrayElement(Tires);
      return {
        tire, // 轮胎
        tp: faker.random.number({ min: 500, max: 1000 }), // 胎压
        tt: faker.random.number({ min: 20, max: 100 }), // 胎温
      };
    default:
      return {};
  }
};

const generate = (count = 100, vehicles = []) => {
  return _.range(count).map(() => {
    const vehicle = faker.random.arrayElement(vehicles);
    const type = faker.random.arrayElement(Object.keys(WarningTypes));
    const name = faker.random.arrayElement(WarningTypes[type]);
    const data = fakeWarningData(type);

    return {
      id: faker.random.uuid(),
      createdAt: faker.date.past(), // 创建时间
      updatedAt: faker.date.past(), // 更新时间
      startAt: faker.date.past(), // 开始时间
      lastAt: faker.date.past(), // 最后发生时间
      deleted: false, // 是否已经删除
      count: faker.random.number({ min: 1, max: 1000 }), // 次数
      line: vehicle.line,
      name, // 预警名称
      type, // 预警类型
      data,
      plate: vehicle.plate, // 车牌号
      ns: vehicle.ns, // 命名空间
      vehicle: vehicle.id, // 车辆车架号
      vehicleModel: vehicle.model, // 车型
      vehicleBriefModel: vehicle.modelBrief, // 车型简称
      vehicleNo: vehicle.no, // 车辆自编号
      vehicleProducer: vehicle.producer, // 车辆生产商
      vehiclePlateAt: vehicle.plateAt, // 车辆上牌日期
      vehicleYearsFromPlate: vehicle.lifeYear, // 车辆使用年限
      vehicleMileage: faker.random.number({ min: 10000, max: 100000 }), // 车辆里程
    };
  });
};

module.exports = generate;
