import fetch from "@36node/fetch";
import { denormalize } from "@36node/query-normalizr";

export default class SDK {
  /**@type {string} **/
  base;
  /**@type {string} **/
  token;

  /**
   * Sdk auth
   *
   * @returns {string} auth header
   * */
  get auth() {
    let token = this.token;
    if (typeof token === "function") token = token();
    if (token) return `Bearer ${token}`;

    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token for authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || "";
    this.token = opt.token || "";
  }

  /**
   * event's methods
   */
  event = {
    /**
     * create event
     *
     * @param {CreateEventRequest} req createEvent request
     * @returns {Promise<CreateEventResponse>} The snapshot created
     */
    createEvent: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createEvent");

      return fetch(`${this.base}/events`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * alert's methods
   */
  alert = {
    /**
     * List all alerts
     *
     * @param {ListAlertsRequest} req listAlerts request
     * @returns {Promise<ListAlertsResponse>} A paged array of alerts
     */
    listAlerts: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/alerts`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create an alert
     *
     * @param {CreateAlertRequest} req createAlert request
     * @returns {Promise<CreateAlertResponse>} The Alert created
     */
    createAlert: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createAlert");

      return fetch(`${this.base}/alerts`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Export alerts
     *
     * @param {ExportAlertsRequest} req exportAlerts request
     * @returns {Promise<ExportAlertsResponse>} A paged array of alerts
     */
    exportAlerts: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for exportAlerts");

      return fetch(`${this.base}/exports/alerts`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get alert by id
     *
     * @param {GetAlertRequest} req getAlert request
     * @returns {Promise<GetAlertResponse>} The alert with given id
     */
    getAlert: (req = {}) => {
      const { alertId, headers } = req;

      if (!alertId) throw new Error("alertId is required for getAlert");

      return fetch(`${this.base}/alerts/${alertId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update alert
     *
     * @param {UpdateAlertRequest} req updateAlert request
     * @returns {Promise<UpdateAlertResponse>} The alert
     */
    updateAlert: (req = {}) => {
      const { alertId, headers, body } = req;

      if (!alertId) throw new Error("alertId is required for updateAlert");
      if (!body) throw new Error("requetBody is required for updateAlert");

      return fetch(`${this.base}/alerts/${alertId}`, {
        method: "PATCH",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * 删除指定报警
     *
     * @param {DeleteAlertRequest} req deleteAlert request
     * @returns {Promise<DeleteAlertResponse>} alert deleted
     */
    deleteAlert: (req = {}) => {
      const { alertId, headers } = req;

      if (!alertId) throw new Error("alertId is required for deleteAlert");

      return fetch(`${this.base}/alerts/${alertId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * fault's methods
   */
  fault = {
    /**
     * 返回故障编码列表
     *
     * @param {ListFaultsRequest} req listFaults request
     * @returns {Promise<ListFaultsResponse>} A paged array of faults
     */
    listFaults: (req = {}) => {
      const { headers } = req;

      return fetch(`${this.base}/faults`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * exception's methods
   */
  exception = {
    /**
     * List all exceptions
     *
     * @param {ListExceptionsRequest} req listExceptions request
     * @returns {Promise<ListExceptionsResponse>} A paged array of exceptions
     */
    listExceptions: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/exceptions`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get exception by id
     *
     * @param {GetExceptionRequest} req getException request
     * @returns {Promise<GetExceptionResponse>} The exception with given id
     */
    getException: (req = {}) => {
      const { exceptionId, headers } = req;

      if (!exceptionId)
        throw new Error("exceptionId is required for getException");

      return fetch(`${this.base}/exceptions/${exceptionId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * 删除指定异常
     *
     * @param {DeleteExceptionRequest} req deleteException request
     * @returns {Promise<DeleteExceptionResponse>} exception deleted
     */
    deleteException: (req = {}) => {
      const { exceptionId, headers } = req;

      if (!exceptionId)
        throw new Error("exceptionId is required for deleteException");

      return fetch(`${this.base}/exceptions/${exceptionId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * summary's methods
   */
  summary = {
    /**
     * Get exceptions summary
     *
     * @param {GetExceptionsSummaryRequest} req getExceptionsSummary request
     * @returns {Promise<GetExceptionsSummaryResponse>} The exceptions summary
     */
    getExceptionsSummary: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/summary/exceptions`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get alerts summary
     *
     * @param {GetAlertSummaryRequest} req getAlertSummary request
     * @returns {Promise<GetAlertSummaryResponse>} The alert summary
     */
    getAlertSummary: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/summary/alerts`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * warning's methods
   */
  warning = {
    /**
     * List all warnings
     *
     * @param {ListWarningsRequest} req listWarnings request
     * @returns {Promise<ListWarningsResponse>} A paged array of warnings
     */
    listWarnings: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/warnings`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * statistics's methods
   */
  statistics = {
    /**
     * Get statistics of tickets
     *
     * @param {GetTicketsStatsRequest} req getTicketsStats request
     * @returns {Promise<GetTicketsStatsResponse>} The ticket stats
     */
    getTicketsStats: (req = {}) => {
      const { query, headers } = req;

      if (!query) throw new Error("query is required for statistics");

      return fetch(`${this.base}/statistics/tickets`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get statistics of alert
     *
     * @param {GetAlertStatsRequest} req getAlertStats request
     * @returns {Promise<GetAlertStatsResponse>} The alert stats
     */
    getAlertStats: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/statistics/alert`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get statistics of warning
     *
     * @param {GetWarningStatsRequest} req getWarningStats request
     * @returns {Promise<GetWarningStatsResponse>} The warning stats
     */
    getWarningStats: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/statistics/warning`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * ticket's methods
   */
  ticket = {
    /**
     * 查看所有泳道
     *
     * @param {ListStagesRequest} req listStages request
     * @returns {Promise<ListStagesResponse>} A paged array of stages
     */
    listStages: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/stages`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * 创建泳道
     *
     * @param {CreateStageRequest} req createStage request
     * @returns {Promise<CreateStageResponse>} The stage created
     */
    createStage: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createStage");

      return fetch(`${this.base}/stages`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * List all tickets
     *
     * @param {ListTicketsRequest} req listTickets request
     * @returns {Promise<ListTicketsResponse>} A paged array of tickets
     */
    listTickets: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/tickets`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * 创建工单/任务单
     *
     * @param {CreatTicketRequest} req creatTicket request
     * @returns {Promise<CreatTicketResponse>} The ticket created
     */
    creatTicket: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for creatTicket");

      return fetch(`${this.base}/tickets`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get a ticket by id
     *
     * @param {GetTicketRequest} req getTicket request
     * @returns {Promise<GetTicketResponse>} The ticket with given id
     */
    getTicket: (req = {}) => {
      const { ticketId, headers } = req;

      if (!ticketId) throw new Error("ticketId is required for getTicket");

      return fetch(`${this.base}/tickets/${ticketId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * 创建工单事件
     *
     * @param {CreateEventRequest} req createEvent request
     * @returns {Promise<CreateEventResponse>} The ticket event created
     */
    createEvent: (req = {}) => {
      const { ticketId, headers, body } = req;

      if (!ticketId) throw new Error("ticketId is required for createEvent");
      if (!body) throw new Error("requetBody is required for createEvent");

      return fetch(`${this.base}/tickets/${ticketId}/events`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * template's methods
   */
  template = {
    /**
     * List all templates
     *
     * @param {ListTemplatesRequest} req listTemplates request
     * @returns {Promise<ListTemplatesResponse>} A paged array of templates
     */
    listTemplates: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/templates`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create an template
     *
     * @param {CreateTemplateRequest} req createTemplate request
     * @returns {Promise<CreateTemplateResponse>} The Template created
     */
    createTemplate: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createTemplate");

      return fetch(`${this.base}/templates`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get template by id
     *
     * @param {GetTemplateRequest} req getTemplate request
     * @returns {Promise<GetTemplateResponse>} The template with given id
     */
    getTemplate: (req = {}) => {
      const { templateId, headers } = req;

      if (!templateId)
        throw new Error("templateId is required for getTemplate");

      return fetch(`${this.base}/template/${templateId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update template
     *
     * @param {UpdateTemplateRequest} req updateTemplate request
     * @returns {Promise<UpdateTemplateResponse>} The template
     */
    updateTemplate: (req = {}) => {
      const { templateId, headers, body } = req;

      if (!templateId)
        throw new Error("templateId is required for updateTemplate");
      if (!body) throw new Error("requetBody is required for updateTemplate");

      return fetch(`${this.base}/template/${templateId}`, {
        method: "PATCH",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * 删除指定模板
     *
     * @param {DeleteTemplateRequest} req deleteTemplate request
     * @returns {Promise<DeleteTemplateResponse>} template deleted
     */
    deleteTemplate: (req = {}) => {
      const { templateId, headers } = req;

      if (!templateId)
        throw new Error("templateId is required for deleteTemplate");

      return fetch(`${this.base}/template/${templateId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
