export const aPositiveNumber = () => randomNumberBetween(1,1000);
export const aNonNegativeNumber = () => randomNumberBetween(0, 1000);
export const aString = () => `a${aNonNegativeNumber()}b${aNonNegativeNumber()}c`;

const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

it('there needs to be a test until we eject from create react app', () => {});