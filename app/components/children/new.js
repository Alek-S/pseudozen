import React from 'react';


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

		if(!this.state.projectName){
			this.setState({
				errorMsg: 'No project name provided'
			});
			errorDiv.style.display = 'block';
		}else{
			window.location.href += '?p=' + this.state.projectName;
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