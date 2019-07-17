const faker = require("faker");
const companies = require("./company");
const cs = require("./utils/constants");
const _ = require("lodash");
const utils = require("./utils");

module.exports = ({ count }) =>
  _.range(count).map(() => {
    const c = faker.random.arrayElement(companies);
    const l = faker.random.arrayElement(c.lines);

    return {
      id: `LSFD13201GC${faker.random.number({ min: 1000000, max: 9000000 })}`,
      brands: faker.random.word(), // 品牌
      capacity: faker.random.number({ min: 10, max: 100 }), // int32 额定载客人数
      company: c.name, // 公司
      convoy: faker.random.word(), // 车队
      emission: "UNKNOWN", //排放标准 c1~c3 国标I 国标II 国标III
      engineNo: "sdfsdfs", // 发动机编号
      iccid: "sdsdfsdf", // 车辆 iccid 号
      length: 32, // float 车辆长度
      lifeYear: 8, // int32 使用年限
      line: l.name, // 线路
      model: "车型", // 车型
      modelBrief: "简称", // 车型简称
      modified: false, // 是否改装
      no: `zj-${faker.random.number({ min: 100, max: 900 })}`, // 自编号
      place: "浦东停车场", // 停车位置
      plate: `沪A-${faker.random.number({ min: 1000, max: 9000 })}`, // 车牌
      plateAt: new Date(), // 上牌日期
      powerBy: "ELECTRIC", // 能源类型
      producer: "宇通", // 生产商
      purchaseAt: new Date(), // 购买日期
      remark: faker.random.word(), // 备注
      repairing:
        faker.random.boolean() &&
        faker.random.boolean() &&
        faker.random.boolean(),
      scrapped: false,
      seats: 100, // 座位数
      type: "大型普通客车", // 客车类型，例如大型普通客车
      validTill: new Date(), // 报废日期
      /**
       * 下方实时数据
       */
      lastBeatAt: new Date(), //  上一次心跳时间
      lastLoginAt: new Date(), //  上一次登录系统时间
      lastLogoutAt: new Date(), //  上一次登出系统时间
      lastReportedAt: new Date(), //  上一次有数据上报的时间
      alarmLevel: utils.randomLevel(), // 报警 elvel
      alarms: ["10c11602"],
      status: faker.random.arrayElement(cs.VehicleStatus),
      chargeStatus: utils.randomChargeStatus(),
      mileage: 108213.8,
      voltage: 542.7,
      current: 5,
      soc: 0.88,
      dcStatus: faker.random.arrayElement(cs.DcStatus),
      shift: faker.random.arrayElement(cs.Shift),
      resistance: 2864,
      aptv: 0,
      brake: 0.01,
      motors: [
        {
          no: 1,
          status: "OFF",
          controlTemp: 45,
          speed: 0,
          torque: 0,
          temp: 63,
          voltage: 546,
          current: 0,
        },
      ],
      location: {
        lng: faker.random.number({ min: 121, max: 122, precision: 0.00001 }),
        lat: faker.random.number({ min: 31, max: 32, precision: 0.00001 }),
      },
      extreme: {
        maxVoltageSubSysNo: 1,
        maxVoltageSingNo: 41,
        maxVoltage: 3.351,
        minVoltageSubSysNo: 1,
        minVoltageSingNo: 100,
        minVoltage: 3.348,
        maxNtcSubSysNo: 1,
        maxNtcNo: 5,
        maxNtc: 33,
        minNtcSubSysNo: 1,
        minNtcNo: 37,
        minNtc: 30,
      },
      customExt: {
        pressure1: 648,
        pressure2: 652,
        batteryVoltage: 26.5,
        dcov: -873,
        dcoc: -855.6,
        cv: 542.7,
        rc: -995,
        cp: 66,
        totalCharge: 429494300.3,
        totalDischarge: 98081.3,
        bpiRes: 2500,
        bniRes: 2500,
        motorContTemp: 45,
        airMode: "OFF",
        airTemp: 25,
        insideTemp: 25,
        outsideTemp: 24,
        middleDoorStatus: faker.random.arrayElement(cs.DoorStatus),
        frontDoorStatus: faker.random.arrayElement(cs.DoorStatus),
        handbrakeStatus: faker.random.arrayElement(cs.HandbrakeStatus),
        keyStatus: faker.random.arrayElement(cs.KeyStatus),
      },
    };
  });
