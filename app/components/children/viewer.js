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
		console.log(1);
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
		
		return entries.map((entry, index)=>{
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
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Initialize 

						<input placeholder='Variable' value={this.state.entries[index].forms.name} onChange={this._handleFormChange.bind({index:index, field: 'name', fetch: this._readEntries.bind(this)})} />
						
						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 

						<a className='btnDeleteEntry' title='Delete Entry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>
						
						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'set':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Set 
						<input placeholder='Variable' value={this.state.entries[index].forms.name} onChange={this._handleFormChange.bind({index:index, field: 'name', fetch: this._readEntries.bind(this)})} /> 
						equal to 
						<input placeholder='being assigned' value={this.state.entries[index].forms.value} onChange={this._handleFormChange.bind({index:index, field: 'value', fetch: this._readEntries.bind(this)})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'add':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Add
						<input value={this.state.entries[index].forms.firstVal} onChange={this._handleFormChange.bind({index:index, field: 'firstVal', fetch: this._readEntries.bind(this)})} /> 
						to 
						<input value={this.state.entries[index].forms.secondVal} onChange={this._handleFormChange.bind({index:index, field: 'secondVal', fetch: this._readEntries.bind(this)})} />
						and assign to
						<input placeholder='Variable' value={this.state.entries[index].forms.assignee} onChange={this._handleFormChange.bind({index:index, field: 'assignee'})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'subtract':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Subtract
						<input value={this.state.entries[index].forms.firstVal} onChange={this._handleFormChange.bind({index:index, field: 'firstVal', fetch: this._readEntries.bind(this)})} /> 
						from 
						<input value={this.state.entries[index].forms.secondVal} onChange={this._handleFormChange.bind({index:index, field: 'secondVal', fetch: this._readEntries.bind(this)})} />
						and assign to
						<input placeholder='Variable' value={this.state.entries[index].forms.assignee} onChange={this._handleFormChange.bind({index:index, field: 'assignee', fetch: this._readEntries.bind(this)})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'multiply':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Multiply
						<input value={this.state.entries[index].forms.firstVal} onChange={this._handleFormChange.bind({index:index, field: 'firstVal', fetch: this._readEntries.bind(this)})} /> 
						by 
						<input value={this.state.entries[index].forms.secondVal} onChange={this._handleFormChange.bind({index:index, field: 'secondVal', fetch: this._readEntries.bind(this)})} />
						and assign to
						<input placeholder='Variable' value={this.state.entries[index].forms.assignee} onChange={this._handleFormChange.bind({index:index, field: 'assignee'})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a> 
						
						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'divide':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Divide
						<input value={this.state.entries[index].forms.firstVal} onChange={this._handleFormChange.bind({index:index, field: 'firstVal', fetch: this._readEntries.bind(this)})} /> 
						by 
						<input value={this.state.entries[index].forms.secondVal} onChange={this._handleFormChange.bind({index:index, field: 'secondVal', fetch: this._readEntries.bind(this)})} />
						and assign to
						<input placeholder='Variable' value={this.state.entries[index].forms.assignee} onChange={this._handleFormChange.bind({index:index, field: 'assignee'})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div>  
					</div>
				);

			case 'if':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						If
						<input placeholder='First' value={this.state.entries[index].forms.name} onChange={this._handleFormChange.bind({index:index, field: 'name', fetch: this._readEntries.bind(this)})} /> 
						<input placeholder='Condition' value={this.state.entries[index].forms.comparison} onChange={this._handleFormChange.bind({index:index, field: 'comparison', fetch: this._readEntries.bind(this)})} />
						<input placeholder='Second' value={this.state.entries[index].forms.value} onChange={this._handleFormChange.bind({index:index, field: 'value'})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'while':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						While
						<input placeholder='First' value={this.state.entries[index].forms.name} onChange={this._handleFormChange.bind({index:index, field: 'name', fetch: this._readEntries.bind(this)})} /> 
						<input placeholder='Condition' value={this.state.entries[index].forms.comparison} onChange={this._handleFormChange.bind({index:index, field: 'comparison', fetch: this._readEntries.bind(this)})} />
						<input placeholder='Second' value={this.state.entries[index].forms.value} onChange={this._handleFormChange.bind({index:index, field: 'value', fetch: this._readEntries.bind(this)})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'read':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Read from
						<input placeholder='Source' value={this.state.entries[index].forms.from} onChange={this._handleFormChange.bind({index:index, field: 'from', fetch: this._readEntries.bind(this)})} /> 
						to
						<input placeholder='Destination' value={this.state.entries[index].forms.to} onChange={this._handleFormChange.bind({index:index, field: 'to', fetch: this._readEntries.bind(this)})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'write':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Write from
						<input placeholder='Source' value={this.state.entries[index].forms.from} onChange={this._handleFormChange.bind({index:index, field: 'from', fetch: this._readEntries.bind(this)})} /> 
						to
						<input placeholder='Destination' value={this.state.entries[index].forms.to} onChange={this._handleFormChange.bind({index:index, field: 'to', fetch: this._readEntries.bind(this)})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'print':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Print
						<input value={this.state.entries[index].forms.value} onChange={this._handleFormChange.bind({index:index, field: 'value', fetch: this._readEntries.bind(this)})} />

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a> 

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'return':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Return
						<input value={this.state.entries[index].forms.value} onChange={this._handleFormChange.bind({index:index, field: 'value', fetch: this._readEntries.bind(this)})} /> 

						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 
						
						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);

			case 'freeform':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						<input value={this.state.entries[index].forms.value} onChange={this._handleFormChange.bind({index:index, field: 'value', fetch: this._readEntries.bind(this)})} /> 
						
						<div className='indentSelection'>
							<a href='' title='Indent Left' onClick={this._indentLeft.bind({index, fetch: this._readEntries.bind(this)})}>&#8676;</a>|
							<a href='' title='Indent Right' onClick={this._indentRight.bind({index, fetch: this._readEntries.bind(this)})}>&#8677;</a>	
						</div> 

						<a className='btnDeleteEntry' href='' onClick={this._deleteEntry.bind({index, fetch: this._readEntries.bind(this)})}>
							<img src="assets/images/trash.svg" height="15px" alt="trash"/>
						</a>

						<div className='arrowSelection'>
							<a href='' title='Move Up' onClick={this._moveUp.bind({index, fetch: this._readEntries.bind(this)})} >&#9650;</a>	
							<a href='' title='Move Down' onClick={this._moveDown.bind({index, fetch: this._readEntries.bind(this)})} >&#9660;</a>	
						</div> 
					</div>
				);
		}	
	}

	_handleFormChange(event){
		// console.log(event.target.value);
		// console.log(this);

		axios.put(window.location.origin + '/api/project/entry', {
			title: window.location.search.slice(3),
			index: this.index,
			field: this.field,
			value: event.target.value,
		}).then((response)=>{
			// console.log(response);
			this.fetch();
		});
	}
	

	_deleteEntry(event){
		event.preventDefault();

		axios( {
			method: 'delete',
			url: window.location.origin + '/api/project/entry', 
			data: {
				title: window.location.search.slice(3),
				index: this.index,
			}
		})
			.then( (res)=>{
				// console.log(res.data);
				this.fetch();
			});
	}


	_moveUp(event){
		event.preventDefault();

		axios.put(window.location.origin + '/api/project/position', {
			title: window.location.search.slice(3),
			index: this.index,
			direction: -1
		}).then(()=>{
			this.fetch();
		});
	}

	_moveDown(event){
		event.preventDefault();
		console.log(1);
		axios.put(window.location.origin + '/api/project/position', {
			title: window.location.search.slice(3),
			index: this.index,
			direction: 2
		}).then((response)=>{;
			this.fetch();
		});
	}

	_indentLeft(event){
		event.preventDefault();

		//TODO: axios
		
		axios.put(window.location.origin + '/api/project/indentation', {
			title: window.location.search.slice(3),
			index: this.index,
			direction: -1
		}).then(()=>{
			this.fetch();
		});
	}

	_indentRight(event){
		event.preventDefault();

		//TODO: axios
		axios.put(window.location.origin + '/api/project/indentation', {
			title: window.location.search.slice(3),
			index: this.index,
			direction: 1
		}).then(()=>{
			this.fetch();
		});
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