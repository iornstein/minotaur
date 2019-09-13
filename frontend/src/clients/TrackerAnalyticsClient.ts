import axios, {AxiosResponse} from "axios";

export type TrackerAnalyticsResponse = {
    name: string,
    velocity: number,
    volatility: number,
}

export const requestTrackerAnalytics: () => Promise<AxiosResponse<TrackerAnalyticsResponse>> = () =>
    axios.get("http://localhost:8525/tracker/project");