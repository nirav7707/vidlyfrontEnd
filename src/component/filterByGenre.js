import React from 'react';

const FilterByGenre = (props) => {
    const {genres,onSelectGenre,selectedGnere} = props;
    return ( 
        <ul className="list-group">
        {genres.map(genre=>(
            <li 
             key={genre._id} 
             onClick={()=>onSelectGenre(genre)}
             className={genre._id === selectedGnere._id ? "list-group-item active":"list-group-item"}>
             {genre.name}
             </li>
        ))}
        </ul>
     );
}
 
export default FilterByGenre;