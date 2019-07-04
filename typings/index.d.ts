export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  alert: SDK.AlertAPI;
  fault: SDK.FaultAPI;
  warning: SDK.WarningAPI;
  summary: SDK.SummaryAPI;
  statistics: SDK.StatisticsAPI;
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
  export interface SummaryAPI {
    /**
     * Get alerts summary
     */
    getAlertSummary(req: GetAlertSummaryRequest): Promise<GetAlertSummaryResponse>;
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
        vehicleNs: {
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
    body: Array<Alert>;
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
    body: Array<Fault>;
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
    body: Array<Warning>;
    headers: {
      xTotalCount: string;
    };
  };

  type GetAlertSummaryResponse = {
    body: Array<AlertSummary>;
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

  type AlertUpdateBody = {
    state: string;
    lastAt: string;
    count: number;
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
    state: string;
    vehicle: string;
    vehiclePlate: string;
    vehicleNo: string;
    vehicleNs: string;
    vehicleLine: string;
    vehicleProducer: string;
    vehicleModel: string;
    vehicleModelBrief: string;
  };

  type AlertStats = {
    id: string;
    ns: Array<string>;
    code: string;
    level: number;
    line: string;
    name: string;
    plate: string;
    state: string;
    vehicle: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleNo: string;
    vehicleMileage: Number;
    vehicleYearsFromPlate: Number;
    count: number;
    times: number;
  };

  type AlertSummary = {
    level: Number;
    count: Number;
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
    ns: Array<string>;
  };

  type WarningStats = {
    id: string;
    ns: Array<string>;
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

  type Err = {
    code: string;
    message: string;
  };
}
