export const every: (milliseconds: number) => { do: (callback: () => void) => void } = (milliseconds: number) => {
    return {
        do: (callback: () => void) => {
            callback();
            setInterval(callback, milliseconds);
        }
    }
};