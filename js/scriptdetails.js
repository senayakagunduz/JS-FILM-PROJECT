import { getShowDetails } from "./tvmaze-api.js";


const url=new URL(document.URL);
const searchParams=url.searchParams;
const showId=searchParams.get("id");

getShowDetails(showId)
.then((show)=>{
    const {name,image,genres,language,network,type,summary}=show;
    console.log(show)
    let html=document.querySelector(".card");
    html.innerHTML=`
    <div class="card-body showDetails">
      <img src="${image.original}" alt="${name}" id="image">
      <h2 id="title">${name}</h2>
      <h3>country:${network.country.name}<h3/>
      <h3>previous episode:${type}<h3/>
      <h4>genre:${genres.join("-")}</h4>
      <h4>language:${language}</h4>
      <p>summary:${summary}</p>
    </div>`;
    document.body.appendChild(html); 
})
.catch((err) => {
    console.log(err);
})
