import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovielist = () => {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const movies = data || [];
  return { movies, error, isLoading };
};

export default useMovielist;
