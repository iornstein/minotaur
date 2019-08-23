export const aPositiveNumber = () => randomNumberBetween(1,1000);
export const aNonNegativeNumber = () => randomNumberBetween(0, 1000);
export const aString = () => `a${aNonNegativeNumber()}b${aNonNegativeNumber()}c`;
export const randomChoiceFrom = <T>(items: T[]) => {
    return items[randomNumberBetween(0, items.length)];
};
export const randomChoiceFromThings = <T1, T2, T3>(items: (T1|T2|T3)[]) => {
    return items[randomNumberBetween(0, items.length)];
};

const randomNumberBetween = (min: number, maxExclusive: number) => {
    return Math.floor(Math.random() * (maxExclusive - min)) + min;
};

it('there needs to be a test until we eject from create react app', () => {});