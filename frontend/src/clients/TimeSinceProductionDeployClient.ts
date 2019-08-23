import axios, {AxiosResponse} from "axios";

export type TimeSinceProductionDeployResponse = {
    days: number | null
}

export const requestTimeSinceProductionDeploy: () => Promise<AxiosResponse<TimeSinceProductionDeployResponse>> = () =>
    axios.get("http://localhost:8080/timeSinceLastProductionDeploy");

export const notifyThatAProductionDeployHappened: () => Promise<AxiosResponse<{}>> = () =>
    axios.put("http://localhost:8080/reportAProductionDeploy");