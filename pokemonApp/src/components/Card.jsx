import React from 'react'

const Card = (props) => {
    return (
        <>
            {
                props.pokemonData.map((item) => {
                    return (
                        <div key={item.id} onClick={() => props.pokemonDex(item)} className="cursor-pointer w-auto rounded-lg shadow-xl items-center flex justify-self-center px-4 box-border bg-white hover:scale-110 duration-200 ">
                            <h2>{item.id}</h2>
                            <img src={item.sprites.front_default} alt='pokemon sprite' />
                            <h2>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
                            {item.stats[1].base_stat}
                        </div>
                    )
                })
            }
        </>
    )
}

export default Card