const singletonFunction: any = (func: Function, arg: any) => {
    return async () => {
        if (!singletonFunction.isRun) {
            singletonFunction.isRun = true;
            await func(arg);
            singletonFunction.isRun = false;
        }
    }
};
export { singletonFunction }