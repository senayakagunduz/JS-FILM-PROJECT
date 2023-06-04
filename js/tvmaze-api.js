const baseUrl="https://api.tvmaze.com";

const getShowList=()=>{
    const url = `${baseUrl}/shows`;
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then((resp)=>resp.json())
        .then((data)=>resolve(data))
        .then((err)=>reject(err))
    })
}
const getShow = (query, cb) => {
    const url = `${baseUrl}/search/shows?q=${query}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => cb(data));
  };

  const getShowDetails=(showId)=>{
    const url=`${baseUrl}/shows/${showId}`;
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then(resp=>resp.json())
        .then(data=>resolve(data))
        .catch((err)=>reject(err));
    })
  }
//sadece ...id li dizinin bölümlerini(episode) getiriyor.
const getEpisodes=(showId,cb)=>{
    const url=`${baseUrl}/shows/${showId}/episodes`;

    fetch(url)
    .then(resp=>resp.json())
    .then(data=>console.log("episodes",cb(data)));
}

const getPeople=()=>{
    const url=`${baseUrl}/people`;
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then(resp=>resp.json())
        .then(data=>resolve(data))
        .catch(err=>reject(err));
    })
}

export {getShowList, getShow, getShowDetails, getEpisodes, getPeople};
