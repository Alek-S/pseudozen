import React from 'react';

import Sidebar from './sidebar.js';
import Viewer from './viewer.js';

class Editor extends React.Component{
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
}


export default Editor;