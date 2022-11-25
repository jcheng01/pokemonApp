// import React, { useState } from 'react'

// const PokemonInfo = (props) => {
//     return (
//         <div className='text-center text-white [&>*]:my-4 scale-75 sm:scale-110' >
//             {
//                 (!props.pokemonDex) ? "" : (
//                     <>
//                         <h1 className='text-3xl font-bold'>{props.pokemonDex.name}</h1>
//                         {/* {console.log(props.pokemonDex.name)}
//                         {console.log(props.pokemonDex.stat)} */}
//                         <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonDex.id}.svg`} alt="focused sprite" className='flex justify-center' />
//                         <div className=' flex justify-evenly '>
//                             {
//                                 props.pokemonDex.abilities.map(item => {
//                                     console.log(props.pokemonDex.name)
//                                     return (
//                                         <>
//                                             <div className="bg-gray-100 px-4 mx-2 rounded-md text-slate-900">
//                                                 <h2>{item.ability.name}</h2>
//                                             </div>
//                                         </>
//                                     )
//                                 })
//                             }
//                         </div>
//                         <div className='flex flex-col items-center bg-slate-600lk'>
//                             {
//                                 props.pokemonDex.stats.map(item => {
//                                     return (
//                                         <>
//                                             <h3>{item.stat.name}:{item.base_stat}</h3>
//                                         </>
//                                     )
//                                 })
//                             }
//                         </div>
//                     </>
//                 )
//             }

//         </div>
//     )
// }

// export default PokemonInfo