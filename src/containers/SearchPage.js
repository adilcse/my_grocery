import React from "react";
import { useParams } from "react-router-dom";
const SearchPage=()=>{
let {id} = useParams();
return(
<h2>Search result : {id}</h2>
)
}
export default SearchPage;