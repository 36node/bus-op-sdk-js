import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

describe("## SDK bus-op", () => {
  it("should list alets", async () => {
    const result = await sdk.alert.listAlerts();
    expect(result.body.length).toBe(100);
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
    expect(result.body.length).toBe(2);
  });

  it("should create ticket", async () => {
    const ticketDoc = {
      createdAt: Date.now(),
      createdBy: "1111",
      updatedAt: Date.now(),
      alerts: [alert.id],
      reference: "xxxxx",
      stage: "111",
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

  it("should search tickets by q", async () => {
    const result = await sdk.ticket.listTickets({ query: { q: "no-222" } });
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("should create comment", async () => {
    const doc = { content: "test" };
    const result = await sdk.ticket.createComment({
      ticketId: ticket.id,
      body: doc,
    });
    expect(result.body).toMatchObject(doc);
  });

  it("should list ticket comments", async () => {
    const result = await sdk.ticket.listComments({ ticketId: ticket.id });
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("should close ticket", async () => {
    const result = await sdk.ticket.updateTicket({
      ticketId: ticket.id,
      body: { state: "CLOSE", stage: "222" },
    });
    expect(result.body.state).toBe("CLOSE");
    expect(result.body.events).toHaveLength(2);
  });
});
