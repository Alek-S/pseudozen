import React from 'react';

import Sidebar from './sidebar.js';
import Viewer from './viewer.js';

class Editor extends React.Component{
	constructor(){
		super();

		this.state = {
			projectName: undefined,
			entried: [],
			creator: undefined
		};
	}


	//==Life Cycle==
	componentWillMount(){
	}
	//====//



	//==HANDLERS==
	//====//



	//==RENDER==
	render(){
		return(
			<div id='main'>
				<aside>
					<Sidebar />
				</aside>

				<div id="viewer">
					<Viewer />
				</div>	
			</div>

		);
	}
	//====//
}//end of Class


export default Editor;