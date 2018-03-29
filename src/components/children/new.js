import React from 'react';
import axios from 'axios';

class New extends React.Component{
	constructor(){
		super();

		this.state = {
			projectName: undefined,
			errorMsg: undefined,
			projects: []
		};
	}

	//==LIFE CYCLE==
	componentWillMount(){
		this._fetchProjects();
	}
	//====//


	//==HANDLERS==
	_fetchProjects(){
		//axios call to api to get projects
		axios.get( window.location.origin + '/api/project/user')
			.then( (response)=>{
				//populate this.state.projects with axios results
				this.setState({
					projects: response.data
				});
				this._populateProjects();
			});
	}

	
	_populateProjects(){
		let projects = this.state.projects;

		return projects.map((project, index)=>{
			return(
				<a className='projectCard' key={index} href={'/project?p=' + project.title}>
					<h2>{project.title}</h2>
					<a className='btnDelete' href='' onClick={this._deleteProject.bind({fetch: this._fetchProjects.bind(this), name: project.title})}>
						<img src="assets/images/trash.svg" height="15px" alt="trash"/>
					</a>
					<p>Created: {project.createdAt.slice(0,10)}</p>
				</a>
			);
		});
	}

	_deleteProject(event){
		event.preventDefault();

		axios( {
			method: 'delete',
			url: window.location.origin + '/api/project', 
			data: {projectName: this.name}
		})
			.then( (res)=>{
				console.log(res.data);
				this.fetch();
			});
	}


	_handleInput(event){
		this.setState({
			projectName: event.target.value
		});
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
	//====//


	//==RENDER==
	render(){
		return(
			<div id='newSection'>
				<input id='nameInput' type="text" placeholder='Project Name' value={this.state.projectName} onChange={this._handleInput.bind(this)}/><a href="" className="btn" id='newProject' onClick={this._newProject.bind(this)}>Start New Project</a>
				<div id='nameError'>{this.state.errorMsg}</div>

				<div id="existingProjects">	
					{this._populateProjects()}	
				</div>
			</div>

		);
	}
	//====//

} //end of Class


export default New;