import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

describe("## SDK bus-op", () => {
  it("should list alerts", async () => {
    const result = await sdk.alert.listAlerts();
    expect(result.body.length).toBeGreaterThan(0);
  });

  let alert;

  it("should create alert", async () => {
    const newAlert = {
      lastAt: "2019-06-13T07:23:11.203Z",
      startedAt: "2019-06-13T07:23:11.203Z",
      code: "10111301",
      company: "巴士二公司",
      count: 999,
      level: 1,
      name: "气泵一般故障",
      plate: "沪A-2957",
      state: "TODO",
      vehicle: "LSFD13201GC6991245",
      vehicleModel: "车型",
      vehicleNo: "zj-834",
      vehicleProducer: {
        name: "宇通",
        models: [
          "Z0A",
          "Z2C",
          "Z5A",
          "Z9D",
          "Z2H",
          "Z8B",
          "Z2E",
          "Z9C",
          "Z2F",
          "Z2G",
        ],
      },
    };

    const result = await sdk.alert.createAlert({ body: newAlert });
    alert = result.body;
    expect(alert).toMatchObject(newAlert);
  });

  it("should get alert", async () => {
    const result = await sdk.alert.getAlert({
      alertId: alert.id,
    });
    expect(result.body.id).toBe(alert.id);
  });

  let updateAlert = {
    code: "123",
  };

  it("should update alert", async () => {
    const result = await sdk.alert.updateAlert({
      alertId: alert.id,
      body: updateAlert,
    });
    expect(result.body.code).toBe(updateAlert.code);
  });

  it("should delete alert", async () => {
    const result = await sdk.alert.deleteAlert({
      alertId: alert.id,
    });
    expect(result.body).toEqual({});
  });

  it("should list faults", async () => {
    const result = await sdk.fault.listFaults();
    expect(result.body.length).toBe(122);
  });

  it("should list warnings", async () => {
    const result = await sdk.warning.listWarnings();
    expect(result.body.length).toBe(100);
  });

  it("should list warnings", async () => {
    const result = await sdk.warning.listWarnings();
    expect(result.body.length).toBe(100);
  });

  it("should list AlertStats", async () => {
    const result = await sdk.statistics.getAlertStats();
    expect(result.body.length).toBe(1);
  });

  it("should list WarningStats", async () => {
    const result = await sdk.statistics.getWarningStats();
    expect(result.body.length).toBe(1);
  });

  /**
   * ticket 相关测试
   */

  let ticket;

  it("should list stages", async () => {
    const result = await sdk.ticket.listStages();
    expect(result.body.length).toBe(3);
  });

  it("should create ticket", async () => {
    const ticketDoc = {
      createdBy: "1111",
      alerts: [alert.id],
      reference: "xxxxx",
      vehicle: { id: "111", no: "no-222" },
      state: "OPEN",
    };
    const result = await sdk.ticket.creatTicket({
      body: ticketDoc,
    });
    ticket = result.body;

    expect(ticket).toMatchObject(ticketDoc);
  });

  it("should list tickets", async () => {
    const result = await sdk.ticket.listTickets();
    expect(result.body.length).toBeGreaterThan(1);
  });
});
