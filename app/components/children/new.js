import React from 'react';
import axios from 'axios';

class New extends React.Component{
	constructor(){
		super();

		this.state = {
			projectName: undefined,
			errorMsg: undefined
		};
	}


	_handleInput(event){
		this.setState({
			projectName: event.target.value
		})
	}


	_newProject(event){
		event.preventDefault();
		let errorDiv = document.getElementById('nameError');
		let projectName = this.state.projectName;
		let validName = /^[a-zA-Z0-9_-]*$/;


		if(!projectName){ //if project name was not provided
			this.setState({
				errorMsg: 'No project name provided'
			});
			errorDiv.style.display = 'block';
		}else if(!validName.test(projectName)){ //if project name provided but formatted incorrectly
			this.setState({
				errorMsg: 'No Spaces or special characters'
			});
			errorDiv.style.display = 'block';
		}else{
			//post it to the project apt and then update href with query containing the project number
			axios.post(window.location.origin + '/api/project', {projectName})
			.then( (res)=>{
				window.location.href += '?p=' + projectName;
			});
		}

	}


	render(){
		return(
			<div id='newSection'>
					<input id='nameInput' type="text" placeholder='Project Name' value={this.state.projectName} onChange={this._handleInput.bind(this)}/><a href="" className="btn" id='newProject' onClick={this._newProject.bind(this)}>Start New Project</a>
					<div id='nameError'>{this.state.errorMsg}</div>
			</div>

		);
	}
}


export default New;