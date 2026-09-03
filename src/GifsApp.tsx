import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { GifList } from "./gifs/components/GifList";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousSearches, gifs } = useGifs();
  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />
      {/* Search */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />
      {/* Busquedas previas */}
      <PreviousSearches
        onLabelClicked={handleTermClicked}
        searches={previousSearches}
      />
      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
