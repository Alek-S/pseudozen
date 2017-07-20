import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class Viewer extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			entries: [],
			editSelect: 'active',
			textSelect: 'notActive',
			plainText: 'active',
			js: 'notActive',
			python: 'notActive'
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
		
		if(this.state.editSelect === 'active'){
			return entries.map((entry, index)=>{
				return (
					<div key={index}>{this._buildEntry(index)}</div>
				);
			});
		}else{
			let selectedLanguage = '';
			
			if( this.state.js === 'active'){
				selectedLanguage = 'jsComments';
			}
			if( this.state.python === 'active'){
				selectedLanguage = 'pythonComments';
			}

			return entries.map((entry, index)=>{
				return (
					<div className={selectedLanguage} key={index}>{this._buildText(index)}</div>
				);
			});
		}
	}

	//returns entry divs when in edit mode
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
						<input placeholder='Variable' value={this.state.entries[index].forms.assignee} onChange={this._handleFormChange.bind({index:index, field: 'assignee', fetch: this._readEntries.bind(this) })} />

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

			case 'divide':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						Divide
						<input value={this.state.entries[index].forms.firstVal} onChange={this._handleFormChange.bind({index:index, field: 'firstVal', fetch: this._readEntries.bind(this)})} /> 
						by 
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

			case 'if':
				return (
					<div className={currentEntry.category + ' indent' + this.state.entries[index].forms.indent}>
						If
						<input placeholder='First' value={this.state.entries[index].forms.name} onChange={this._handleFormChange.bind({index:index, field: 'name', fetch: this._readEntries.bind(this)})} /> 
						<input placeholder='Condition' value={this.state.entries[index].forms.comparison} onChange={this._handleFormChange.bind({index:index, field: 'comparison', fetch: this._readEntries.bind(this)})} />
						<input placeholder='Second' value={this.state.entries[index].forms.value} onChange={this._handleFormChange.bind({index:index, field: 'value', fetch: this._readEntries.bind(this) })} />

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

	//returns text divs when in text export mode
	_buildText(index){
		let currentEntry = this.state.entries[index];
		let numberOfTabs = parseInt(currentEntry.forms.indent);
		let commentMark = '';

		if(this.state.js === 'active'){
			commentMark = '// ';
		}
		if(this.state.python === 'active'){
			commentMark = '# ';
		}

		function returnTabs(total){
			let toReturn;
			console.log(total);

			for(let i = 0; i <= total; ++i){
				if(i < 1){
					toReturn = '';
				}else{
					toReturn += '\t';
				}
			}

			return <span>{toReturn}</span>;
		}

		switch(currentEntry.type){

			case 'initialize':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Initialize {currentEntry.forms.name}</pre>
				);

			case 'set':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Set {currentEntry.forms.name} equal to {currentEntry.forms.value}</pre>
				);

			case 'add':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Add {currentEntry.forms.firstVal} to {currentEntry.forms.secondVal} and assign to {currentEntry.forms.assignee}</pre>
				);

			case 'subtract':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Subtract {currentEntry.forms.firstVal} from {currentEntry.forms.secondVal} and assign to {currentEntry.forms.assignee}</pre>
				);

			case 'multiply':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Multiply {currentEntry.forms.firstVal} by {currentEntry.forms.secondVal} and assign to {currentEntry.forms.assignee}</pre>
				);

			case 'divide':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Divide {currentEntry.forms.firstVal} by {currentEntry.forms.secondVal} and assign to {currentEntry.forms.assignee}</pre>
				);

			case 'if':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}If {currentEntry.forms.name} {currentEntry.forms.comparison} {currentEntry.forms.value}</pre>
				);

			case 'while':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}While {currentEntry.forms.name} {currentEntry.forms.comparison} {currentEntry.forms.value}</pre>
				);

			case 'read':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Read from {currentEntry.forms.from} to {currentEntry.forms.to}</pre>
				);

			case 'write':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Write from {currentEntry.forms.from} to {currentEntry.forms.to}</pre>
				);

			case 'print':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Print {currentEntry.forms.value}</pre>
				);

			case 'return':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}Return {currentEntry.forms.value}</pre>
				);

			case 'freeform':
				return (
					<pre>{returnTabs(numberOfTabs)}{commentMark}{currentEntry.forms.value}</pre>
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
	
	//remove entry from project
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

	//move entry up
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

	//move entry down
	_moveDown(event){
		event.preventDefault();

		axios.put(window.location.origin + '/api/project/position', {
			title: window.location.search.slice(3),
			index: this.index,
			direction: 2
		}).then((response)=>{;
			this.fetch();
		});
	}

	//indent entry left
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

	//indent entry right -- number of indents limited to 3 for UI reasonss
	_indentRight(event){
		event.preventDefault();

		axios.put(window.location.origin + '/api/project/indentation', {
			title: window.location.search.slice(3),
			index: this.index,
			direction: 1
		}).then(()=>{
			this.fetch();
		});
	}

	//select edit view -- default when first loaded
	_selectEdit(event){
		event.preventDefault();

		this.setState({
			editSelect: 'active',
			textSelect: 'notActive'
		});
	}

	//select text view to export
	_selectText(event){
		event.preventDefault();
		
		this.setState({
			editSelect: 'notActive',
			textSelect: 'active'
		});
	}

	_selectPlainText(event){
		event.preventDefault();

		this.setState({
			plainText: 'active',
			js: 'notActive',
			python: 'notActive'
		});
	}
	
	_selectJS(event){
		event.preventDefault();

		this.setState({
			plainText: 'notActive',
			js: 'active',
			python: 'notActive'
		});
	}

	_selectPython(event){
		event.preventDefault();

		this.setState({
			plainText: 'notActive',
			js: 'notActive',
			python: 'active'
		});
	}
	//====//


	render(){
		
		let languageSelect = '';

		if(this.state.textSelect === 'active'){
			languageSelect =
				<div className='languageSelect'>
					<a className={this.state.plainText} onClick={this._selectPlainText.bind(this)} id='plainText' href=''>Plain Text</a>
					<a className={this.state.js} onClick={this._selectJS.bind(this)} id='js' href=''>JS/Go/C/Java</a>
					<a className={this.state.python} onClick={this._selectPython.bind(this)} id='python' href=''>Python/Ruby</a>
				</div>;
		}

		return(

			<div>
				<div id='viewerTitle'>
					<h2>Project: <span id='projectTitle'> {this.props.projectName}</span> </h2>

					<div id='selectViewer'>
						<a className={this.state.editSelect} id="editSelect" onClick={this._selectEdit.bind(this)} href="">Edit Entries</a>
						<a className={this.state.textSelect} id="textSelect" onClick={this._selectText.bind(this)} href="">Export Text</a>
						{languageSelect}
					</div>
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