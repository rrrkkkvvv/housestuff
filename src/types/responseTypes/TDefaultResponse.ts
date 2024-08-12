
export type TDefaultResponse = {
    message: string;
}

export type TDefaultGetResponse<T>  = TDefaultResponse & {
    records:  T[] | [];
}
