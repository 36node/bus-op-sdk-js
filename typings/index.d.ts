export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  event: SDK.EventAPI;
  alert: SDK.AlertAPI;
  fault: SDK.FaultAPI;
  exception: SDK.ExceptionAPI;
  summary: SDK.SummaryAPI;
  warning: SDK.WarningAPI;
  statistics: SDK.StatisticsAPI;
  ticket: SDK.TicketAPI;
  template: SDK.TemplateAPI;
}

declare namespace SDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface EventAPI {
    /**
     * create event
     */
    createEvent(req: CreateEventRequest): Promise<CreateEventResponse>;
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
  export interface ExceptionAPI {
    /**
     * List all exceptions
     */
    listExceptions(req: ListExceptionsRequest): Promise<ListExceptionsResponse>;
    /**
     * Get exception by id
     */
    getException(req: GetExceptionRequest): Promise<GetExceptionResponse>;
    /**
     * 删除指定异常
     */
    deleteException(req: DeleteExceptionRequest): Promise<DeleteExceptionResponse>;
  }
  export interface SummaryAPI {
    /**
     * Get exceptions summary
     */
    getExceptionsSummary(req: GetExceptionsSummaryRequest): Promise<GetExceptionsSummaryResponse>;
    /**
     * Get alerts summary
     */
    getAlertSummary(req: GetAlertSummaryRequest): Promise<GetAlertSummaryResponse>;
  }
  export interface WarningAPI {
    /**
     * List all warnings
     */
    listWarnings(req: ListWarningsRequest): Promise<ListWarningsResponse>;
  }
  export interface StatisticsAPI {
    /**
     * Get statistics of tickets
     */
    getTicketsStats(req: GetTicketsStatsRequest): Promise<GetTicketsStatsResponse>;
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
     * 创建工单事件
     */
    createEvent(req: CreateEventRequest): Promise<CreateEventResponse>;
  }
  export interface TemplateAPI {
    /**
     * List all templates
     */
    listTemplates(req: ListTemplatesRequest): Promise<ListTemplatesResponse>;
    /**
     * Create an template
     */
    createTemplate(req: CreateTemplateRequest): Promise<CreateTemplateResponse>;
    /**
     * Get template by id
     */
    getTemplate(req: GetTemplateRequest): Promise<GetTemplateResponse>;
    /**
     * Update template
     */
    updateTemplate(req: UpdateTemplateRequest): Promise<UpdateTemplateResponse>;
    /**
     * 删除指定模板
     */
    deleteTemplate(req: DeleteTemplateRequest): Promise<DeleteTemplateResponse>;
  }

  type CreateEventRequest = {
    body: Event;
  };

  type CreateEventResponse = {
    body: Event;
  };

  type ListAlertsRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        type?: string;
        code?: string;
        vehicleNo: {
          $regex?: string;
        };
        ns: {
          $regex?: string;
        };
        vehicleLine?: string;
        vehicleProducer?: string;
        vehicleModel?: string;
        vehicleModelBrief?: string;
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

  type ListExceptionsRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        type?: string;
        code: {
          $regex?: string;
        };
        vehicleNo: {
          $regex?: string;
        };
        ns: {
          $regex?: string;
        };
        vehicleLine?: string;
        vehicleProducer?: string;
        vehicleModel?: string;
        vehicleModelBrief?: string;
        startedAt: {
          $gt?: string;
          $lt?: string;
        };
        lastAt: {
          $gt?: string;
          $lt?: string;
        };
      };
    };
  };

  type ListExceptionsResponse = {
    body: [Exception];
    headers: {
      xTotalCount: string;
    };
  };

  type GetExceptionRequest = {
    exceptionId: string;
  };

  type GetExceptionResponse = {
    body: Exception;
  };

  type DeleteExceptionRequest = {
    exceptionId: string;
  };

  type GetExceptionsSummaryRequest = {
    query: {
      group?: string;

      filter: {
        type?: string;
      };
    };
  };

  type GetExceptionsSummaryResponse = {
    body: [ExceptionsSummary];
  };

  type GetAlertSummaryRequest = {
    query: {
      filter: {
        type?: string;
      };
    };
  };

  type GetAlertSummaryResponse = {
    body: [AlertSummary];
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
        vehiclePlate?: string;
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

  type GetTicketsStatsRequest = {
    query: {
      filter: {
        stage?: string;
        ns: {
          $regex: string;
        };
      };
    };
  };

  type GetTicketsStatsResponse = {
    body: [{}];
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
        vehiclePlate?: string;
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
        vehiclePlate?: string;
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

      filter: {
        name?: string;
      };
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
        action?: number;
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

  type CreateEventRequest = {
    ticketId: string;
    body: TicketEvent;
  };

  type CreateEventResponse = {
    body: Ticket;
  };

  type ListTemplatesRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        content: {
          $regex?: string;
        };
      };
    };
  };

  type ListTemplatesResponse = {
    body: [Template];
    headers: {
      xTotalCount: string;
    };
  };

  type CreateTemplateRequest = {
    body: Template;
  };

  type CreateTemplateResponse = {
    body: Template;
  };

  type GetTemplateRequest = {
    templateId: string;
  };

  type GetTemplateResponse = {
    body: Template;
  };

  type UpdateTemplateRequest = {
    templateId: string;
    body: TemplateUpdateBody;
  };

  type UpdateTemplateResponse = {
    body: Template;
  };

  type DeleteTemplateRequest = {
    templateId: string;
  };

  type AlertUpdateBody = {
    state: "OPEN" | "CLOSED";
    lastAt: string;
    count: number;
  };
  type Event = {
    flag: string;
    event: string;
    vin: string;
    ns: string;
    body: {};
  };
  type Alert = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string;
    startedAt: string;
    lastAt: string;
    code: string;
    count: number;
    level: number;
    name: string;
    state: "OPEN" | "CLOSED";
    vehicle: string;
    vehiclePlate: string;
    ns: string;
    vehicleLine: string;
    vehicleProducer: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleMileage: number;
    vehilceExpiredAt: number;
    ticket: string;
    action: string;
    actionBy: string;
    actionAt: string;
  };
  type AlertStats = {
    id: string;
    ns: [string];
    code: string;
    level: number;
    line: string;
    name: string;
    vehiclePlate: string;
    state: "OPEN" | "CLOSED";
    vehicle: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleNo: string;
    vehicleMileage: number;
    vehicleYearsFromPlate: number;
    count: number;
    times: number;
  };
  type AlertSummary = {
    level: number;
    count: number;
  };
  type ExceptionsSummary = {
    key: string;
    count: string;
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
  type Exception = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string;
    startedAt: string;
    lastAt: string;
    code: string;
    count: number;
    vehicle: string;
    vehiclePlate: string;
    ns: string;
    vehicleLine: string;
    vehicleProducer: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleMileage: number;
    vehilceExpiredAt: number;
    data: {};
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
    vehiclePlate: string;
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
    vehiclePlate: string;
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
  type Stage = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    state: string;
  };
  type Ticket = {
    id: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    alerts: [string];
    alertLevel: number;
    reference: string;
    stage:
      | string
      | {
          id: string;
          createdAt: string;
          updatedAt: string;
          name: string;
          state: string;
        };
    vehicle: string;
    vehicleNo: string;
    vehiclePlate: string;
    vehicleLine: string;
    vehicleProducer: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    state: "OPEN" | "CLOSED";
    remark: string;
    events: [
      {
        id: string;
        createdAt: string;
        createdBy: string;
        name: "CLOSE" | "REOPEN" | "STAGE" | "COMMENT" | "BIND_ALERT";
        from: string;
        to: string;
        alerts: [string];
        content: string;
        action: string;
      }
    ];
  };
  type TicketDoc = {
    createdBy: string;
    updatedBy: string;
    reference: string;
    stage: string;
    vehicle: string;
    alerts: string;
    vehicleNo: string;
    vehiclePlate: string;
    vehicleLine: string;
    vehicleProducer: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    remark: string;
  };
  type TicketEvent = {
    id: string;
    createdAt: string;
    createdBy: string;
    name: "CLOSE" | "REOPEN" | "STAGE" | "COMMENT" | "BIND_ALERT";
    from: string;
    to: string;
    alerts: [string];
    content: string;
    action: string;
  };
  type Template = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string;
    content: string;
  };
  type TemplateUpdateBody = {
    content: string;
  };
  type Err = {
    code: string;
    message: string;
  };
}
