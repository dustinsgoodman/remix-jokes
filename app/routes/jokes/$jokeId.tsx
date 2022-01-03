import type { LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { db } from "~/utils/db.server";
import { Joke } from "@prisma/client";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({ params }) => {
  const { jokeId } = params;
  const joke = await db.joke.findUnique({
    where: { id: jokeId },
  });
  if (!joke) {
    throw new Error("Joke not found");
  }

  const data: LoaderData = { joke };
  return data;
};

export default function JokeRoute() {
  const { joke } = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
      <Link to=".">{joke.name} Permalink</Link>
    </div>
  );
}
