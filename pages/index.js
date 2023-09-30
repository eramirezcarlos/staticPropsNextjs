import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>          
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps( context ) {
  const filePath = path.join(process.cwd(),'data','dummy-backend.json');  
  const jsonData = await  fs.readFile( filePath );
  const data = JSON.parse( jsonData );

  //if not found:true then it will display 404 page ejemplo
  if( data.products.length === 0 ){
    return { notFound : true }
  }
  //if nodata then you can also redirect
  if(!data){
    return {
      redirect:{
        destination:'/no-data'
      }
    }
  }

  return {
    props: {
      // products: [{ id: "p1", title: "Product 1" }],
      products: data.products
    },
    revalidate:10.
    //notFound: true //it will trigger the 404 page
    //only happens in production of revalidation depending upon the seconds
  };
}


export default HomePage;
