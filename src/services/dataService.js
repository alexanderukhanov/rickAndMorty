const CHARACTERS_URL = "https://rickandmortyapi.com/api/character?page=";
const LOCATIONS_URL = "https://rickandmortyapi.com/api/location/";
const EPISODES_URL = "https://rickandmortyapi.com/api/episode/";
const NUMBER_ONE = 1;
class DataService {
    async getResource(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
        }
        const data = await response.json();
        return data;
    }
    getCharacters(page = NUMBER_ONE) {
        return this.getResource(CHARACTERS_URL + page);
    }
    getLocations() {
        return this.getResource(LOCATIONS_URL);
    }
    getLocationsByName(name) {
        const getLocationByNameUrl = LOCATIONS_URL.concat("?name=", name);
        return this.getResource(getLocationByNameUrl);
    }
    getEpisodes() {
        return this.getResource(EPISODES_URL);
    }
    getLocationById(id) {
        const getLocationByIdUrl = LOCATIONS_URL.concat(id);
        return this.getResource(getLocationByIdUrl);
    }
    getEpisodeById(id) {
        return this.getResource(EPISODES_URL+id);
    }
}

export default DataService;