export type ApplicationState = {
    daysSinceProduction: number | null;
}

export const reducer = () : ApplicationState => {
    return {
        daysSinceProduction: null
    };
};