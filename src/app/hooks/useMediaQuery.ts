import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches;
  };

  const [isMatches, setMatches] = useState<boolean>(getMatches(query));

  const onQueryChange = (): void => {
    setMatches(getMatches(query));
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    onQueryChange();
    matchMedia.addEventListener("change", onQueryChange);

    return () => {
      matchMedia.removeEventListener("change", onQueryChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return isMatches;
};
