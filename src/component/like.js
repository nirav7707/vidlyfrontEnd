import React from 'react';

const Like = (props) => {
    let likeClass = props.movie.liked === true ? "fa fa-heart-o":"fa fa-heart"
    return (  
        <i onClick={()=>props.onhandleLike(props.movie)} style={{'cursor':'pointer'}}className={likeClass}></i>
    );
}
 
export default Like;