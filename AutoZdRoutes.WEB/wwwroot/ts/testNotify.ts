import * as RandomWords from "random-words";
import * as random from "random";
//------------------------------------------------------------------------------------------------
const Run2FbyTimeAsync = async (Func: Function, CallBack: Function, sec: number = 0) => {
    await new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
        Func();
    });
    CallBack();
}
//------------------------------------------------------------------------------------------------
const GenerateRandomCallFunc = (Func: Function) => {
    let countCalls = random.int(3, 20); //кол-во вызовов
    let k = 0;
    while (k++ < countCalls) {
        setTimeout(() => {
            Func(RandomWords({ min: 3, max: 15, join: ' ' }));
        }, random.int(3, 15) * 1000);
    }
}
export { GenerateRandomCallFunc}