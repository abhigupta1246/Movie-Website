// Get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const movieName = getQueryParam('name');
const contentDiv = document.getElementById('movie-detail-content');

fetch('movie.json')
    .then(response => response.json())
    .then(movies => {
        const movie = movies.find(m => m.name.toLowerCase() === decodeURIComponent(movieName || '').toLowerCase());
        if (!movie) {
            contentDiv.innerHTML = '<h2>Movie not found</h2>';
            return;
        }
        // Set blurred background
        let bg = document.createElement('div');
        bg.className = 'movie-detail-bg';
        bg.style.backgroundImage = `url('${movie.bposter}')`;
        document.body.prepend(bg);

        // Wrap the card in a flexbox centering wrapper
        let wrapper = document.createElement('div');
        wrapper.className = 'movie-detail-wrapper';
        contentDiv.className = 'movie-detail-glass';
        contentDiv.innerHTML = `
            <h1>${movie.name}</h1>
            <img src="${movie.bposter}" alt="${movie.name}">
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Release Date:</strong> ${movie.date}</p>
            <p><strong>IMDB:</strong> <span class="movie-detail-imdb">${movie.imdb}</span></p>
            <a href="index.html" class="movie-detail-btn">Back to Home</a>
        `;
        wrapper.appendChild(contentDiv);
        document.body.appendChild(wrapper);
    })
    .catch(err => {
        contentDiv.innerHTML = '<h2>Error loading movie details</h2>';
    }); 