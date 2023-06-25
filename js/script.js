import { getShowList, getShow, getEpisodes, getPeople } from "./tvmaze-api.js";

const url = new URL(document.URL);
const searchParams = url.searchParams;
const showId = searchParams.get("id");

let timeOutSearch = null;

const lstTvShows = document.querySelector("#lstTvShows");
const dropdownMenu = document.getElementById("dropdown-menu");
const dramaTitle=document.querySelector("#dramaTitle");
const dramaDiv=document.querySelector("#drama");
const comedyDiv=document.querySelector("#comedy");
const comedyTitle=document.querySelector("#comedyTitle");
const fantasyDiv=document.querySelector("#fantasy");
const fantasyTitle=document.querySelector("#fantasyTitle");
const logoImg=document.querySelector("#logo");
const txtSearch=document.querySelector("#txtSearch");


dropdownMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "A") {
    const selectedShowId = e.target.id;
    getEpisodes(selectedShowId, (episodes) => {
      lstTvShows.innerHTML = "";
      const limitedEpisodes=episodes.slice(0,24);
      limitedEpisodes.forEach((episode) => {
        const episodeCard = createEpisodeCard(episode);
        lstTvShows.insertAdjacentHTML("beforeend", episodeCard);
      });
      const firstDivElement=document.querySelector("#lstTvShows");
      firstDivElement.setAttribute("style","margin-top:8rem"); 
    });
  }
});

const createEpisodeCard = (episode) => {
  const { name, season, rating, image } = episode;
  return `
  <div class="col mb-4">
        <div class="card h-100" style="cursor:pointer">
          <img src=${image.original} class="card-img-top" alt="${name}" />
          <div class="card-body text-light" style="background-color: #3C948B;">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">Season: ${season}, Rating:${rating.average}</p>
          </div>
        </div>
    </div>
  `;
};

document.querySelector("#txtSearch").addEventListener("input", (e) => {
  e.preventDefault();
  let query = e.target.value;

  if (timeOutSearch) clearTimeout(timeOutSearch);

  timeOutSearch = setTimeout(() => {
    if (query === "") {
      setGenres()
    } else {
      getShow(query, (films) => {
        createMovies(films);
      dramaDiv.classList.add("d-none");
      dramaTitle.classList.add("d-none");
      comedyDiv.classList.add("d-none");
      comedyTitle.classList.add("d-none");
      fantasyDiv.classList.add("d-none");
      fantasyTitle.classList.add("d-none");
      });
    }
  }, 500);

  const firstDivElement=document.querySelector("#lstTvShows");
  firstDivElement.setAttribute("style","margin-top:8rem"); 
});
         
const createPeopleList = (people) => {
  lstTvShows.innerHTML = "";

  const limitedPeople = people.slice(0, 20);
  console.log(limitedPeople);

  limitedPeople.forEach((person) => {
    lstTvShows.innerHTML += `
    <div class="col mb-4" style="margin-top:8rem">
        <div class="card h-100" style="cursor:pointer">
          <img src=${person.image.original} class="card-img-top" alt="${person.name}" />
          <div class="card-body text-light" style="background-color: #3C948B;">
              <h5 class="card-title">${person.name}</h5>
          </div>
        </div>
    </div>
    `;
  });
};

document.querySelector("#people").addEventListener("click", (e) => {
  getPeople(people).then((data) => createPeopleList(data));
});

const createShows = (data) => {
  lstTvShows.innerHTML = "";
  const limitedData=data.slice(0,20);
  limitedData.forEach((show,index) => {
    const showCard = createShowCard(show);
    lstTvShows.insertAdjacentHTML("afterbegin", showCard);
  });
  const firstDivElement=document.querySelector("#lstTvShows");
  firstDivElement.setAttribute("style","margin-top:8rem");
};

const setGenres = () => {
  const dramaDiv = document.querySelector("#drama");
  const comedyDiv = document.querySelector("#comedy");
  const fantasyDiv = document.querySelector("#fantasy");
  getShowList()
  
    .then((data) => {
        const dramaTitle=document.querySelector("#dramaTitle");
        const dramaShows = (data.filter((show) => show.genres.includes("Drama"))).slice(0,12);
        let dramaShowCard = "";
        const h1 = document.createElement("h1"); 
        h1.innerText = "DRAMA";
        dramaTitle.insertAdjacentElement("afterbegin", h1);

        dramaShows.forEach((item)=>{
          dramaShowCard += createShowCard(item);
          dramaDiv.classList.add("text-dark");
          dramaDiv.innerHTML = dramaShowCard;
        })
        
      })
    getShowList()
  .then((data) => {
    const comedyTitle=document.querySelector("#comedyTitle");
    const comedyShows = (data.filter((show) => show.genres.includes("Comedy"))).slice(0,12);
    let comedyShowCard = "";
    const h1 = document.createElement("h1");
    h1.innerText = "COMEDY";
    comedyTitle.insertAdjacentElement("afterbegin",h1);

    comedyShows.forEach((item) => {
      comedyShowCard += createShowCard(item);
      comedyDiv.classList.add("text-dark");
      comedyDiv.innerHTML = comedyShowCard;  
    });
  })
  getShowList()
  .then((data) => {
    const fantasyTitle=document.querySelector("#fantasyTitle");
    const fantasyShows = (data.filter((show) => show.genres.includes("Fantasy"))).slice(0,12);
    let fantasyShowCard = "";
    const h1 = document.createElement("h1");
    h1.innerText = "FANTASY";
    fantasyTitle.insertAdjacentElement("afterbegin",h1);

    fantasyShows.forEach((item) => {
      fantasyShowCard += createShowCard(item);
      fantasyDiv.classList.add("text-dark");
      fantasyDiv.innerHTML = fantasyShowCard;
      console.log(fantasyShowCard);
    });
    console.log(fantasyShowCard);
  })
    .catch((error) => {
      console.log("Error fetching show list:", error);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  setGenres();
});

const createShowCard = (item) => {
  const { image, name, genres } = item;

  let movieImage = "img/noimage.png";
  if (image) {
    movieImage = image.medium;
  }

  return `
  <div class="col mb-4">
  <div class="card h-100" style="cursor:pointer">
    <img src=${image.original} class="card-img-top" alt="${name}" />
    <div class="card-body" style="background-color: #3C948B;">
        <h5 class="card-title text-light">${name}</h5>
        <h5 class="card-title text-light">${genres}</h5>
    </div>
  </div>
</div>
  `;
};

document.querySelector("#shows").addEventListener("click", (e) => {
  getShowList().then((data) => createShows(data));
});

lstTvShows.addEventListener("click", (e) => {
  const selectedCard = e.target.closest(".card");
  const showId = selectedCard.dataset.show;
  location.href = `tvShowDetails.html?id=${showId}`;
});
const createMovies = (films, data) => {
  lstTvShows.innerHTML = "";
  films.forEach((item) => {
    const movieCard = createMovieCard(item);
    lstTvShows.insertAdjacentHTML("afterbegin", movieCard);
  });
};

const createMovieCard = (item) => {
  const { id, image, name, genres } = item.show;
  let movieImage = "img/noimage.png";
  if (image) {
    movieImage = image.medium;
  }
  return `
  <div class="col mb-4">
        <div class="card h-100 mt-3" style="cursor:pointer" data-show="${id}">
          <img src=${movieImage} class="card-img-top" alt="${name}" />
          <div class="card-body text-light" style="background-color: #3C948B;">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${genres.join("-")}</p>
          </div>
        </div>
  </div>`;
};

document.querySelector(".logo").addEventListener("click", (e) => {
  getShowList()
  .then((data) => createShows(data))
  .catch((error) =>{
    console.log("error fetching show lis",error);
  })
});
