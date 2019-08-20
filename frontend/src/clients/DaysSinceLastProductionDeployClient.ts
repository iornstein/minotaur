import axios, {AxiosResponse} from "axios";

export type DaysSinceLastProductionDeployResponse = {
    days: number
}

export const requestDaysSinceLastProductionDeploy: () => Promise<AxiosResponse<DaysSinceLastProductionDeployResponse>> = () =>
    axios.get("http://localhost:8080/daysSinceLastProductionDeploy");
