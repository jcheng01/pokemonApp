import React, { useEffect, useState, useRef } from "react";

const Auto = () => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);

    useEffect(() => {
        const pokemon = [];
        const promises = new Array(700)
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
        <div ref={wrapperRef}>
            <input
                id="auto"
                onClick={() => setDisplay(!display)}
                placeholder="pikachu"
                value={search}
                onChange={event => setSearch(event.target.value)}
            />
            {display && (
                <div className="">
                    {options
                        .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
                        .map((value, i) => {
                            return (
                                <div
                                    onClick={() => updatePokeDex(value.name)}
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                >
                                    <span>{value.name}</span>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default Auto;