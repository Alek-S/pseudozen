import React from 'react';
import axios from 'axios';


class Project extends React.Component{
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
		axios.get( window.location.origin + '/api/project/public')
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
				<a className='projectCard' key={index} href={'/public?p=' + project.title}>
					<h2>{project.title}</h2>
					<p>Created: {project.createdAt.slice(0,10)}</p>
				</a>
			);
		});
	}


	//====//


	//==RENDER==
	render(){
		return(
			<div id='newSection'>

				<div id="existingProjects">	
					{this._populateProjects()}	
				</div>
			</div>

		);
	}
	//====//

} //end of Class


export default Project;