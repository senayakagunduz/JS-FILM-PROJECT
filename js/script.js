import { getShowList, getShow, getEpisodes, getPeople } from "./tvmaze-api.js";

const url = new URL(document.URL);
const searchParams = url.searchParams;
const showId = searchParams.get("id");

let timeOutSearch = null;

const lstTvShows = document.querySelector("#lstTvShows");
const dropdownMenu = document.getElementById("dropdown-menu");
const dramaDiv=document.querySelector("#drama");
const comedyDiv=document.querySelector("#comedy");
const comedyTitle=document.querySelector("#comedyTitle");

dropdownMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "A") {
    const selectedShowId = e.target.id;
    getEpisodes(selectedShowId, (episodes) => {
      lstTvShows.innerHTML = "";
      episodes.forEach((episode) => {
        const episodeCard = createEpisodeCard(episode);
        lstTvShows.insertAdjacentHTML("beforeend", episodeCard);
      });
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
    getShow(query, (films) => {
      createMovies(films);
      dramaDiv.classList.add("d-none");
      comedyDiv.classList.add("d-none");
      comedyTitle.classList.add("d-none");
    });
  }, 500);
  // if(!query){
  //   dramaDiv.classList.remove("d-none");
  //   comedyDiv.classList.remove("d-none");
  //   comedyTitle.classList.remove("d-none");
  // }

});

const createPeopleList = (people) => {
  lstTvShows.innerHTML = "";

  const limitedPeople = people.slice(0, 20);
  console.log(limitedPeople);

  limitedPeople.forEach((person) => {
    lstTvShows.innerHTML += `
    <div class="col mb-4">
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
  data.forEach((show) => {
    const showCard = createShowCard(show);
    lstTvShows.insertAdjacentHTML("afterbegin", showCard);
  });
};

const getDrama = () => {
  const dramaDiv = document.querySelector("#drama");

  getShowList()
    .then((data) => {
      const dramaShows = (data.filter((show) => show.genres.includes("Drama"))).slice(0,12);
      console.log(dramaShows);
      const titleDrama = document.createElement("h1");
      dramaDiv.classList.add("text-dark");
      titleDrama.innerText = "DRAMA";
      titleDrama.classList.add("mb-0");
      dramaDiv.insertAdjacentElement("afterbegin", titleDrama);
      createShows(dramaShows, dramaDiv);
    })
    .catch((error) => {
      console.log("Error fetching show list:", error);
    });
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
      const comedyDiv = document.querySelector("#comedy");

      comedyDiv.classList.add("text-dark");
      comedyDiv.innerHTML = comedyShowCard;
      console.log(comedyShowCard);
    });
    console.log(comedyShowCard);
  })
  .catch((error) => {
    console.log("error fetching showlist", error);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  getDrama();
 // getComedy();
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
