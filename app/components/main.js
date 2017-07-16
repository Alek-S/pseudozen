import React from 'react';
import axios from 'axios';


import Editor from './children/editor.js';
import New from './children/new.js';

class Main extends React.Component{
	constructor(){
		super();

		this.state = {
			projectSelected: false,
		};
	}
	

	
	//==HANDLERS==
	_handleLogout(event){
		event.preventDefault();

		axios.post(window.location.origin + '/api/logout')
			.then((res)=>{
				window.location.replace(window.location.origin + '/');
			});
	}
	//====//



	//==RENDER==
	render(){

		let body = null;

		if (this.state.projectSelected === false && !location.search ){
			body = <New />;
		}else{
			body = <Editor  project={location.search} />;
		}

		return(
			<div>
				<header>
					<div id="nav">
						<a href="/project" className="btn" id="back">back</a>
						<a href="" className="btn" id="logout" onClick={this._handleLogout.bind(this) }>logout</a>
					</div>
				</header>

				<section id='main'>
					{body}
				</section>
			</div>
		);
	}
	//====//

}//end of Class

export default Main;