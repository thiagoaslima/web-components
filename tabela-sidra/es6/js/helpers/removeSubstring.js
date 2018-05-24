export function removeSubstring(start, end, str) {
    return start === 0 ?
        str.substr(end) :
        str.substr(0, start) + str.substr(start + end);
}
//# sourceMappingURL=removeSubstring.js.map