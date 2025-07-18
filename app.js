let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let search_input = document.getElementById('search_input');
let search_input_moved = document.getElementById('search_input_moved');
let search_mobile = document.querySelector('.search-mobile');

left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
})
right_btn.addEventListener('click', () => {
    cards.scrollLeft += 140;
})

let json_url = "movie.json";

fetch(json_url).then(Response => Response.json())
    .then((data) => {
        data.forEach((ele, i) => {
            let { name, imdb, date, sposter, bposter, genre } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = `movie.html?name=${encodeURIComponent(name)}`;
            card.innerHTML = `
            <img src="${sposter}" alt="${name}" class="poster">
            <div class="rest_card">
                <img src="${bposter}" alt="">
                <div class="cont">
                    <h4>${name}</h4>
                    <div class="sub">
                        <p>${genre}, ${date}</p>
                        <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                    </div>
                </div>
            </div>
            `
            cards.appendChild(card);
        });

        document.getElementById('title').innerText = data[0].name;
        document.getElementById('gen').innerText = data[0].genre;
        document.getElementById('date').innerText = data[0].date;
        document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i> ${data[0].imdb}`;

        // search data  load 
        data.forEach(element => {
            let { name, imdb, date, sposter, genre } = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = `movie.html?name=${encodeURIComponent(name)}`;
            card.innerHTML = `
            <img src="${sposter}" alt="">
                        <div class="cont">
                            <h3>${name} </h3>
                            <p>${genre}, ${date} , <span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</p>
                        </div>
            `
            search.appendChild(card);
        });

        // search filter  

        search_input.addEventListener('keyup', () => {
            let filter = search_input.value.toUpperCase();
            let a = search.getElementsByTagName('a');

            for (let index = 0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('cont')[0];
                // console.log(a.textContent)
                let TextValue = b.textContent || b.innerText;
                if (TextValue.toUpperCase().indexOf(filter) > -1) {
                    a[index].style.display = "flex";
                    search.style.visibility = "visible";
                    search.style.opacity = 1;
                } else {
                    a[index].style.display = "none";
                }
                if (search_input.value == 0) {
                    search.style.visibility = "hidden";
                    search.style.opacity = 0;
                }
            }
        })

        // Enable search for mobile search bar with suggestion popup
        if (search_input_moved && search_mobile) {
            // Store all movie data for filtering
            let allMovies = [];
            data.forEach(element => {
                let { name, imdb, date, sposter, genre } = element;
                allMovies.push({ name, imdb, date, sposter, genre });
            });

            search_input_moved.addEventListener('keyup', () => {
                let filter = search_input_moved.value.toUpperCase();
                search_mobile.innerHTML = '';
                if (filter === '') {
                    search_mobile.style.visibility = 'hidden';
                    search_mobile.style.opacity = 0;
                    return;
                }
                let found = false;
                allMovies.forEach(movie => {
                    let text = `${movie.name} ${movie.genre} ${movie.date} ${movie.imdb}`.toUpperCase();
                    if (text.indexOf(filter) > -1) {
                        found = true;
                        let a = document.createElement('a');
                        a.classList.add('card');
                        a.href = `movie.html?name=${encodeURIComponent(movie.name)}`;
                        a.innerHTML = `
                            <img src="${movie.sposter}" alt="">
                            <div class="cont">
                                <h3>${movie.name}</h3>
                                <p>${movie.genre}, ${movie.date} , <span>IMDB</span><i class="bi bi-star-fill"></i> ${movie.imdb}</p>
                            </div>
                        `;
                        search_mobile.appendChild(a);
                    }
                });
                if (found) {
                    search_mobile.style.visibility = 'visible';
                    search_mobile.style.opacity = 1;
                } else {
                    search_mobile.style.visibility = 'hidden';
                    search_mobile.style.opacity = 0;
                }
            });
        }

        let video = document.getElementsByTagName('video')[0];
        let play = document.getElementById('play');
        play.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                play.innerHTML = `Play <i class="bi bi-pause-fill"></i>`
            } else {
                video.pause();
                play.innerHTML = `Watch <i class="bi bi-play-fill"></i>`
            }
        })

        let series = document.getElementById('series');
        let movies = document.getElementById('movies');
        let series_mobile = document.getElementById('series_mobile');
        let movies_mobile = document.getElementById('movies_mobile');

        series.addEventListener('click', () => {
            cards.innerHTML = '';

            let series_array = data.filter(ele => {
                return ele.type === "series";
            });

            series_array.forEach((ele, i) => {
                let { name, imdb, date, sposter, bposter, genre } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = `movie.html?name=${encodeURIComponent(name)}`;
                card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                        </div>
                    </div>
                </div>
                `
                cards.appendChild(card);
            });
        });

        movies.addEventListener('click', () => {
            cards.innerHTML = '';

            let movie_array = data.filter(ele => {
                return ele.type === "movie";
            });

            movie_array.forEach((ele, i) => {
                let { name, imdb, date, sposter, bposter, genre } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = `movie.html?name=${encodeURIComponent(name)}`;
                card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                        </div>
                    </div>
                </div>
                `
                cards.appendChild(card);
            });
        });

        // Add event listeners for mobile nav
        if (series_mobile) {
            series_mobile.addEventListener('click', (e) => {
                e.preventDefault();
                cards.innerHTML = '';
                let series_array = data.filter(ele => ele.type === "series");
                series_array.forEach((ele, i) => {
                    let { name, imdb, date, sposter, bposter, genre } = ele;
                    let card = document.createElement('a');
                    card.classList.add('card');
                    card.href = `movie.html?name=${encodeURIComponent(name)}`;
                    card.innerHTML = `
                    <img src="${sposter}" alt="${name}" class="poster">
                    <div class="rest_card">
                        <img src="${bposter}" alt="">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${genre}, ${date}</p>
                                <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                            </div>
                        </div>
                    </div>
                    `;
                    cards.appendChild(card);
                });
            });
        }
        if (movies_mobile) {
            movies_mobile.addEventListener('click', (e) => {
                e.preventDefault();
                cards.innerHTML = '';
                let movie_array = data.filter(ele => ele.type === "movie");
                movie_array.forEach((ele, i) => {
                    let { name, imdb, date, sposter, bposter, genre } = ele;
                    let card = document.createElement('a');
                    card.classList.add('card');
                    card.href = `movie.html?name=${encodeURIComponent(name)}`;
                    card.innerHTML = `
                    <img src="${sposter}" alt="${name}" class="poster">
                    <div class="rest_card">
                        <img src="${bposter}" alt="">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${genre}, ${date}</p>
                                <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                            </div>
                        </div>
                    </div>
                    `;
                    cards.appendChild(card);
                });
            });
        }

    });