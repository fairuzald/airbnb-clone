import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/ListingCard";
interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings || listings.length <= 0) {
    return <EmptyState resetButton />;
  }

  return (
    <main className="flex min-h-screen px-18 w-full flex-col pt-[200px] text-black">
      <div className="flex flex-wrap gap-7 w-full items-start justify-center">
        {listings.map((list) => (
          <ListingCard key={list.id} data={list} currentUser={currentUser} />
        ))}
      </div>
    </main>
  );
}
export default Home