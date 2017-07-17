import React from 'react';

class Viewer extends React.Component{
	constructor(){
		super();

		this.state = {

		};
	}
	
	render(){
		console.log(this.props.projectName);
		return(
			<div>
				<div id='viewerTitle'>
					<h2>{this.props.projectName}</h2>
				</div>	
				<div id="viewer">
					<p>pseudocode snippets go here</p>
				</div>
			</div>

		);
	}
}


export default Viewer;