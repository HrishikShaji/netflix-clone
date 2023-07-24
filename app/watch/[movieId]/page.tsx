"use client";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface pageProps {
  params: Record<string, any>;
  searchParams: any;
}

const Page: React.FC<pageProps> = ({ params, searchParams }) => {
  const { data } = useMovie(params.movieId);
  const router = useRouter();

  console.log(data?.title);
  return (
    <div className="h-screen w-screen bg-black z-40 fixed top-0">
      <nav className="fixed w-full p-4 z-10 flex items-center gap- bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white mr-4 cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={data?.videoUrl}></video>
    </div>
  );
};

export default Page;
