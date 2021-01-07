import React from 'react';
import './searchbar.scss';

class Searchbar extends React.Component {
    // sets term based on input
    handleChange = (event) => {
        this.setState({
            term: event.target.value
        });
    
    };
    // on submit function
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term); // calls state of term
    }

    render() {
        
        return (
            <>
            <div class="card card-container loginCompo">
            <h2 className="logo"><img style={{width:'200px', height:'100px',justifyContent:'center'}} className="logo" src='https://www.thatitguy.net/wp-content/uploads/2018/08/1280px-Logo_of_YouTube_2015-2017.svg.png' alt="youtube logo"></img></h2>
            <br></br>
            <div className='search-bar ui segment'>
                <form onSubmit={this.handleSubmit} className='ui form'>
                    <div className='field'>
                      <label>Enter Keyword: </label>  <input onChange={this.handleChange} name='video-search' type="text" placeholder="Search.."/>
                    </div>
                </form>
                <br></br>
            </div>
            </div>
            </>
        )
    }
}
export default Searchbar;
