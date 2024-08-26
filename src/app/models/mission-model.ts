export interface MissionModel{
    id: number, 
    name?: string, 
    description?: string, 
    earnPoint?: number, 
    serviceId?: number, 
    gameName?: string, 
    imageUrl?: string, 
    bannerUrl?: string, 
    code?: string, 
    totalJoin?: number, 
    createDate?: Date, 
    startDate?: Date, 
    endDate?: Date, 
    status?: number, 
    userStatus?: number
}