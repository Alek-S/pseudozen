import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class Viewer extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			entries: [],
			value: 'blah'
		};

		this._renderEntries = this._renderEntries.bind(this);
		this._buildEntry = this._buildEntry.bind(this);
	}


	//==Life Cycle==
	componentWillMount(){
		this._readEntries();
	}

	componentWillReceiveProps(){
		this._readEntries();
	}
	//====//

	
	
	//==HANDLERS==
	_readEntries(){
		//read entries from mongo
		axios.get(window.location.origin + '/api/project/entry/'+ this.props.projectName)
			.then((response)=>{
				//then set the state to entries returned
				this.setState({
					entries: response.data[0].entry
				});
			});
	}


	_renderEntries(){
		let entries = this.state.entries;
		let toReturn = null;
		

		return entries.map((entry, index)=>{
			// return (
			// 	<div key={index}>{entry.type}</div>
			// );
			return (
				<div key={index}>{this._buildEntry(index)}</div>
			);
		});
	}

	_buildEntry(index, event){
		console.log(1);
		console.log(this.state.entries)
		let currentEntry = this.state.entries[index];


		switch(currentEntry.type){
			case 'initialize':
				return (
					<div ClassName={currentEntry.category}>
						Initialize <input defaultValue={this.state.entries[index].forms.name} onBlur={this._handleFormChange.bind({index:index, field: 'name'})} />
					</div>
				);
			//TODO: case switiched for other element types
		}	
	}

	_handleFormChange(event){
		console.log(event.target.value);
		console.log(this);
		//TODO: api call to have it update in mongo
	}
	//====//



	render(){
		return(
			<div>
				<div id='viewerTitle'>
					<h2>{this.props.projectName}</h2>
				</div>	
				<div id="viewer">
					{this._renderEntries()}
				</div>
			</div>

		); //end of render
	}
}//end of class



//==PROP VALIDATION
Viewer.propTypes = {
	projectName: PropTypes.string
};


export default Viewer;