const router = require('express').Router();


router.post('/id/:id', async (req, res) => {
    const {  id } = req.params;
    const manager = req.app.get('manager');
    const playlist = await manager.deezerApi.playlist(id);
    if(playlist.error) return res.status(404).json({error : playlist.error})
    return res.status(200).send(playlist)
})

router.post('/search/:search', async (req, res) => {
    const { search } = req.params;
    const manager = req.app.get('manager');
    const playlists = await manager.deezerApi.search.playlist(search, 20);
    if(playlists.data.length < 1) return res.status(200).json({error: 'No playlist found with' + search})
    return  res.status(200).send(playlists)
})

module.exports =  router;