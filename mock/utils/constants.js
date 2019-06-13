/**
 * 车辆当前状态（非状态机，比较随意的状态）
 */
const VehicleStatus = ["ON", "OFF", "OTHER", "ABNORMAL"];

/**
 * 充电状态: 车辆的充电状态: 停车充电、行驶充电、未充电、充电完成
 */
const ChargeStatus = [
  "PARK_CHARGING",
  "MOVE_CHARGING",
  "UNCHARGED",
  "CHARGED",
  "ABNORMAL",
];

/**
 * 车辆模式: 纯电, 混合, 燃油
 */
const Mode = ["ELECTRIC", "MIXED", "FUEL", "ABNORMAL"];

/**
 * DC-DC 状态: 工作, 断开
 */
const DcStatus = ["ON", "OFF", "ABNORMAL"];

/**
 * 车辆档位
 */
const Shift = [
  "N",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "R",
  "D",
  "P",
];

/**
 * 空调模式: 关闭, 进风, 制热, 制冷
 */
const AirMode = ["OFF", "WIND", "HEATING", "REFRIGERATION", "ABNORMAL"];

/**
 * 门状态: 关闭, 开, 异常
 */
const DoorStatus = ["CLOSE", "OPEN", "ABNORMAL"];

/**
 * 手刹状态: 松, 刹, 异常
 */
const HandbrakeStatus = ["OFF", "ON", "ABNORMAL"];

/**
 * 钥匙位置
 */
const KeyStatus = ["OFF", "ACC", "ON", "START"];

/**
 * 车辆在线状况: 未知（从未登录）, 在线， 离线
 */
const State = ["UNKNOWN", "ONLINE", "OFFLINE"];

/**
 * all fault
 */
const Faults = [
  { name: "整车高压互锁故障", level: 3, code: 0x100a0a03 },
  { name: "电机通讯故障", level: 2, code: 0x10c29202 },
  { name: "BMS通讯故障（ACAname:)", level: 2, code: 0x10c28902 },
  { name: "ACU通讯故障", level: 2, code: 0x10d10002 },
  { name: "ATS通讯故障", level: 2, code: 0x10c11602 },
  { name: "刹车踏板信号无效故障", level: 2, code: 0x10100302 },
  { name: "加速踏板信号无效故障", level: 2, code: 0x10100f02 },
  { name: "档位信号无效故障", level: 2, code: 0x10100e02 },
  { name: "高压绝缘一般故障", level: 2, code: 0x100aa602 },
  { name: "高压绝缘严重故障", level: 3, code: 0x100aa703 },
  { name: "整车控制器系统故障", level: 3, code: 0x10100003 },
  { name: "低压电池电压低故障", level: 2, code: 0x10102602 },
  { name: "气压低故障", level: 3, code: 0x10101003 },
  { name: "气压低报警", level: 2, code: 0x10103402 },
  { name: "气压传感器报警", level: 2, code: 0x10103502 },
  { name: "整车接触器驱动故障", level: 2, code: 0x10103702 },
  { name: "预充接触器驱动故障", level: 2, code: 0x10103802 },
  { name: "整车接触器断路故障", level: 2, code: 0x10100c02 },
  { name: "预充接触器断路故障", level: 2, code: 0x10103602 },
  { name: "整车接触器或预充接触器粘连故障", level: 3, code: 0x10100b03 },
  { name: "预充超时故障", level: 2, code: 0x10100d02 },
  { name: "仪表内部通讯故障", level: 1, code: 0x10d10801 },
  { name: "车身模块一般故障", level: 1, code: 0x10103a01 },
  { name: "胎压监测系统一般故障", level: 1, code: 0x10103b01 },
  { name: "集中润滑系统一般故障", level: 1, code: 0x10103c01 },
  { name: "ABS系统一般故障", level: 2, code: 0x10103d02 },
  { name: "ABS系统严重故障", level: 3, code: 0x10103e03 },
  { name: "ECAS系统一般故障", level: 2, code: 0x10103f02 },
  { name: "电机控制器系统故障", level: 3, code: 0x10140003 },
  { name: "编码器故障", level: 3, code: 0x10140103 },
  { name: "电机控制器过压故障", level: 2, code: 0x10140202 },
  { name: "欠压故障", level: 2, code: 0x10140302 },
  { name: "电机超速故障", level: 2, code: 0x10140402 },
  { name: "电机超速报警", level: 1, code: 0x10140501 },
  { name: "电机过温故障", level: 2, code: 0x10140602 },
  { name: "电机过温报警", level: 1, code: 0x10140701 },
  { name: "控制器过温故障", level: 2, code: 0x10140802 },
  { name: "控制器过温报警", level: 1, code: 0x10140901 },
  { name: "电机速度传感器故障", level: 2, code: 0x10140a02 },
  { name: "电机控制器过流故障", level: 2, code: 0x10140b02 },
  { name: "电机控制器通讯故障", level: 2, code: 0x10d10902 },
  { name: "充电故障", level: 2, code: 0x10130002 },
  { name: "充电插座高温报警", level: 1, code: 0x10130101 },
  { name: "充电插座高温故障", level: 2, code: 0x10130202 },
  { name: "充电继电器粘连故障", level: 3, code: 0x10130303 },
  { name: "充电继电器开路故障", level: 2, code: 0x10130402 },
  { name: "充电预充继电器粘连故障", level: 3, code: 0x10130503 },
  { name: "充电预充继电器开路故障", level: 2, code: 0x10130602 },
  { name: "电池内部高压互锁故障", level: 3, code: 0x10130703 },
  { name: "主继电器粘连故障", level: 3, code: 0x10130803 },
  { name: "主继电器开路故障", level: 2, code: 0x10130902 },
  { name: "BMS通讯故障(C CAname:)", level: 2, code: 0x10130a02 },
  { name: "单体过压报警", level: 1, code: 0x10130b01 },
  { name: "单体过压故障", level: 3, code: 0x10130c03 },
  { name: "单体欠压报警", level: 1, code: 0x10130d01 },
  { name: "单体欠压故障", level: 2, code: 0x10130e02 },
  { name: "单体压差报警", level: 1, code: 0x10130f01 },
  { name: "单体压差故障", level: 2, code: 0x10131002 },
  { name: "电池温差报警", Level: 1, code: 0x10131101 },
  { name: "电池温差故障", level: 2, code: 0x10131202 },
  { name: "电池低温报警", level: 1, code: 0x10131301 },
  { name: "电池低温故障", level: 2, code: 0x10131402 },
  { name: "电池高温报警", level: 1, code: 0x10131501 },
  { name: "电池高温故障", level: 3, code: 0x10131603 },
  { name: "电池SOC低报警", level: 1, code: 0x10131701 },
  { name: "电池总电压低报警", level: 1, code: 0x10131801 },
  { name: "电池总电压高报警", level: 1, code: 0x10131901 },
  { name: "电池放电电流超限制报警", level: 1, code: 0x10131a01 },
  { name: "电池回充电流超限制报警", level: 1, code: 0x10131b01 },
  { name: "均衡电路故障", level: 2, code: 0x10131c02 },
  { name: "电池热管理系统报警", level: 2, code: 0x10131d02 },
  { name: "电池支路断路报警", level: 2, code: 0x10131e02 },
  { name: "DCDC故障", level: 1, code: 0x10110f01 },
  { name: "严重故障", level: 2, code: 0x10111002 },
  { name: "输出欠压故障", level: 2, code: 0x10122502 },
  { name: "输出过压故障", level: 2, code: 0x10122602 },
  { name: "输入欠压警告", level: 1, code: 0x10123801 },
  { name: "输入欠压故障", level: 2, code: 0x10121d02 },
  { name: "输入过压故障", level: 2, code: 0x10121c02 },
  { name: "通讯故障", level: 2, code: 0x10d10502 },
  { name: "过温报警", level: 1, code: 0x10120e01 },
  { name: "过温故障", level: 2, code: 0x10120d02 },
  { name: "输出电流过流", level: 2, code: 0x10120202 },
  { name: "油泵故障", level: 1, code: 0x10111101 },
  { name: "严重故障", level: 2, code: 0x10111202 },
  { name: "通讯故障", level: 2, code: 0x10d10602 },
  { name: "高压输入欠压故障", level: 2, code: 0x10122402 },
  { name: "相电流过流报警", level: 1, code: 0x10123001 },
  { name: "控制器过温报警", level: 1, code: 0x10121101 },
  { name: "控制器过温故障", level: 2, code: 0x10121702 },
  { name: "电机过温报警", level: 1, code: 0x10121201 },
  { name: "电机过温故障", level: 2, code: 0x10121802 },
  { name: "控制低压欠压故", level: 2, code: 0x10123102 },
  { name: "高压输入过压故障", level: 2, code: 0x10122302 },
  { name: "相电流过流故障", level: 2, code: 0x10120602 },
  { name: "缺相故障", level: 2, code: 0x10122e02 },
  { name: "失速", level: 2, code: 0x10123202 },
  { name: "低压绕阻输入欠压", level: 2, code: 0x10123302 },
  { name: "低压绕阻输出过流", level: 2, code: 0x10123402 },
  { name: "气泵一般故障", level: 1, code: 0x10111301 },
  { name: "严重故障", level: 2, code: 0x10111402 },
  { name: "通讯故障", level: 2, code: 0x10d10702 },
  { name: "高压输入欠压故障", level: 2, code: 0x10122202 },
  { name: "相电流过流报警", level: 1, code: 0x10123501 },
  { name: "控制器过温报警", level: 1, code: 0x10120f01 },
  { name: "控制器过温故障", level: 2, code: 0x10121502 },
  { name: "电机过温报警", level: 1, code: 0x10121001 },
  { name: "电机过温故障", level: 2, code: 0x10121602 },
  { name: "控制低压欠压故障", level: 2, code: 0x10123602 },
  { name: "高压输入过压故障", level: 2, code: 0x10122102 },
  { name: "相电流过流故障", level: 2, code: 0x10120402 },
  { name: "缺相故障", level: 2, code: 0x10122f02 },
  { name: "失速", level: 2, code: 0x10123702 },
  { name: "热管理系统一般故障", level: 1, code: 0x10111501 },
  { name: "热管理系统严重故障", level: 2, code: 0x10111602 },
  { name: "空调系统一般故障", level: 1, code: 0x101f0001 },
  { name: "空调系统严重故障", level: 1, code: 0x101f0101 },
  { name: "车外温度传感器故障", level: 1, code: 0x101f0201 },
  { name: "车内温度传感器故障", level: 1, code: 0x101f0301 },
  { name: "蒸发器传感器故障", level: 1, code: 0x101f0401 },
  { name: "空调压力过压", level: 1, code: 0x101f0501 },
  { name: "空调压力欠压", level: 1, code: 0x101f0601 },
];

module.exports = {
  VehicleStatus,
  ChargeStatus,
  Mode,
  DcStatus,
  Shift,
  AirMode,
  DoorStatus,
  HandbrakeStatus,
  KeyStatus,
  State,
  Faults,
};
