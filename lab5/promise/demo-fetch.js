// https://pokeapi.co/ -- API docs

const pokemonApi = 'https://pokeapi.co/api/v2/';
const selectedPokemon = 'eevee';

// simple promise
const getPokemonHeightWeightInfo = () => {
    return new Promise((resolve, reject) => {
        fetch(`${pokemonApi}/pokemon/${selectedPokemon}`)
        .then(res => res.json())
        .then(pokemonParsedResponse => {
            const {height, weight} = pokemonParsedResponse;
            resolve({height, weight});
        });
    });
}

const getAbilityInfo = (abilityUrl) => {
    return new Promise((resolve, reject) => {
        fetch(abilityUrl)
        .then(res => res.json())
        .then(abilityParseResp => {
            const abilityEntryEnglish = abilityParseResp.effect_entries.find(effect => effect.language.name === "en");
            resolve(abilityEntryEnglish);
        });
    });
}

// promise all
const getPokemonAbilities = () => {
    return new Promise((resolve, reject) => {
        fetch(`${pokemonApi}/pokemon/${selectedPokemon}`)
        .then(res => res.json())
        .then(pokemonParsedResponse => {
            const {abilities} = pokemonParsedResponse;
            const promisesUrls = abilities.map(abilityInfo => abilityInfo.ability.url);
            const abilitiesPromises = promisesUrls.map(promiseUrl => getAbilityInfo(promiseUrl));

            Promise.all(abilitiesPromises).then((res) => {
                resolve(res);
            });
        });
    });
}

getPokemonHeightWeightInfo()
.then(({weight, height}) => {
    console.log(`Pokemon ${selectedPokemon}: weight - ${weight}, height - ${height}`);
});

getPokemonAbilities().then(abilitiesResponse => {
    console.log(`Pokemon ${selectedPokemon}: abilities`);
    abilitiesResponse.forEach((ability) => {
        console.log(ability.short_effect);
    })
});

