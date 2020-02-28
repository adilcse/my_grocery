import _ from 'lodash'
import faker from 'faker'
import React, { Component,useState } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { setSearchField } from "../redux/actions/SearchAction";
const source = _.times(5, () => ({
  title: faker.company.companyName(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

const SearchBox=()=>{
    const dispatch = useDispatch();
    let history = useHistory();
   const searchState = useSelector((state) => (state.searchProduct));

 
//     const handleSearchChange = (e, { value }) => {
//        setIsLoading(true);
//        setValue(value);
//         setTimeout(() => {
//         if (value.length < 1) return setInitialState()
//         const re = new RegExp(_.escapeRegExp(value), 'i')
//         const isMatch = (result) => re.test(result.title)
//         setResults(_.filter(source, isMatch))
//         setIsLoading(false)
//         }, 300)
//   }
  const searchChanged=(e,{value})=>{
      dispatch(setSearchField(value));
  }
  const   handleKeyPress = (e)=>{
   
    if(e.key === 'Enter'){
      console.log(value);
        history.push(`/Search/${value}`)
     

      
    }
}
  const handleResultSelect = (e, { result }) =>  dispatch(setSearchField(result.title));
  const {value,isLoading,results} = searchState;
   return(
    <Grid>
        <Grid.Column width={8}>
        <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={searchChanged}
            results={results}
            onKeyPress={handleKeyPress} 
            value={value}
            
        />
        </Grid.Column>
    
    </Grid>
   )
}
export default SearchBox;