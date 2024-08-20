type QueryType = {
    [key: string]: undefined | string | string[];
};

export const getQueryValue = (
    query: QueryType,
    queryParamKey?: string
): string | undefined => {
    if (!queryParamKey) return undefined;
    let value = query[queryParamKey];
    if (Array.isArray(value)) value = value[0];
    return value;
}
