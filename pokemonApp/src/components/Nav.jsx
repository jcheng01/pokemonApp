import React from 'react'
import { SiPokemon } from 'react-icons/si'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

const Nav = (props) => {

    return (
        <>
            <div className='bg-yellow-400 sm:flex-row flex flex-col justify-between items-center px-6 '>
                <div className='flex items-center'>
                    <MdOutlineCatchingPokemon size={40} color='black' className='mt-2' />
                    <SiPokemon size={120} color='black' className='' />
                </div>
                <div className='sm:flex-row flex flex-col gap-4'>
                    <input className='rounded-xl pl-3 '
                        value={props.pokemonName}
                        onChange={props.onChange}
                        type="text" />
                    <button className='bg-white my-6 sm:my-0 rounded-xl px-3 border-2 border-black' onClick={() => props.onSearch(props.pokemonName)} >Search Pokemon</button>

                    {/* {console.log(props.pokemonData)} */}
                    {/* props.pokemonData.filter((val) => {
                            if (props.input == "") {
                                return val
                            } else if (val.name.toLowerCase.includes(props.input.toLowerCase)) {

                    }
                        }).map((item) => {
                            // console.log(item)
                            return (
                    <>
                        <h2 >{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
                    </>


                    )
                        })
                    } */}
                </div>
            </div>
        </>
    )
}

export default Nav