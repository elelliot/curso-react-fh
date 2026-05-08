import { giphyApi } from "../api/giphy.api";
import type { Gif } from "../interfaces/gif.interface";
import type { GiphyResponse } from "../interfaces/giphy.response";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const { data } = await giphyApi.get<GiphyResponse>("/search", {
    params: {
      q: query,
      limit: 10,
    },
  });
  // Mapeamos la data y la devolvemos como la ocupamos (Mapping pattern)
  return data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};
