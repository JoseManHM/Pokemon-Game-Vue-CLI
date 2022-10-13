<template>
    <h1 v-if="!pokemon">Cargando...</h1>
    <div v-else>
        <h1>¿Quién es este pokemon??</h1>
        <!-- TODO: img -->
        <pokemon-image 
            :pokemonId="pokemon.id" :showPokemon="showPokemon" 
        />
        <!--TODO: opciones -->
        <pokemon-options 
            :pokemons="pokemonArr"
            @selection="checkAnswer"
        />
        <template v-if="showAnswer">
            <h2 class="fade-in">{{message}}</h2>
            <button @click="newGame">Nuevo juego</button>
        </template>
    </div>
</template>

<script>
import PokemonImage from '@/components/PokecmonImage'
import PokemonOptions from '@/components/PokemonOptions'
import getPokemonOptions from '@/helpers/getPokemonOptions'

//console.log( getPokemonOptions() )

export default {
    components:{PokemonImage, PokemonOptions},
    data(){
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: '',
            lives: 1
        }
    },
    methods: {
        async mixPokemonArray(){
            this.pokemonArr = await getPokemonOptions()
            
            const randomNumber = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[randomNumber]
        },
        checkAnswer: function(selectedID){
            if(selectedID == this.pokemon.id){
                this.showPokemon = true
                this.showAnswer = true
                this.message = `Correcto, ${this.pokemon.name}`
            }else{
                if(this.lives == 0){
                    this.showPokemon = true
                    this.showAnswer = true
                    this.message = `Ups, la opción correcta es ${this.pokemon.name}`
                }else{
                    this.showPokemon = false
                    this.showAnswer = true
                    this.message = `Ups, te queda una vida`
                    this.lives --
                }
            }
        },
        newGame(){
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr =[]
            this.pokemon = null
            this.lives = 1
            this.mixPokemonArray()
        }
    },
    mounted(){
        this.mixPokemonArray()
    }
}
</script>