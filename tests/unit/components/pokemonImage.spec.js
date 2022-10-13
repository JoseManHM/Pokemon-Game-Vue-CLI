import { shallowMount } from '@vue/test-utils' 
import PokecmonImage from '@/components/PokecmonImage'

describe('Pokemon Picture component', () => {
    test('Debe de hacer match con el snapshot', () => {

        const wrapper = shallowMount(PokecmonImage,{
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe de mostrar la imagen oculta y el pokemon 100', () => {

        const wrapper = shallowMount(PokecmonImage,{
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        })
        const [img1, img2] = wrapper.findAll('img')

        expect(img1.exists()).toBeTruthy()
        expect(img2).toBeUndefined()
        expect(img1.classes('hidden-pokemon')).toBe(true)
        expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
    })

    test('Debe de mostrar el pokemon la imagen del pokemon si showPokemon es true', () => {
        const wrapper = shallowMount(PokecmonImage,{
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })
        const [img1] = wrapper.findAll('img')

        expect(img1.exists()).toBeTruthy()
        expect(img1.classes('hidden-pokemon')).toBe(false)
        expect(img1.classes('fade-in')).toBe(true)
    })
})