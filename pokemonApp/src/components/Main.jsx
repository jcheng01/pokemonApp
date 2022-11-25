import React, { useEffect, useState, useRef } from 'react'
// // import Card from './Card'
// // import PokemonInfo from './PokemonInfo'
// // import Nav from './Nav'
// import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import Axios from 'axios'
import Header from './Header'
import App from './Autosearch';

const Main = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonDex, setPokemonDex] = useState([]); //state used to passed prop to pokemoninfo componenet
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokemonName, setPokemonName] = useState('');

    const onChange = (e) => {
        setPokemonName(e.target.value)
    }
    const onSearch = (term) => {
        // setValue()
        console.log("search", term)
    }

    // const filterName = e => {
    //     const search = e.target.value.toLowerCase()
    //     const filter = e.filter(name => name.toLowerCase().includes(search))
    //     setName(filter)
    // }

    const searchPokemon = async () => {
        if (effectRan.current === false) {
            const res = await Axios.get(url)//async funtion returns request using word await
            setNextUrl(res.data.next)
            setPrevUrl(res.data.previous)
            getPokemon(res.data.results)//pokemon name
            // console.log(res.data.results)// the url returns an object w 20 arrays
        }
    }

    const getPokemon = response => {
        response.map(async (item) => {
            const result = await Axios.get(item.url) // map through the object and for each item, fetch the individual url where we get data from
            // console.log(result.data)// the url returns an object w 20 arrays

            setPokemonData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }

    const effectRan = useRef(false)
    useEffect(() => {
        searchPokemon()
        return () => {//stops reactv18 from rendering component twice
            effectRan.current = true
            // console.log("ran two")
        }
    }, [])
    return (
        <>
            <Header />
            {/* <div>
                <Nav pokemonData={pokemonData} onChange={onChange} onSearch={onSearch} pokemonName={pokemonName} />
            </div>
            <div className="flex justify-around p-16 box-border">
                <div>
                    <div className=" grid gap-6 grid-cols-1 sm:grid-cols-2">
                        <Card pokemonData={pokemonData} pokemonDex={item => setPokemonDex(item)} />
                    </div>
                    <div className='flex box-border my-6 px-20 justify-between '>
                        <button className='bg-yellow-400 px-4 py-1 rounded-md flex items-center hover:scale-105 duration-200'><IoIosArrowBack />Previous</button>
                        <button className='bg-yellow-400 px-4 py-1 rounded-md flex items-center hover:scale-105 duration-200'><IoIosArrowForward />Next</button>
                    </div>
                </div>
                <div className="">
                    <PokemonInfo pokemonDex={pokemonDex} pokemonData={pokemonData} />
                </div>
            </div> */}

        </>
    )
}

export default Main