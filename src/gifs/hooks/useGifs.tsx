import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../../gifs/interfaces/gif.interface";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
    gifsCache.current[term] = gifs;
  };

  const handleSearch = async (query: string = "") => {
    query.trim().toLowerCase();

    if (query.length === 0) return;

    if (previousSearches.includes(query)) return;

    setPreviousSearches([query, ...previousSearches].splice(0, 8));

    const gifsResponse = await getGifsByQuery(query);

    setGifs(gifsResponse);

    gifsCache.current[query] = gifsResponse;
  };

  return {
    gifs,
    previousSearches,
    handleSearch,
    handleTermClicked,
  };
};
