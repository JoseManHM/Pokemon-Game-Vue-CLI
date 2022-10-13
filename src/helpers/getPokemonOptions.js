import pokemonApi from "@/api/pokemonApi"

//Se crea un arreglo vacío con 650 posiciones
export const getPokemons = () => {
    const pokemonsArr = Array.from( Array(650) )
    return pokemonsArr.map((_, index) => index + 1)
}

//Se mezcla el arreglo creado anteriormente y se seleccionan solo 4 número aleatorios
const getPokemonOptions = async() => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5 )
    
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))
    return pokemons
}

//Se reciben 4 números de pokemones y se consulta el nombre de cada uno de ellos
export const getPokemonNames = async([n1, n2, n3, n4] = []) => {
    // const response = await pokemonApi.get('/200')
    // console.log(response.data.name)
    const arrPromise = [
        pokemonApi.get(`/${n1}`),
        pokemonApi.get(`/${n2}`),
        pokemonApi.get(`/${n3}`),
        pokemonApi.get(`/${n4}`)
    ]

    const [pk1, pk2, pk3, pk4] = await Promise.all( arrPromise )
    return [
        {name: pk1.data.name, id: pk1.data.id},
        {name: pk2.data.name, id: pk2.data.id},
        {name: pk3.data.name, id: pk3.data.id},
        {name: pk4.data.name, id: pk4.data.id}
    ]
}  

export default getPokemonOptions