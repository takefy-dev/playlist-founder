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

function firstXName(x, occurence){
    let i = 0;
    const names=  occurence.map((artist) => {
        i++;
        return i < x ? artist.name : ''

    })
    return names.join(' ');
}

module.exports = { spotifyArtistOccurence,firstXName };