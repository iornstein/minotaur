export const aPositiveNumber = () => randomNumberBetween(1,1000);

const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

it('there needs to be a test until we eject from create react app', () => {

});