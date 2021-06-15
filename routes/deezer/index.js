const router = require('express').Router();
const {deezerArtistOccurence, firstXName, deezerCheckPlaylist} = require('../../utils/utils')

router.post('/:id', async (req, res) => {
    const {  id } = req.params;
    const manager = req.app.get('manager');
    const playlist = await manager.deezerApi.playlist(id);
    if(playlist.error) return res.status(404).json({error : playlist.error});
    const occurence = deezerArtistOccurence(playlist.tracks).filter(artist => artist.occurence > 1).sort((a,b) => b.occurence - a.occurence);
    let x = 6;
    let names = firstXName(x, occurence).split('-').join(' ');
    console.log(names)
    let preferedPlaylist = await manager.deezerApi.search.playlist(names, undefined, 20);
    while(preferedPlaylist.total === 0 && x > 0){
        x-=1
        names = firstXName(x, occurence).split('-').join(' ');
        preferedPlaylist  =  await manager.deezerApi.search.playlist(names, undefined, 20);
    }
    let finalPreferedPlaylist = []
    for(const playlist of preferedPlaylist.data){
        const playlistChecked = await deezerCheckPlaylist(playlist.id, manager.deezerApi ,names);
        if(playlistChecked){
            console.log(playlist.link)
            finalPreferedPlaylist.push(playlist);
        }
    }
    return res.status(200).json({playlist, occurence: Object.fromEntries(occurence), preferedPlaylist: finalPreferedPlaylist})
})

// router.post('/search/:search', async (req, res) => {
//     const { search } = req.params;
//     const manager = req.app.get('manager');
//     const playlists = await manager.deezerApi.search.playlist(search, 20);
//     if(playlists.data.length < 1) return res.status(200).json({error: 'No playlist found with' + search})
//     return  res.status(200).send(playlists)
// })

module.exports =  router;