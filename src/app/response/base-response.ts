export class BaseRespone{
    status?: boolean; 
    errorCode?: number; 
    message?: string; 
    data?: any
    code?: number
}

export class BaseListRespone{
    pageIndex?: number; 
    pageSize?: number; 
    totalRecord?: number; 
    code?: number; 
    message?: number; 
    data?: any[];
}

export class BaseModelResponse{
    pageIndex?: number; 
    pageSize?: number; 
    totalRecord?: number; 
    data?: any[];
}