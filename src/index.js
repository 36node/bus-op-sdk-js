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
    if (this.token) {
      return `Bearer ${this.token}`;
    }

    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token fro authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || "";
    this.token = opt.token || "";
  }

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
        method: "get",
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
        method: "post",
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
        method: "get",
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
        method: "put",
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
        method: "delete",
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
        method: "get",
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
        method: "get",
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
     * Get statistics of alert
     *
     * @param {GetAlertStatsRequest} req getAlertStats request
     * @returns {Promise<GetAlertStatsResponse>} The alert stats
     */
    getAlertStats: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/statistics/alert`, {
        method: "get",
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
        method: "get",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
