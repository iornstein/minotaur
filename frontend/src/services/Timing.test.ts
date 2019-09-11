import {every} from "./Timing";
import {aPositiveInteger} from "../utils/testGenerators/generatePrimitives.test";

jest.useFakeTimers();

describe('every', function () {

    it('should immediately run the function once', function () {
        const interval = aPositiveInteger();
        const callback = jest.fn();
        every(interval).do(callback);

        expect(callback).toHaveBeenCalled();
    });

    it('should run the function every interval', function () {
        const interval = aPositiveInteger();
        const callback = jest.fn();
        every(interval).do(callback);
        callback.mockClear();

        jest.advanceTimersByTime(interval - 1);
        expect(callback).not.toHaveBeenCalled();
        jest.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(interval);
        expect(callback).toHaveBeenCalledTimes(2);
    });
});