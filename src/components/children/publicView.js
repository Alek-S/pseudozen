import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class PublicViewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entries: [],
			editSelect: 'active',
			textSelect: 'notActive',
			plainText: 'active',
			js: 'notActive',
			python: 'notActive',
			status: '',
		};
	}

	//==Life Cycle==
	componentWillMount() {
		this._readEntries();
	}

	componentWillReceiveProps() {
		this._readEntries();
	}
	//====//

	//==HANDLERS==
	_readEntries() {
		//read entries from mongo
		console.log(this.props.project);
		axios
			.get(
				window.location.origin +
					'/api/project/public/entry/' +
					this.props.project
			)
			.then(response => {
				//then set the state to entries returned
				this.setState({
					entries: response.data[0].entry,
				});
			});
	}

	_renderEntries() {
		let entries = this.state.entries;

		if (this.state.editSelect === 'active') {
			return entries.map((entry, index) => {
				return <div key={index}>{this._buildEntry(index)}</div>;
			});
		} else {
			let selectedLanguage = '';

			if (this.state.js === 'active') {
				selectedLanguage = 'jsComments';
			}
			if (this.state.python === 'active') {
				selectedLanguage = 'pythonComments';
			}

			return entries.map((entry, index) => {
				return (
					<div className={selectedLanguage} key={index}>
						{this._buildText(index)}
					</div>
				);
			});
		}
	}

	//returns entry divs when in edit mode
	_buildEntry(index) {
		let currentEntry = this.state.entries[index];

		switch (currentEntry.type) {
			case 'initialize':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Initialize
						<input
							placeholder="Variable"
							value={this.state.entries[index].forms.name}
						/>
					</div>
				);

			case 'set':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Set
						<input
							placeholder="Variable"
							value={this.state.entries[index].forms.name}
						/>
						equal to
						<input
							placeholder="being assigned"
							value={this.state.entries[index].forms.value}
						/>
					</div>
				);

			case 'add':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Add
						<input value={this.state.entries[index].forms.firstVal} />
						to
						<input value={this.state.entries[index].forms.secondVal} />
						and assign to
						<input
							placeholder="Variable"
							value={this.state.entries[index].forms.assignee}
						/>
					</div>
				);

			case 'subtract':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Subtract
						<input value={this.state.entries[index].forms.firstVal} />
						from
						<input value={this.state.entries[index].forms.secondVal} />
						and assign to
						<input
							placeholder="Variable"
							value={this.state.entries[index].forms.assignee}
						/>
					</div>
				);

			case 'multiply':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Multiply
						<input value={this.state.entries[index].forms.firstVal} />
						by
						<input value={this.state.entries[index].forms.secondVal} />
						and assign to
						<input
							placeholder="Variable"
							value={this.state.entries[index].forms.assignee}
						/>
					</div>
				);

			case 'divide':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Divide
						<input value={this.state.entries[index].forms.firstVal} />
						by
						<input value={this.state.entries[index].forms.secondVal} />
						and assign to
						<input
							placeholder="Variable"
							value={this.state.entries[index].forms.assignee}
						/>
					</div>
				);

			case 'if':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						If
						<input
							placeholder="First"
							value={this.state.entries[index].forms.name}
						/>
						<select
							placeholder="Condition"
							value={this.state.entries[index].forms.comparison}
						>
							<option selected value="is a">
								is a
							</option>
							<option value="is not a">is not a</option>
							<option value="contains">contains</option>
							<option value="does not contain">does not contain</option>
							<option value="is less than">is less than</option>
							<option value="is less than or equal to">
								is less than or equal too
							</option>
							<option value="is greater than">is greater than</option>
							<option value="is greater than or equal to">
								is greater than or equal too
							</option>
						</select>
						<input
							placeholder="Second"
							value={this.state.entries[index].forms.value}
						/>
					</div>
				);

			case 'while':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						While
						<input
							placeholder="First"
							value={this.state.entries[index].forms.name}
						/>
						<select
							placeholder="Condition"
							value={this.state.entries[index].forms.comparison}
						>
							<option selected value="is a">
								is a
							</option>
							<option value="is not a">is not a</option>
							<option value="contains">contains</option>
							<option value="does not contain">does not contain</option>
							<option value="is less than">is less than</option>
							<option value="is less than or equal to">
								is less than or equal too
							</option>
							<option value="is greater than">is greater than</option>
							<option value="is greater than or equal to">
								is greater than or equal too
							</option>
						</select>
						<input
							placeholder="Second"
							value={this.state.entries[index].forms.value}
						/>
					</div>
				);

			case 'read':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Read from
						<input
							placeholder="Source"
							value={this.state.entries[index].forms.from}
						/>
						to
						<input
							placeholder="Destination"
							value={this.state.entries[index].forms.to}
						/>
					</div>
				);

			case 'write':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Write from
						<input
							placeholder="Source"
							value={this.state.entries[index].forms.from}
						/>
						to
						<input
							placeholder="Destination"
							value={this.state.entries[index].forms.to}
						/>
					</div>
				);

			case 'print':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Print
						<input value={this.state.entries[index].forms.value} />
					</div>
				);

			case 'return':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						Return
						<input value={this.state.entries[index].forms.value} />
					</div>
				);

			case 'freeform':
				return (
					<div
						className={
							currentEntry.category +
							' indent' +
							this.state.entries[index].forms.indent
						}
					>
						<input value={this.state.entries[index].forms.value} />
					</div>
				);
		}
	}

	//returns text divs when in text export mode
	_buildText(index) {
		let currentEntry = this.state.entries[index];
		let numberOfTabs = parseInt(currentEntry.forms.indent);
		let commentMark = '';

		if (this.state.js === 'active') {
			commentMark = '// ';
		}
		if (this.state.python === 'active') {
			commentMark = '# ';
		}

		function returnTabs(total) {
			let toReturn;

			for (let i = 0; i <= total; ++i) {
				if (i < 1) {
					toReturn = '';
				} else {
					toReturn += '\t';
				}
			}

			return <span>{toReturn}</span>;
		}

		switch (currentEntry.type) {
			case 'initialize':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Initialize {currentEntry.forms.name}
					</pre>
				);

			case 'set':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Set {currentEntry.forms.name} equal to{' '}
						{currentEntry.forms.value}
					</pre>
				);

			case 'add':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Add {currentEntry.forms.firstVal} to{' '}
						{currentEntry.forms.secondVal} and assign to{' '}
						{currentEntry.forms.assignee}
					</pre>
				);

			case 'subtract':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Subtract {currentEntry.forms.firstVal} from{' '}
						{currentEntry.forms.secondVal} and assign to{' '}
						{currentEntry.forms.assignee}
					</pre>
				);

			case 'multiply':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Multiply {currentEntry.forms.firstVal} by{' '}
						{currentEntry.forms.secondVal} and assign to{' '}
						{currentEntry.forms.assignee}
					</pre>
				);

			case 'divide':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Divide {currentEntry.forms.firstVal} by{' '}
						{currentEntry.forms.secondVal} and assign to{' '}
						{currentEntry.forms.assignee}
					</pre>
				);

			case 'if':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}If {currentEntry.forms.name}{' '}
						{currentEntry.forms.comparison} {currentEntry.forms.value}
					</pre>
				);

			case 'while':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}While {currentEntry.forms.name}{' '}
						{currentEntry.forms.comparison} {currentEntry.forms.value}
					</pre>
				);

			case 'read':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Read from {currentEntry.forms.from} to{' '}
						{currentEntry.forms.to}
					</pre>
				);

			case 'write':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Write from {currentEntry.forms.from} to{' '}
						{currentEntry.forms.to}
					</pre>
				);

			case 'print':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Print {currentEntry.forms.value}
					</pre>
				);

			case 'return':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}Return {currentEntry.forms.value}
					</pre>
				);

			case 'freeform':
				return (
					<pre>
						{returnTabs(numberOfTabs)}
						{commentMark}
						{currentEntry.forms.value}
					</pre>
				);
		}
	}

	_handleFormChange(event) {
		// console.log(event.target.value);
		// console.log(this);

		axios
			.put(window.location.origin + '/api/project/entry', {
				title: window.location.search.slice(3),
				index: this.index,
				field: this.field,
				value: event.target.value,
			})
			.then(() => {
				this.fetch();
			});
	}

	//select edit view -- default when first loaded
	_selectEdit(event) {
		event.preventDefault();

		this.setState({
			editSelect: 'active',
			textSelect: 'notActive',
		});
	}

	//select text view to export
	_selectText(event) {
		event.preventDefault();

		this.setState({
			editSelect: 'notActive',
			textSelect: 'active',
		});
	}

	_selectPlainText(event) {
		event.preventDefault();

		this.setState({
			plainText: 'active',
			js: 'notActive',
			python: 'notActive',
		});
	}

	_selectJS(event) {
		event.preventDefault();

		this.setState({
			plainText: 'notActive',
			js: 'active',
			python: 'notActive',
		});
	}

	_selectPython(event) {
		event.preventDefault();

		this.setState({
			plainText: 'notActive',
			js: 'notActive',
			python: 'active',
		});
	}

	//====//

	render() {
		let languageSelect = '';

		if (this.state.textSelect === 'active') {
			languageSelect = (
				<div className="languageSelect">
					<a
						className={this.state.plainText}
						onClick={e => this._selectPlainText(e)}
						id="plainText"
						href=""
					>
						Plain Text
					</a>
					<a
						className={this.state.js}
						onClick={e => this._selectJS(e)}
						id="js"
						href=""
					>
						JS/Go/C/Java
					</a>
					<a
						className={this.state.python}
						onClick={e => this._selectPython(e)}
						id="python"
						href=""
					>
						Python/Ruby
					</a>
				</div>
			);
		}

		return (
			<div>
				<div id="viewerTitlePublic">
					<h2>
						Project: <span id="projectTitle"> {this.props.project}</span>{' '}
					</h2>

					<div id="selectViewer">
						<a
							className={this.state.editSelect}
							id="editSelect"
							onClick={e => this._selectEdit(e)}
							href=""
						>
							View Entries
						</a>
						<a
							className={this.state.textSelect}
							id="textSelect"
							onClick={e => this._selectText(e)}
							href=""
						>
							Export Text
						</a>
						{languageSelect}
					</div>
				</div>

				<div id="viewerPublic">{this._renderEntries()}</div>
			</div>
		); //end of render
	}
} //end of class

//==PROP VALIDATION
PublicViewer.propTypes = {
	project: PropTypes.string,
};

export default PublicViewer;
