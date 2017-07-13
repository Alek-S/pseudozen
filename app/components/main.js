import React from 'react';
import axios from 'axios';
// import Search from './children/search.js';

class Main extends React.Component{

	_handleLogout(event){
		event.preventDefault();

		axios.post(window.location.origin + '/api/logout')
		.then((res)=>{
			window.location.replace(window.location.origin + '/');
		});
	}


	render(){
		return(
			<div>
				<header>
					<div id="nav">
						<a href="" className="btn" id="browse">Browse Public</a>
						<a href="" className="btn" id="logout" onClick={this._handleLogout.bind(this) }>logout</a>
						<div className="clear"></div>
					</div>
				</header>
			</div>
		);
	}
}

export default Main;