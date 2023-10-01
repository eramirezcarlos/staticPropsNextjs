function userProfilePage(props){

    return <h1>{props.username}</h1>

}
export default userProfilePage;

export async function getServerSideProps( context  ){
    //access to the whole response
    const{ params, req, res } = context;

    // console.log( req );
    // console.log( res );
    // console.log( "Server side code ");

    return {
        props:{
            username:'Carlos'
        }
    };

}