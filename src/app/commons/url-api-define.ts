export class UrlAPIDefine {
    /// Mission
    public static GetListMission = "/mission/getList";

    /// Service 
    public static GetListService = '/api/Services/list';
    public static GetInfoService = '/api/Services/info';

    /// Quest 
    public static GetQuestByMissionId = '/mission/getMissionQuest'
    public static GetServer = '/Users/server';
    public static GetAcessToken = '/user/getAccessToken';
    public static GetRole = '/Users/role';

    /// Influencer 
    public static GetInfluencerByScoinId = '/influencer/getByScoinId';
    public static GetInfluencerByCode = '/influencer/getByReferenceName';
    public static RegisterInfluencer = '/influencer/register';
    public static GetInfluencerByServiceId = '/influencer/getListInfByGameId';
    public static SubmitSupport = '/influencer/submitSupport';

    /// Support 
    public static UnSupport = '/support/unSupport';
}