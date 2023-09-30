import {Fragment, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';

function ProductDetailPage( props ){

    const  { loadedProduct } = props;

    //if in the getStaticPaths only a couple of records for the rest
    //it will be like old react with axios and useEffect with latency
    //because of fallback
    if(!loadedProduct){
        return <p>Loading .. </p>
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );

}
async function getData(){

    const filePath = path.join(process.cwd(),'data','dummy-backend.json');  
    const jsonData = await  fs.readFile( filePath );
    const data = JSON.parse( jsonData ); 

    return data;

}

export async function getStaticProps( context ){

    const { params } = context;

    let data;

    const productId = params.pid; 

    data = await getData();

    const product = data.products.find( product => product.id === productId );

    return {
        props: {
            loadedProduct: product    
        }
    }
    
}

export async function getStaticPaths() {

    const data = await getData();
    const ids = data.products.map(product => product.id);
    const pathsWithParams = ids.map(id => ({ params: { pid: id } }));


    return {
        paths: pathsWithParams,
        fallback: 'blocking',
    };
}



export default ProductDetailPage;