import { getShowDetails } from "./tvmaze-api.js";

const url = new URL(document.URL);
const searchParams = url.searchParams;
const showId = searchParams.get("id");

getShowDetails(showId)
  .then((show) => {
    const { name, image, genres, language, network, type, summary } = show;
    console.log(show);
    let html = document.querySelector(".card");
    html.innerHTML = `
    <div class="bg-light pb-5">
        <div class="title pt-3 ps-3" style="background-color:#3C948B">
          <p><i class="fa-solid fa-circle-info fs-3"></i> <span class="h3">Info</span></p>
          <div class="" style="height:1px;margin:10px 0; background-color:green"></div>
        </div>
        
        <div class="d-flex justify-content-between px-3">
          <div class="img-container">
            <img src="${image.original}" alt="${name}" id="image" class='img-fluid rounded'>
          </div>
          <div class="p-3">
            <h2>${name}</h2>
            <p><span class="h5">Summary:</span>${summary}</p>
            <p><i class="fa-solid fa-globe"></i> <span class="h5">Country: </span> ${network.country.name}</p>
            <p><i class="fa-solid fa-backward"></i> <span class="h5">Previous episode: </span> ${type}</p>
            <p><i class="fa-solid fa-film"></i><span class="h5"> Genre: </span>${genres.join("-")}</p>
            <p><i class="fa-solid fa-language"></i> <span class="h5">Language: </span>${language}</p> 
          </div>
        </div>
    </div>
    <div style="height:1px;margin:10px 0; background-color:green"></div>
    `;
    document.body.appendChild(html);
  })
  .catch((err) => {
    console.log(err);
  });
