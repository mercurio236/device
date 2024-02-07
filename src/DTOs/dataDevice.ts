export interface DataDevice {
  ok?: boolean
  type?: string
  installationMeter: InstallationMeter
}

export interface InstallationMeter {
  fwVer?: FwVer
  statusComissioning?: StatusComissioning
  fuseBoxMeter: boolean
  equipment: string
  active: boolean
  voltage: number
  timezone: string
  tags: string[]
  code: string
  name: string
  installDate: string
  meter: string
  equipmentID: string
  solarPanel: boolean
  alias: string
  comment: string
  establishmentId: string
  equipmentType: number
  createdAt: string
  installationMetaData?: InstallationMetaData
  compressor_power: number
  defrost_power: number
  evap_fan_power: number
  mac: string
  dateObsInit: string
  dateObsEnd: string
  impediment?: Impediment[]
}

export interface FwVer {
  requestDate: string
  version: string
}

export interface StatusComissioning {
  installed: Installed
  current: string
  baseFormation: BaseFormation
}

export interface Installed {
  tempDemands: TempDemands
  pipefy: Pipefy
  configCur: ConfigCur
  supplyType: string
  volume: number
  timer: boolean
  grafana: string
}

export interface TempDemands {
  max: number
  min: number
}

export interface Pipefy {
  link: string
  id: string
}

export interface ConfigCur {
  savedDate: string
}

export interface BaseFormation {
  weekDay: WeekDay
}

export interface WeekDay {
  sun: Sun
  mon: Mon
  tue: Tue
  wed: Wed
  thu: Thu
  fri: Fri
  sat: Sat
}

export interface Sun {
  counter: number
  initialDate: string
  finalDate: string
  loadingComplete: number
}

export interface Mon {
  counter: number
  initialDate: string
  finalDate: string
  loadingComplete: number
}

export interface Tue {
  counter: number
  initialDate: string
  finalDate: string
  loadingComplete: number
}

export interface Wed {
  counter: number
  initialDate: string
  finalDate: string
  loadingComplete: number
}

export interface Thu {
  counter: number
  initialDate: string
  finalDate: string
  loadingComplete: number
}

export interface Fri {
  counter: number
  initialDate: string
  finalDate: string
  loadingComplete: number
}

export interface Sat {
  counter: number
  initialDate: string
  finalDate: string
  loadingComplete: number
}

export interface InstallationMetaData {
  reason: string
  payload: Payload
  lastCommandId: string
  CEP: string
  emailUser: string
  alias: string
  uC: string
  uc: string
}

export interface Payload {
  estabID: string
  estabAlias: string
  macAlias: string
  equipID: string
}

export interface Impediment {
  reasons: string[]
  isImpediment: boolean
}
