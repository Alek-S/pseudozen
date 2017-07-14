import React from 'react';

class Editor extends React.Component{
	render(){
		return(
			<div id='main'>
				<aside>
					<p>sidebar</p>
				</aside>

				<div id="editor">
					<p>Editor goes here</p>
				</div>	
			</div>

		);
	}
}


export default Editor;