import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props){
    super(props);
    this.state ={
      searchTerm: ''
    }

    this.searchFilter = this.searchFilter.bind(this);
  }

  searchFilter(value){
    let { searchPostFn } = this.props;

    this.setState({
      searchTerm: value
    }, 
    () => { console.log( value ) }
    );

    searchPostFn( value );
    console.log(this.state.searchTerm);
    // this.setState({
    //   searchTerm: ''
    // });
  }

  render() {

    let { searchTerm } = this.state;
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input value={ searchTerm } onChange={ (e) =>{ this.searchFilter(e.target.value) } } type="text" placeholder="Search Your Feed" />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}