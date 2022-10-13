import { shallowMount } from "@vue/test-utils"
import PokemeonOptions from '@/components/PokemonOptions'

import { pokemons } from '../mocks/pokemons.mock'

describe('Pokemon Options component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PokemeonOptions, {
            props: {
                pokemons: pokemons
            }
        })
    })
    test('Debe de hacer match con el snapshot', () => {
        //console.log(wrapper.html())
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Debe de mostrar las cuatro opciones correctamente', () => {
        const li = wrapper.findAll('li')
        expect(li).toHaveLength(4)
        expect(li[0].text()).toBe('pikachu')
        expect(li[1].text()).toBe('charmander')
        expect(li[2].text()).toBe('venusaur')
        expect(li[3].text()).toBe('mew')
    })

    test('Debe de emitir "selection" con sus respectivos parámetros al hacer click', () => {
        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')
        
        expect(wrapper.emitted('selection').length).toBe(4)
        expect(wrapper.emitted('selection')[0]).toEqual([5])
        expect(wrapper.emitted('selection')[1]).toEqual([10])
        expect(wrapper.emitted('selection')[2]).toEqual([15])
        expect(wrapper.emitted('selection')[3]).toEqual([20])
    })
})