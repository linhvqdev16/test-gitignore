export interface UserModel{
    accountId?: number, 
    accountName?: string, 
    accountFullname?: string, 
    accountJoined?: Date, 
    email?: string, 
    locationID?: number, 
    status?: number, 
    mobile?: string, 
    gender?: number, 
    address?: string, 
    facebookId?: string, 
    facebookEmail?: string, 
    facebookName?: string, 
    fbUserName?: string, 
    facebookGender?: number, 
    googleId?: string, 
    googleEmail?: string, 
    googleName?: string, 
    googleGender?: number, 
    vtcId?: number, 
    vtcAccountName?: string, 
    yahooId?: string, 
    yahooEmail?: string, 
    yahooName?: string, 
    yahooGender?: number
}

export interface UserModelBasic{
    userName?: string, 
    scoinName?: string, 
    linkDownload?: string, 
    referenceCode?: string, 
    slogan?: string, 
    youtubeChannel?: string, 
    liveGChannel?: string, 
    tiktokChannel?: string
}