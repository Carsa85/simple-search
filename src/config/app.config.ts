export type TAppConfig = {
    MAX_PAGINATION: number;
    API_URL: string;
    MIN_SEARCH_LENGTH: number;
};

export const APP_CONFIG: TAppConfig = {
    MAX_PAGINATION: 20,
    API_URL: 'https://jsonplaceholder.typicode.com/',
    MIN_SEARCH_LENGTH: 3
};
