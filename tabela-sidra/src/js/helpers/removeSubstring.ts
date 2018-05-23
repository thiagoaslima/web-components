export function removeSubstring(start: number, end: number, str: string) {
    return start === 0 ?
        str.substr(end) :
        str.substr(0, start) + str.substr(start + end);
}