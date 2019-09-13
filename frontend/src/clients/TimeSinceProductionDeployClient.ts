import axios, {AxiosResponse} from "axios";

export type TimeSinceProductionDeployResponse = NonNullTimeSinceProductionDeployResponse | {
    days: null,
    hours: null
}

export type NonNullTimeSinceProductionDeployResponse = { days: number, hours: number }

export const requestTimeSinceProductionDeploy: () => Promise<AxiosResponse<TimeSinceProductionDeployResponse>> = () =>
    axios.get("http://localhost:8525/timeSinceLastProductionDeploy");

export const notifyThatAProductionDeployHappened: () => Promise<AxiosResponse<{}>> = () =>
    axios.put("http://localhost:8525/reportAProductionDeploy");