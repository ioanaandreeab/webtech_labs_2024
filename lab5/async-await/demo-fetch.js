// https://pokeapi.co/ -- API docs

const pokemonApi = 'https://pokeapi.co/api/v2/';
const selectedPokemon = 'eevee';

const fetchPokemon = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const getPokemonHeightWeightInfo = async () => {
  try {
    const pokemonParsedResponse = await fetchPokemon(`${pokemonApi}/pokemon/${selectedPokemon}`);
    const { height, weight } = pokemonParsedResponse;
    console.log(`Pokemon ${selectedPokemon}: weight - ${weight}, height - ${height}`);
  } catch (error) {
    console.error('Error fetching height and weight:', error);
  }
};

const getAbilityInfo = async (abilityUrl) => {
  try {
    const abilityParseResp = await fetchPokemon(abilityUrl);
    const abilityEntryEnglish = abilityParseResp.effect_entries.find(effect => effect.language.name === "en");
    return abilityEntryEnglish;
  } catch (error) {
    console.error('Error fetching ability information:', error);
    return null;
  }
};

const getPokemonAbilities = async () => {
  try {
    const pokemonParsedResponse = await fetchPokemon(`${pokemonApi}/pokemon/${selectedPokemon}`);
    const { abilities } = pokemonParsedResponse;
    console.log(`Pokemon ${selectedPokemon}: abilities`);
    for (const abilityInfo of abilities) {
      const abilityEntry = await getAbilityInfo(abilityInfo.ability.url);
      if (abilityEntry) {
        console.log(abilityEntry.short_effect);
      }
    }
  } catch (error) {
    console.error('Error fetching abilities:', error);
  }
};

getPokemonHeightWeightInfo();
getPokemonAbilities();