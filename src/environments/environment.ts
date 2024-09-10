export const environment = {
    production: true, 
    apiUrl: 'https://s.qdht.vn/inf', 
    authTokenKey: '', 
    client_id: "6cdd54dc21aa2eff51f72f1fa658a5d1",
    client_secret: "efeaa5b1da053015a58ebfcb13081e86",
    serviceId: 330307,
    author_url: "https://graph.vtcmobile.vn/oauth/authorize?client_id=clientValue&redirect_uri=redirecUrl&agencyid=agencyValue&loginmode=",
    get_accesstoken_url: "https://graph.vtcmobile.vn/oauth/access_token?client_id={0}&code={1}&client_secret={2}&redirect_uri={3}",
    get_userinfo_url: "https://graph.vtcmobile.vn/accountapi/server/get_user_info_by_name.aspx?api_key={0}&username={1}",
    register_url: "https://graph.vtcmobile.vn/oauth/authorize?client_id={0}&redirect_uri={1}&agencyid={2}&action={3}&loginmode=popup",
};
