export const aPositiveInteger = () => randomIntegerBetween(1,1000);
export const aNonNegativeInteger = () => randomIntegerBetween(0, 1000);
export const aString = () => `a${aNonNegativeInteger()}b${aNonNegativeInteger()}c`;
export const randomChoiceFrom = <T>(items: T[]) => {
    return items[randomIntegerBetween(0, items.length)];
};

export const randomIntegerBetween = (min: number, maxExclusive: number) => {
    return Math.floor(Math.random() * (maxExclusive - min)) + min;
};

export const aPercent = () => {
    return Math.random() * randomIntegerBetween(1,100)
};

it('there needs to be a test until we eject from create react app', () => {});