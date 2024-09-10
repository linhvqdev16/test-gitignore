export interface ServiceModel{
    id?: number;
    serviceId?: number; 
    serviceName?: string;
    serviceImage?: string; 
    isIos?: boolean; 
    isAndroid?: boolean; 
    isPc?: boolean;
    serviceThumb?: string; 
    startDate?: Date; 
    endDate?: Date; 
    link?: string; 
    description?: string; 
    content?: string; 
    imageUrl?: string; 
    bannerUrl?: string; 
    isBanner?: number;
    totalUsers?: number;
    totalInstall?: number; 
    status?: number; 
    userStatus?: number; 
    totalClicks?: number;
    gameGenre?: string;
}