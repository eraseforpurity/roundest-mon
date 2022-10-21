import type { NextPage } from 'next';
import React, { useState } from 'react';
import { trpc } from '@/utils/trcp';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { PostCreateInput } from '@/pages/api/trpc/[trpc]';

type HomePageType = {
  firstPok: number;
  secondPok: number;
};

const Home: NextPage<HomePageType> = ({ firstPok, secondPok }) => {
  const [pokemons, setfirstPokemon] = useState([firstPok, secondPok]);
  const [firstPokemon, secondPokemon] = pokemons;

  const first = trpc['get-pokemon-by-id'].useQuery({
    id: firstPokemon,
  });

  const second = trpc['get-pokemon-by-id'].useQuery({
    id: secondPokemon,
  });

  const handlePokeVote = (selected: number) => {
    setfirstPokemon(getOptionsForVote());
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl font-bold mb-6">Which one is Roundest???</h1>

      <div className="grid grid-cols-[minmax(100px,1fr)_auto_minmax(100px,1fr)] gap-x-10 w-2/3 max-w-4xl border-2 border-color-yellow-800 p-10">
        {first.isLoading || second.isLoading || !first.data || !second.data ? (
          <div className="col-span-full">Loading...</div>
        ) : (
          <>
            <Pokemon
              vote={() => handlePokeVote(firstPokemon)}
              pokemon={first.data}
            />

            <div className="self-center text-xl">Vs</div>

            <Pokemon
              vote={() => handlePokeVote(secondPokemon)}
              pokemon={second.data}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

const Pokemon: React.FC<{ pokemon: PostCreateInput; vote: () => void }> = ({
  pokemon,
  vote,
}) => {
  return (
    <div>
      <div className="h-60 bg-red-200 flex items-center justify-center relative">
        <Image layout="fill" objectFit="contain" src={pokemon.photo} />
      </div>
      <p className="z-10 top-full font-bold text-xl capitalize mb-3">
        {pokemon.name}
      </p>
      <button
        onClick={vote}
        className="bg-purple-700 p-3 rounded active:shadow-md active:shadow-purple-600"
      >
        Vote for Roundest
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemonIds = getOptionsForVote();
  const [firstPok, secondPok] = pokemonIds;
  return {
    props: { firstPok, secondPok }, // will be passed to the page component as props
  };
};
