const faker = require("faker");
const cs = require("./constants");
const producers = require("../producers");
const companies = require("../company");

function randomLevel() {
  return Math.min(
    faker.random.number({ min: 0, max: 3 }),
    faker.random.number({ min: 0, max: 3 }),
    faker.random.number({ min: 0, max: 3 }),
    faker.random.number({ min: 0, max: 3 })
  );
}

function randomProducer() {
  const producer = faker.random.arrayElement(producers);
  return producer.name;
}

function randomModel() {
  const producer = faker.random.arrayElement(producers);
  const model = faker.random.arrayElement(producer.models);
  return {
    producer: producer.name,
    model,
  };
}

function randomLine() {
  const company = faker.random.arrayElement(companies);
  const convoy = faker.random.arrayElement(company.convoys);
  const line = faker.random.arrayElement(convoy.lines);

  return {
    company: company.name,
    convoy: convoy.name,
    line: line.name,
  };
}

function randomVehicleNo() {
  const { model } = randomModel();
  const num = faker.random.number({ min: 1000, max: 9999 });
  return model + "-" + num;
}

function randomVehicleNoWithModel() {
  const { producer, model } = randomModel();
  const num = faker.random.number({ min: 1000, max: 9999 });

  return {
    vehicleNo: model + "-" + num,
    producer,
    model,
  };
}

function randomPlate() {
  const num = faker.random.number({ min: 1000, max: 9999 });
  return "沪DP" + num;
}

function randomChargeStatus() {
  return faker.random.arrayElement([
    ...cs.ChargeStatus,
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
    "UNCHARGED",
  ]);
}

module.exports = {
  randomLevel,
  randomChargeStatus,
  randomLine,
  randomProducer,
  randomModel,
  randomVehicleNo,
  randomPlate,
  randomVehicleNoWithModel,
};
