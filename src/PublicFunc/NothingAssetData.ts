export const NothingAssetCheckFunc = (data: any) => {
    let count = 0;
    data.map((list: any) => {
        if (list.email === null) {
            count = count + 1;
        }
    });
    return count;
};
