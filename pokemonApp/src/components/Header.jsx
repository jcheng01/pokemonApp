import React from 'react'
import { SiPokemon } from 'react-icons/si'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { useState } from 'react';
import Axios from 'axios'
import { ReactComponent as PokemonSvg } from '../assets/pikachu.svg';

const Header = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState({
        name: '',
        species: '',
        img: '',
        hp: '',
        attack: '',
        defense: '',
        type: '',
    });

    const searchPokemon = () => {
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
            (response) => {
                console.log(response)
                setPokemon({
                    name: pokemonName,
                    ability: response.data.abilities[0].ability.name,
                    img: response.data.sprites.other.dream_world.front_default,
                    hp: response.data.stats[0].base_stat,
                    attack: response.data.stats[1].base_stat,
                    defense: response.data.stats[2].base_stat,
                    SpAttack: response.data.stats[3].base_stat,
                    SpDefense: response.data.stats[4].base_stat,
                    Speed: response.data.stats[5].base_stat,
                });
                setPokemonChosen(true);
            }

        );

    };
    return (
        <div className='m-0'>
            <div className='bg-yellow-400 flex  justify-between items-center px-6 m-auto'>
                <div className='flex items-center'>
                    <a href=''><MdOutlineCatchingPokemon size={40} color='black' className='mt-2' /></a>
                    <a href=''><SiPokemon size={120} color='black' className='' /></a>
                </div>
                <div>
                    <input
                        placeholder='enter'
                        type='text'
                        onChange={(event => { setPokemonName(event.target.value); })}
                        className='rounded-xl m-6 pl-3' />
                    <button className='bg-white rounded-xl px-3 border-2 border-black' onClick={searchPokemon} >Search Pokemon</button>
                </div>
            </div>
            <div className='grid place-items-center p-6 border-black border-2'>
                {!pokemonChosen ? (
                    <>
                        <h1 className='text-2xl font-bold text-yellow-500'>Please type a pokemon</h1>
                        {/* <img className='py-5' src={require(PokemonSvg)} alt='pokemonsprite' /> */}
                    </>

                ) : (
                    <div className='flex items-center flex-col '>
                        <a href={`https://www.serebii.net/pokedex-swsh/${pokemon.name}/`} target='_blank'><h1 className='py-1 capitalize transition duration-300 text-white hover:text-yellow-500 text-4xl font-bold'>{pokemon.name}</h1></a>

                        <img className='py-5' src={pokemon.img} alt='pokemonsprite' />
                        <div className='bg-lime-50 rounded-md p-5 transition duration-500 hover:scale-110 '>
                            <h1>Ability: {pokemon.ability}</h1>
                            <h1>Base Stats</h1>
                            <h3>HP: {pokemon.hp}</h3>
                            <h3>Attack: {pokemon.attack}</h3>
                            <h3>Defense: {pokemon.defense}</h3>
                            <h3>SpAttack: {pokemon.SpAttack}</h3>
                            <h3>SpDefense: {pokemon.SpDefense}</h3>
                            <h3>Speed: {pokemon.Speed}</h3>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Header