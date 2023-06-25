import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  if (!listings || listings.length <= 0) {
    return <EmptyState resetButton />;
  }

  return (
    <main className="flex min-h-screen px-18 w-full flex-col items-start justify-center pt-[200px] text-black">
      <div className="flex flex-wrap gap-7 w-full items-start justify-center">
        {listings.map((list) => (
          <ListingCard key={list.id} data={list} currentUser={currentUser} />
        ))}
      </div>
    </main>
  );
}
