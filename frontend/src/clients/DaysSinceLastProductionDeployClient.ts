import axios, {AxiosResponse} from "axios";

export type DaysSinceLastProductionDeployResponse = {
    days: number | null
}

export const requestDaysSinceLastProductionDeploy: () => Promise<AxiosResponse<DaysSinceLastProductionDeployResponse>> = () =>
    axios.get("http://localhost:8080/daysSinceLastProductionDeploy");
