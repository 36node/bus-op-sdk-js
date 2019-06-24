const faker = require("faker");
const _ = require("lodash");

const vehicles = require("./vehicle");
const companies = require("./company");
const producers = require("./producers");

const { WarningTypes } = require("./utils/constants");

module.exports = _.range(100).map(() => {
  const c = faker.random.arrayElement(companies);
  const l = faker.random.arrayElement(c.convoys);
  const v = faker.random.arrayElement(vehicles);
  const producer = faker.random.arrayElement(producers);
  const type = faker.random.arrayElement(Object.keys(WarningTypes));
  const name = faker.random.arrayElement(WarningTypes[type]);

  return {
    id: faker.random.uuid(),
    createdAt: new Date(), // 创建时间
    updatedAt: new Date(), // 更新时间
    deleted: faker.random.boolean(), // 是否已经删除
    deletedAt: new Date(), // 删除时间
    count: faker.random.number({ min: 1, max: 1000 }), // 次数
    line: l.name, // 线路
    name, // 预警名称
    plate: v.plate, // 车牌号
    lastAt: new Date(), // 预警最后一次的时间
    type, // 预警类型
    vehicle: v.no, // 车辆车架号
    vehicleModel: v.model, // 车型
    vehicleBriefModel: v.modelBrief, // 车型简称
    vehicleNo: v.no, // 车辆自编号
    vehicleProducer: producer, // 车辆生产商
    vehiclePlateAt: new Date(), // 车辆上牌日期
    vehicleYearsFromPlate: faker.random.number({ min: 1, max: 5 }), // 车辆使用年限
    vehicleMileage: faker.random.number({ min: 100, max: 1000 }), // 车辆里程
  };
});
