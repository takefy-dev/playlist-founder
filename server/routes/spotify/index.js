const router = require('express').Router();
const { spotifyArtistOccurence, firstXName,spotifyCheckPlaylist } = require('../../utils/utils');

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const manager = req.app.get('manager');
    const playlist = await manager.spotifyApi.playlists.getTracks(id);
    if(playlist.total === 0) return res.status(404).json({error: 'Playlist not found'})
    const occurence = spotifyArtistOccurence(playlist.items).filter(artist => artist.occurence > 1).sort((a,b) => b.occurence - a.occurence)

    let x = 6
    let names = firstXName(x, occurence).split('-').join(' ')
    let preferedPlaylist = await manager.spotifyApi.playlists.search(names, {limit: 20, type: ['playlist']});
    while(preferedPlaylist.total === 0 && x > 0){
        x-=1
        names = firstXName(x, occurence).split('-').join(' ')
        preferedPlaylist  = await manager.spotifyApi.playlists.search(names, {limit: 20, type: ['playlist']})
    }
    let finalPreferedPlaylist = []
    for(const playlist of preferedPlaylist.items){
        const playlistChecked = await spotifyCheckPlaylist(playlist.id, manager.spotifyApi, names);
        if(playlistChecked){
            playlist.link = playlist.externalUrls.spotify;
            finalPreferedPlaylist.push(playlist);
        }
    }
    return res.status(200).json({tracks: playlist.items, occurence: Object.fromEntries(occurence), preferedPlaylist: finalPreferedPlaylist})
})


module.exports = router;