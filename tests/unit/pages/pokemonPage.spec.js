import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/pokemonPage'
import { pokemons } from '../mocks/pokemons.mock'

import PokemonImage from '@/components/PokecmonImage'
import PokemonOptions from '@/components/PokemonOptions'

describe('Pokemon Page component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    test('Debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe de llamar el mixPokemonArray al montar', () => {
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
        const wrapper = shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('Debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    lives: 1
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    lives: 1
                }
            }
        })
        let componentImage = wrapper.findComponent(PokemonImage)
        let componentOptions = wrapper.findComponent(PokemonOptions)
        //PokemonPicture debe de existir
        expect(componentImage.exists()).toBe(true)
        //PokemonOptions debe de existir
        expect(componentOptions.exists()).toBe(true)
        
        //PokemonPicture atributo pokemonId === 5
        expect(componentImage.attributes('pokemonid')).toBe("5")
        //PokemonOptions atributo pokemons toBe true
        expect(componentOptions.attributes('pokemons')).toBeTruthy()

        //Otra forma de resolver la prueba
        let picture = wrapper.find('pokemon-image-stub')
        let options = wrapper.find('pokemon-options-stub')
        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()
        //Propiedades
        expect(picture.attributes('pokemonid')).toBe("5")
        expect(options.attributes('pokemons')).toBeTruthy()
    })

    test('Pruebas con checkAnswer', async() => {
        const wrapper = shallowMount(PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    lives: 1
                }
            }
        })
        //Cuando la respuesta es correcta
        await wrapper.vm.checkAnswer(5)
        expect(wrapper.vm.pokemon.id).toBe(pokemons[0].id)
        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.vm.showAnswer).toBeTruthy()
        expect(wrapper.vm.message).toBe(`Correcto, ${pokemons[0].name}`)
        expect(wrapper.vm.lives).toBe(1)
        //Cuando la respuesta es incorrecta
        await wrapper.vm.checkAnswer(10)
        expect(wrapper.vm.pokemon.id).toBe(pokemons[0].id)
        expect(wrapper.vm.showPokemon).toBe(false)
        expect(wrapper.vm.showAnswer).toBe(true)
        expect(wrapper.vm.message).toBe('Ups, te queda una vida')
        expect(wrapper.vm.lives).toBe(0)
    })
})