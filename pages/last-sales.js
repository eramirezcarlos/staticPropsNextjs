import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage( props ) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);
  //we can customize the function to format the data with function fetcher of swr here we use useEffect hook
  const { data, error } = useSWR(
    "https://training-nextjs-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load </p>;
  }

  if (!data && !sales) {
    return <p>Loading ...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - %{sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {

  const response = await fetch(
    "https://training-nextjs-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
}
export default LastSalesPage;
