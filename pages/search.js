import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "./../components/Map";
function Search({ searchResults }) {
  const filters = [
    "Cancellation Flexibility",
    "Type Of Places",
    "Price",
    "Rooms and beds",
    "More Filters",
  ];

  console.log(`searchResults`, searchResults);
  const router = useRouter();
  const { location, startDate, endDate, noOfGuest } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");

  const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div className="h-screen">
      <Header placeholder={`${location} | ${range} | ${noOfGuest} guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300 + Stays - {range} - for {noOfGuest} number of guest
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stay in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {filters.map((e) => (
              <p key={e} className="button">
                {e}
              </p>
            ))}
          </div>

          <div className="flex flex-col">
            {searchResults?.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  img={img}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                  key={img}
                  location={location}
                />
              )
            )}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
