const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';



let cities = [];
fetch(endpoint)
    .then(res => res.json())
    .then(d => cities.push(...d))


function find(keyword, cities) {
    return cities.filter(place => {
        const regex = new RegExp(keyword, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
function display() {
    const name = find(this.value, cities);
    const req = name.map(value => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = value.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = value.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
        <span class = "name">${cityName}, ${stateName}</span>
        <span class = "population">${numberWithCommas(value.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = req;
}



searchInput.addEventListener("keyup", display);
searchInput.addEventListener("change", display);