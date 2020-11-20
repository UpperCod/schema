export function date(value) {
    const d = new Date(value);
    const valid = d.getDate() == d.getDate();
    if (valid) {
        return d;
    } else {
        throw value;
    }
}

export const bool = (value) =>
    typeof value == "string" ? Boolean(value) : !!value;
