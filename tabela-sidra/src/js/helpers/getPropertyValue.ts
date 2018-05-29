export function getPropertyValue(obj: Object, path: string) {
    const properties = path.split('.');
    let idx = 0;
    let value = obj;

    do {

        try {
            value = value[properties[idx]];
        } catch (err) {
            let arr = properties.slice(0, idx);
            const error = new Error(`O objeto ${JSON.stringify(obj)} não possui a propriedade ${arr.join('.')}`);
            error.stack = err.stack;

            throw error;
        }

    } while (++idx < properties.length);

    return value;
}
