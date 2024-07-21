
export interface IDefaultResponse{
    message: string;
}

export interface IDefaultGetResponse<T> extends IDefaultResponse{
    records:  T[] | [];
}
