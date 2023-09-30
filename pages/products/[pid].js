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
export async function getStaticProps( context ){

    const { params } = context;

    const productId = params.pid;
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');  
    const jsonData = await  fs.readFile( filePath );
    const data = JSON.parse( jsonData ); 

    const product = data.products.find( product => product.id === productId );

    return {
        props: {
            loadedProduct: product    
        }
    }
    
}

export async function getStaticPaths() {

    const paths = 
        [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            { params: { pid: 'p3' } },
        ];

    return {
        paths,
        fallback: false,
    };
}



export default ProductDetailPage;