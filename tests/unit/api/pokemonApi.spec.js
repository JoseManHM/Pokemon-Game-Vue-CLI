import pokemonApi from '@/api/pokemonApi'

describe('PokemonAPi', () => {
    test('Axios debe de estar configurado con el api de pokemon', () => {
        expect( pokemonApi.defaults.baseURL ).toBe('https://pokeapi.co/api/v2/pokemon')
    })
})