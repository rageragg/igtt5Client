export interface StatisticRol {
    data: Data;
}

export interface Data {
    type:     string;
    contents: Content[];
}

export interface Content {
    user_count: number;
    rol:        string;
}
