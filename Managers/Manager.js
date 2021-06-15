const SpotifyWebApi = require('spotify-api.js');
const DeezerPublicApi = require('deezer-public-api');


module.exports = class PlayListFounder {
    constructor() {
        this.DefaultCacheOptions = {
            cacheTracks: true, // incase I only want to cache the tracks only I will this to true
            cacheUsers: false,
            cacheCategories: false,
            cacheEpisodes: false,
            cacheShows: false,
            cachePlaylists: true,
            cacheArtists: true,
            cacheAlbums: false,
            cacheCurrentUser: false,
            cacheFollowers: null
        };
        this.spotifyApi = new SpotifyWebApi.Client(process.env.TOKEN, this.DefaultCacheOptions)
        this.deezerApi = new DeezerPublicApi();

        this.init()
    }


    async init(){
        this.spotifyApi.login(process.env.clientId, process.env.clientSecret).then(async () => {
            // const playlists = await this.spotifyApi.playlists.search('1CD14NhpamuHYPa80X1k0N?si=cfc9d51620284000', { limit: 20 });
            // const pl = await this.spotifyApi.playlists.getTracks('1CD14NhpamuHYPa80X1k0N')
            // pl.items.map((music) => console.log(music.track))
            console.log("Logged in spotify api")
        })
    }

}