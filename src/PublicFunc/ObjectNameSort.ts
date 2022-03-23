export const ObjectNameSortData = (data: any) => {
    if (data.length < 2) {
        return data;
    }
    const NameResult = data.sort(function (a: any, b: any) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    });
    return NameResult;
};
