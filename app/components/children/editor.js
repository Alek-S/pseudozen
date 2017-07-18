import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './sidebar.js';
import Viewer from './viewer.js';

class Editor extends React.Component{
	constructor(){
		super();

		this.state = {
			projectName: undefined,
			entries: [],
			creator: undefined,
			timestamp: new Date().getTime()
		};
	}


	//==Life Cycle==
	componentWillMount(){
	}
	//====//



	//==HANDLERS==
	_handleKeyUp(){
		// console.log('click');
		this.setState({
			timestamp: new Date().getTime()
		});
	}
	//====//



	//==RENDER==
	render(){
		return(
			<div id='main'>
				<aside onClick={this._handleKeyUp.bind(this)}>
					<Sidebar projectName={this.props.project}/>
				</aside>

				<div>
					<Viewer projectName={this.props.project} timestamp={this.state.timestamp}/>
				</div>	
			</div>

		);
	}
	//====//
}//end of Class



//==PROP VALIDATION
Editor.propTypes = {
	project: PropTypes.string
};

export default Editor;