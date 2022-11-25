import React, { useEffect, useState, useRef } from "react";
import { SiPokemon } from 'react-icons/si'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import Axios from 'axios'
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

const Header = () => {
    // const [pokemonName, setPokemonName] = useState([""]);
    const [search, setSearch] = useState("");
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState({});
    const searchPokemon = async () => {
        const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        console.log(res)
        setPokemon({
            name: search,
            ability: res.data.abilities.map(item => {
                return (
                    <div className="bg-gray-100 px-4 mx-2 rounded-md text-slate-900">
                        <h2 >{item.ability.name}</h2>
                    </div>
                )
            }),
            img: res.data.sprites.other.dream_world.front_default,
            stats: res.data.stats.map(item => {
                return (
                    <div >{item.stat.name}:{item.base_stat}</div>
                )
            })
        });
        setPokemonChosen(true);
    }

    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const pokemon = [];
        const promises = new Array(600)
            .fill()
            .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
        Promise.all(promises).then(pokemonArr => {
            return pokemonArr.map(value =>
                value
                    .json()
                    .then(({ name }) =>
                        pokemon.push({ name })
                    )
            );
        });
        setOptions(pokemon);
    }, []);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };

    const updatePokeDex = poke => {
        setSearch(poke);
        setDisplay(false);
    };
    return (
        <div className='m-0'>
            <div className='bg-yellow-400 flex  justify-between items-center px-6 m-auto'>
                <div className='flex items-center'>
                    <a href=''><MdOutlineCatchingPokemon size={40} color='black' className='mt-2' /></a>
                    <a href=''><SiPokemon size={120} color='black' className='' /></a>
                </div>
                <div className="relative" ref={wrapperRef}>
                    <input
                        id="auto"
                        className='rounded-xl m-6 pl-3 cursor-pointer'
                        onClick={() => setDisplay(!display)}
                        placeholder="enter pokemon"
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                    <button className='bg-white rounded-xl px-3 border-2 border-black' onClick={searchPokemon} >Search Pokemon</button>
                    {display && (
                        <div className="bg-white w-52 mx-6 rounded-xl overflow-scroll h-52 absolute">
                            {options
                                .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
                                .map((value, i) => {
                                    return (
                                        <div
                                            onClick={() => updatePokeDex(value.name)}
                                            className="pl-3 cursor-pointer overflow-scroll "
                                            key={i}
                                            tabIndex="0"
                                        >
                                            <span className="">{value.name}</span>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
            <div className='grid place-items-center p-6'>
                {!pokemonChosen ? (
                    <>
                        <h1 className='text-2xl font-bold text-yellow-500'>Please type a pokemon</h1>
                    </>
                ) : (
                    <div className='flex items-center flex-col '>
                        <a href={`https://www.serebii.net/pokedex-swsh/${pokemon.name}/`} target="_blank"><h1 className='py-1 capitalize transition duration-300 text-white hover:text-yellow-500 text-4xl font-bold'>{pokemon.name}</h1></a>
                        <img className='py-5' src={pokemon.img} alt='pokemonsprite' />
                        <div className='flex '>
                            <h1 className='flex py-5'>{pokemon.ability}</h1>
                        </div>
                        <div className='bg-yellow-500 tilt rounded-md p-5 transition duration-500 hover:scale-110 text-center py-5'>
                            <h3 className='Tilt'>Stats: {pokemon.stats}</h3>
                        </div>
                    </div>
                )}

            </div>

        </div >
    )
}

export default Header