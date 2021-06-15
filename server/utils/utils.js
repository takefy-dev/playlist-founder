const Collection = require('./collection')

function spotifyArtistOccurence(playlistTracks) {
    const result = new Collection();
    for(const tracks of playlistTracks){
        const track = tracks.track
        const artists= track.artists;
        for(const artist of artists){
            if(result.has(artist.name)){
                let occ = result.get(artist.name).occurence;
                result.set(artist.name, {id: artist.id, occurence: occ+1, name: artist.name})
            }else{
                result.set(artist.name, {id: artist.id, occurence: 1, name: artist.name});
            }
        }
    }
    return result
}

function deezerArtistOccurence(playlistTracks) {
    const result = new Collection();
    for(const track of playlistTracks.data){
            const { artist } = track
            if(result.has(artist.name)){
                let occ = result.get(artist.name).occurence;
                result.set(artist.name, {id: artist.id, occurence: occ+1, name: artist.name})
            }else {
                result.set(artist.name, {id: artist.id, occurence: 1, name: artist.name});
            }
    }
    return result;
}

function firstXName(x, occurence){
    let i = 0;
    const names=  occurence.map((artist) => {
        i++;
        return i < x ? artist.name.split(' ').join('-') : ''

    })
    return names.join(' ');
}

async function spotifyCheckPlaylist(playlistID, spotifyClient, artistQuery){
    const playlistTracks = await spotifyClient.playlists.getTracks(playlistID);
    let i = 0

    for(const tracks of playlistTracks.items){
        const track = tracks.track;
        const artists = track.artists;
        let names = artistQuery.split(' ').filter(x => x !== '');
        artists.forEach(artist => {
            if(names.includes(artist.name.split(' ').join('-'))) i++;
        })
    }
    if(playlistTracks.items.length / 2 > i) return playlistID;
    return undefined;
}

async function deezerCheckPlaylist(id, deezerManager, artistQuery){
    let i = 0;
    const playlist = await deezerManager.playlist(id);
    const tracks = playlist.tracks.data;
    for(const track of tracks){
        const { artist } = track;
        let names = artistQuery.split(' ').filter(x => x !== '');
        if(names.includes(artist.name.split(' ').join('-'))) i++;
    }
    if(tracks.length / 2 > i) return playlist.id;
    return undefined;
}

module.exports = { spotifyArtistOccurence,firstXName, spotifyCheckPlaylist, deezerCheckPlaylist, deezerArtistOccurence };