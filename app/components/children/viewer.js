import React from 'react';

class Viewer extends React.Component{
	constructor(){
		super();

		this.state = {
			entries: undefined
		};
	}
	
	_readEntries(){
		//TODO: read entries from mongo
	}

	render(){
		return(
			<div>
				<div id='viewerTitle'>
					<h2>{this.props.projectName}</h2>
				</div>	
				<div id="viewer">
					{this._readEntries.bind(this)}
				</div>
			</div>

		);
	}
}


export default Viewer;