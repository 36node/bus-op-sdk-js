export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  alert: SDK.AlertAPI;
  fault: SDK.FaultAPI;
  warning: SDK.WarningAPI;
  statistics: SDK.StatisticsAPI;
  ticket: SDK.TicketAPI;
}

declare namespace SDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface AlertAPI {
    /**
     * List all alerts
     */
    listAlerts(req: ListAlertsRequest): Promise<ListAlertsResponse>;
    /**
     * Create an alert
     */
    createAlert(req: CreateAlertRequest): Promise<CreateAlertResponse>;
    /**
     * Get alert by id
     */
    getAlert(req: GetAlertRequest): Promise<GetAlertResponse>;
    /**
     * Update alert
     */
    updateAlert(req: UpdateAlertRequest): Promise<UpdateAlertResponse>;
    /**
     * 删除指定报警
     */
    deleteAlert(req: DeleteAlertRequest): Promise<DeleteAlertResponse>;
  }
  export interface FaultAPI {
    /**
     * 返回故障编码列表
     */
    listFaults(req: ListFaultsRequest): Promise<ListFaultsResponse>;
  }
  export interface WarningAPI {
    /**
     * List all warnings
     */
    listWarnings(req: ListWarningsRequest): Promise<ListWarningsResponse>;
  }
  export interface StatisticsAPI {
    /**
     * Get statistics of alert
     */
    getAlertStats(req: GetAlertStatsRequest): Promise<GetAlertStatsResponse>;
    /**
     * Get statistics of warning
     */
    getWarningStats(req: GetWarningStatsRequest): Promise<GetWarningStatsResponse>;
  }
  export interface TicketAPI {
    /**
     * 查看所有泳道
     */
    listStages(req: ListStagesRequest): Promise<ListStagesResponse>;
    /**
     * 创建泳道
     */
    createStage(req: CreateStageRequest): Promise<CreateStageResponse>;
    /**
     * List all tickets
     */
    listTickets(req: ListTicketsRequest): Promise<ListTicketsResponse>;
    /**
     * 创建工单/任务单
     */
    creatTicket(req: CreatTicketRequest): Promise<CreatTicketResponse>;
    /**
     * Get a ticket by id
     */
    getTicket(req: GetTicketRequest): Promise<GetTicketResponse>;
    /**
     * update ticket
     */
    updateTicket(req: UpdateTicketRequest): Promise<UpdateTicketResponse>;
    /**
     * 获取工单评论列表
     */
    listComments(req: ListCommentsRequest): Promise<ListCommentsResponse>;
    /**
     * 创建工单评论
     */
    createComment(req: CreateCommentRequest): Promise<CreateCommentResponse>;
  }

  type ListAlertsRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        type?: string;
        code?: string;
        line?: string;
        plate?: string;
        vehicleModel?: string;
        vehicleModelBrief?: string;
        vehicleNo: {
          $regex?: string;
        };
        level?: number;
        startedAt: {
          $gt?: string;
          $lt?: string;
        };
        lastAt: {
          $gt?: string;
          $lt?: string;
        };
        state?: string;
        name: {
          $regex?: string;
        };
        ns: {
          $regex?: string;
        };
        vehicleYearsFromPlate: {
          $gt?: number;
          $lt?: number;
        };
        vehicleMileage: {
          $gt?: number;
          $lt?: number;
        };
      };
    };
  };

  type ListAlertsResponse = {
    body: [Alert];
    headers: {
      xTotalCount: string;
    };
  };

  type CreateAlertRequest = {
    body: Alert;
  };

  type CreateAlertResponse = {
    body: Alert;
  };

  type GetAlertRequest = {
    alertId: string;
  };

  type GetAlertResponse = {
    body: Alert;
  };

  type UpdateAlertRequest = {
    alertId: string;
    body: AlertUpdateBody;
  };

  type UpdateAlertResponse = {
    body: Alert;
  };

  type DeleteAlertRequest = {
    alertId: string;
  };

  type ListFaultsResponse = {
    body: [Fault];
  };

  type ListWarningsRequest = {
    query: {
      limit?: number;
      offset?: string;
      sort?: string;
      select?: number;

      filter: {
        type?: string;
        name: {
          $regex?: string;
        };
        lastAt: {
          $gt?: string;
          $lt?: string;
        };
        startAt: {
          $gt?: string;
          $lt?: string;
        };
        line?: string;
        plate?: string;
        vehicle?: string;
        vehicleModel: {
          $regex?: string;
        };
        vehicleModelBrief: {
          $regex?: string;
        };
        vehicleNo: {
          $regex?: string;
        };
        vehicleProducer?: string;
        vehicleMileage: {
          $gt?: number;
          $lt?: number;
        };
        vehicleYearsFromPlate: {
          $gt?: number;
          $lt?: number;
        };
      };
    };
  };

  type ListWarningsResponse = {
    body: [Warning];
    headers: {
      xTotalCount: string;
    };
  };

  type GetAlertStatsRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      group?: string;

      filter: {
        type?: string;
        code?: string;
        line?: string;
        plate?: string;
        vehicle?: string;
        vehicleModel?: string;
        vehicleModelBrief?: string;
        vehicleNo: {
          $regex?: string;
        };
        level?: number;
        startedAt: {
          $gt?: string;
          $lt?: string;
        };
        lastAt: {
          $gt?: string;
          $lt?: string;
        };
        state?: string;
        name: {
          $regex?: string;
        };
        ns: {
          $regex?: string;
        };
        vehicleYearsFromPlate: {
          $gt?: number;
          $lt?: number;
        };
        vehicleMileage: {
          $gt?: number;
          $lt?: number;
        };
      };
    };
  };

  type GetAlertStatsResponse = {
    body: AlertStats;
  };

  type GetWarningStatsRequest = {
    query: {
      limit?: number;
      offset?: string;
      sort?: string;
      group?: string;

      filter: {
        type?: string;
        name: {
          $regex?: string;
        };
        lastAt: {
          $gt?: string;
          $lt?: string;
        };
        line?: string;
        plate?: string;
        vehicle?: string;
        vehicleModel?: string;
        vehicleModelBrief?: string;
        vehicleNo?: string;
        vehicleProducer?: string;
        vehicleMileage: {
          $gt?: number;
          $lt?: number;
        };
        vehicleYearsFromPlate: {
          $gt?: number;
          $lt?: number;
        };
      };
    };
  };

  type GetWarningStatsResponse = {
    body: WarningStats;
  };

  type ListStagesRequest = {
    query: {
      limit?: number;
      offset?: string;
    };
  };

  type ListStagesResponse = {
    body: [Stage];
    headers: {
      xTotalCount: string;
    };
  };

  type CreateStageRequest = {
    body: Stage;
  };

  type CreateStageResponse = {
    body: Stage;
  };

  type ListTicketsRequest = {
    query: {
      limit?: number;
      offset?: string;
      sort?: string;
      select?: number;

      filter: {
        q?: string;
        createdAt: {
          $gt?: number;
          $lt?: number;
        };
        updatedAt: {
          $gt?: number;
          $lt?: number;
        };
      };
    };
  };

  type ListTicketsResponse = {
    body: [Ticket];
    headers: {
      xTotalCount: string;
    };
  };

  type CreatTicketRequest = {
    body: TicketDoc;
  };

  type CreatTicketResponse = {
    body: Ticket;
  };

  type GetTicketRequest = {
    ticketId: string;
  };

  type GetTicketResponse = {
    body: Ticket;
  };

  type UpdateTicketRequest = {
    ticketId: string;
    body: TicketDoc;
  };

  type UpdateTicketResponse = {
    body: Ticket;
  };

  type ListCommentsRequest = {
    ticketId: string;

    query: {
      limit?: number;
      offset?: string;
    };
  };

  type ListCommentsResponse = {
    body: [Comment];
    headers: {
      xTotalCount: string;
    };
  };

  type CreateCommentRequest = {
    ticketId: string;
    body: Comment;
  };

  type CreateCommentResponse = {
    body: Comment;
  };

  type AlertUpdateBody = {
    state: "OPEN" | "CLOSE";
    lastAt: string;
    count: number;
  };
  type Alert = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string;
    ns: [string];
    startedAt: string;
    lastAt: string;
    code: string;
    count: number;
    level: number;
    line: string;
    name: string;
    plate: string;
    state: "OPEN" | "CLOSE";
    vehicle: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleNo: string;
    vehicleMileage: Number;
    vehilceExpiredAt: Number;
  };
  type AlertStats = {
    id: string;
    ns: [string];
    code: string;
    level: number;
    line: string;
    name: string;
    plate: string;
    state: "OPEN" | "CLOSE";
    vehicle: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleNo: string;
    vehicleMileage: Number;
    vehicleYearsFromPlate: Number;
    count: number;
    times: number;
  };
  type Fault = {
    name: string;
    code: number;
    level: number;
  };
  type GeoLocation = {
    lng: number;
    lat: number;
  };
  type Warning = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string;
    count: number;
    line: string;
    name: string;
    plate: string;
    lastAt: string;
    startAt: string;
    type: string;
    vehicle: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleNo: string;
    vehicleProducer: string;
    vehiclePlateAt: string;
    vehicleYearsFromPlate: number;
    vehicleMileage: number;
    data: {};
    ns: [string];
  };
  type WarningStats = {
    id: string;
    ns: [string];
    line: string;
    name: string;
    plate: string;
    type: string;
    vehicle: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleNo: string;
    vehicleProducer: string;
    vehicleYearsFromPlate: number;
    vehicleMileage: number;
    count: number;
    times: number;
  };
  type Vehicle = {
    id: string;
    ns: string;
    online: boolean;
    repairing: boolean;
    brands: string;
    capacity: number;
    num: string;
    emission: "C1" | "C2" | "C3" | "C4" | "C5" | "C6";
    engineNo: string;
    expiredAt: string;
    length: number;
    lifeYear: number;
    line: string;
    model: string;
    modelBrief: string;
    modified: boolean;
    photos: [string];
    place: string;
    plate: string;
    plateAt: string;
    powerBy: "FUEL" | "HYBIRD" | "DUAL-ENERGY" | "PHEV" | "E-REV" | "ELECTRIC";
    producer: string;
    purchasedAt: string;
    remark: string;
    scrapped: boolean;
    seats: number;
    type: string;
  };
  type Stage = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  type Ticket = {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    alerts: [string];
    reference: string;
    stage:
      | string
      | {
          id: string;
          createdAt: string;
          updatedAt: string;
          name: string;
        };
    vehicle:
      | string
      | {
          id: string;
          ns: string;
          online: boolean;
          repairing: boolean;
          brands: string;
          capacity: number;
          num: string;
          emission: "C1" | "C2" | "C3" | "C4" | "C5" | "C6";
          engineNo: string;
          expiredAt: string;
          length: number;
          lifeYear: number;
          line: string;
          model: string;
          modelBrief: string;
          modified: boolean;
          photos: [string];
          place: string;
          plate: string;
          plateAt: string;
          powerBy: "FUEL" | "HYBIRD" | "DUAL-ENERGY" | "PHEV" | "E-REV" | "ELECTRIC";
          producer: string;
          purchasedAt: string;
          remark: string;
          scrapped: boolean;
          seats: number;
          type: string;
        };
    state: "OPEN" | "CLOSED";
    remark: string;
    events: [
      {
        id: string;
        createdAt: string;
        createdBy: string;
        name: "CLOSE" | "REOPEN" | "STAGE";
        from: string;
        to: string;
      }
    ];
  };
  type TicketDoc = {
    createdBy: string;
    updatedBy: string;
    reference: string;
    stage: string;
    vehicle: string;
    remark: string;
  };
  type Comment = {
    id: string;
    createdAt: string;
    createdBy: string;
    content: string;
  };
  type TicketEvent = {
    id: string;
    createdAt: string;
    createdBy: string;
    name: "CLOSE" | "REOPEN" | "STAGE";
    from: string;
    to: string;
  };
  type Err = {
    code: string;
    message: string;
  };
}
