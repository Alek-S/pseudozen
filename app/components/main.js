import React from 'react';
import axios from 'axios';


import Editor from './children/editor.js';
import New from './children/new.js';
import Public from './children/public.js';
import PublicViewer from './children/publicView.js';

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
	
	_getNav(){
		let pathname = window.location.pathname;

		if(pathname === '/project'){
			return(
				<div id="nav">
					<a href="/"><img id='logoSVG' src="./assets/images/logo.svg" alt="Logo" height="40px" /></a>
					<a href="/project" className="btn" id="back">back</a>
					<a href="" className="btn" id="logout" onClick={this._handleLogout.bind(this) }>logout</a>
				</div>
			);
		}
		if(pathname === '/public'){
			return(
				<div id="nav">
					<a href="/"><img id='logoSVG' src="./assets/images/logo.svg" alt="Logo" height="40px" /></a>
					<a href="/public" className="btn" id="back">back</a>
				</div>
			);
		}
	}
	//====//



	//==RENDER==
	render(){
		let body = null;

		if (window.location.pathname === '/project' && this.state.projectSelected === false && !location.search ){
			body = <New />;
		}else if(window.location.pathname === '/project') {
			body = <Editor  project={location.search.slice(3)} />;
		}else if(window.location.pathname === '/public' && !location.search ){
			body = <Public />;
		}else{
			body = <PublicViewer project={location.search.slice(3)} />
		}

		return(
			<div>
				<header>
					{this._getNav()}
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