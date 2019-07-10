//counting keys
export function CountingProperty(array: any[], str: string, key: string): number {
    return array.reduce((acc, current) => {
        if (current[key] === str) return ++acc;
        else return acc;
    }, 0);
};