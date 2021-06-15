import axios from 'axios'

export function getPlaylistId(url){
        if(url.includes('si=')){
            return url.split('/playlist/')[1].split('?si=')[0];
       }
        return  url.split('/playlist/')[1];
}


export async function getRecommendedPlaylist(id) {
    const type = isNaN(id) ? 'spotify' : 'deezer'
    const data = await axios.post(`http://localhost:3000/api/playlist/${type}/${id}`);
    if(data.status === 200){
        return data.data.preferedPlaylist;
    }else{
        return data.data.error

    }
}