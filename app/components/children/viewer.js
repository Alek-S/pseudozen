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
		let currentEntry = this.state.entries[index];


		switch(currentEntry.type){

			case 'initialize':
				return (
					<div className={currentEntry.category}>
						Initialize 
						<input placeholder='Variable' defaultValue={this.state.entries[index].forms.name} onBlur={this._handleFormChange.bind({index:index, field: 'name'})} />
					</div>
				);

			case 'set':
				return (
					<div className={currentEntry.category}>
						Set 
						<input placeholder='Variable' defaultValue={this.state.entries[index].forms.name} onBlur={this._handleFormChange.bind({index:index, field: 'name'})} /> 
						equal to 
						<input placeholder='Value' defaultValue={this.state.entries[index].forms.value} onBlur={this._handleFormChange.bind({index:index, field: 'value'})} />
					</div>
				);

			case 'add':
				return (
					<div className={currentEntry.category}>
						Add
						<input defaultValue={this.state.entries[index].forms.firstVal} onBlur={this._handleFormChange.bind({index:index, field: 'firstVal'})} /> 
						to 
						<input defaultValue={this.state.entries[index].forms.secondVal} onBlur={this._handleFormChange.bind({index:index, field: 'secondVal'})} />
						and assign to
						<input placeholder='Variable' defaultValue={this.state.entries[index].forms.assignee} onBlur={this._handleFormChange.bind({index:index, field: 'assignee'})} /> 
					</div>
				);

			case 'subtract':
				return (
					<div className={currentEntry.category}>
						Subtract
						<input defaultValue={this.state.entries[index].forms.firstVal} onBlur={this._handleFormChange.bind({index:index, field: 'firstVal'})} /> 
						from 
						<input defaultValue={this.state.entries[index].forms.secondVal} onBlur={this._handleFormChange.bind({index:index, field: 'secondVal'})} />
						and assign to
						<input placeholder='Variable' defaultValue={this.state.entries[index].forms.assignee} onBlur={this._handleFormChange.bind({index:index, field: 'assignee'})} /> 
					</div>
				);

			case 'multiply':
				return (
					<div className={currentEntry.category}>
						Multiply
						<input defaultValue={this.state.entries[index].forms.firstVal} onBlur={this._handleFormChange.bind({index:index, field: 'firstVal'})} /> 
						by 
						<input defaultValue={this.state.entries[index].forms.secondVal} onBlur={this._handleFormChange.bind({index:index, field: 'secondVal'})} />
						and assign to
						<input placeholder='Variable' defaultValue={this.state.entries[index].forms.assignee} onBlur={this._handleFormChange.bind({index:index, field: 'assignee'})} /> 
					</div>
				);

			case 'divide':
				return (
					<div className={currentEntry.category}>
						Divide
						<input placeholder='Value' defaultValue={this.state.entries[index].forms.firstVal} onBlur={this._handleFormChange.bind({index:index, field: 'firstVal'})} /> 
						by 
						<input placeholder='Value' defaultValue={this.state.entries[index].forms.secondVal} onBlur={this._handleFormChange.bind({index:index, field: 'secondVal'})} />
						and assign to
						<input placeholder='Variable' defaultValue={this.state.entries[index].forms.assignee} onBlur={this._handleFormChange.bind({index:index, field: 'assignee'})} /> 
					</div>
				);

			case 'if':
				return (
					<div className={currentEntry.category}>
						If
						<input placeholder='First Comparison' defaultValue={this.state.entries[index].forms.name} onBlur={this._handleFormChange.bind({index:index, field: 'name'})} /> 
						<input placeholder='Condition' defaultValue={this.state.entries[index].forms.comparison} onBlur={this._handleFormChange.bind({index:index, field: 'comparison'})} />
						<input placeholder='Second Comparison' defaultValue={this.state.entries[index].forms.value} onBlur={this._handleFormChange.bind({index:index, field: 'value'})} />
					</div>
				);

			case 'while':
				return (
					<div className={currentEntry.category}>
						While
						<input placeholder='First Comparison' defaultValue={this.state.entries[index].forms.name} onBlur={this._handleFormChange.bind({index:index, field: 'name'})} /> 
						<input placeholder='Condition' defaultValue={this.state.entries[index].forms.comparison} onBlur={this._handleFormChange.bind({index:index, field: 'comparison'})} />
						<input placeholder='Second Comparison' defaultValue={this.state.entries[index].forms.value} onBlur={this._handleFormChange.bind({index:index, field: 'value'})} />
					</div>
				);

			case 'read':
				return (
					<div className={currentEntry.category}>
						Read from
						<input placeholder='Source' defaultValue={this.state.entries[index].forms.from} onBlur={this._handleFormChange.bind({index:index, field: 'from'})} /> 
						to
						<input placeholder='Destination' defaultValue={this.state.entries[index].forms.to} onBlur={this._handleFormChange.bind({index:index, field: 'to'})} />
					</div>
				);

			case 'write':
				return (
					<div className={currentEntry.category}>
						Write from
						<input placeholder='Source' defaultValue={this.state.entries[index].forms.from} onBlur={this._handleFormChange.bind({index:index, field: 'from'})} /> 
						to
						<input placeholder='Destination' defaultValue={this.state.entries[index].forms.to} onBlur={this._handleFormChange.bind({index:index, field: 'to'})} />
					</div>
				);

			case 'print':
				return (
					<div className={currentEntry.category}>
						Print
						<input defaultValue={this.state.entries[index].forms.value} onBlur={this._handleFormChange.bind({index:index, field: 'value'})} /> 
					</div>
				);

			case 'return':
				return (
					<div className={currentEntry.category}>
						Return
						<input defaultValue={this.state.entries[index].forms.value} onBlur={this._handleFormChange.bind({index:index, field: 'value'})} /> 
					</div>
				);

			case 'freeform':
				return (
					<div className={currentEntry.category}>
						<input defaultValue={this.state.entries[index].forms.value} onBlur={this._handleFormChange.bind({index:index, field: 'value'})} /> 
					</div>
				);
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