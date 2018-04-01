import React from 'react';
import axios from 'axios';

class Sidebar extends React.Component {
	constructor() {
		super();
	}

	//==HANDLERS==
	_handleClick(event) {
		event.preventDefault();

		let entry = {
			category: this.category,
			type: this.type,
			forms: formObj(this.type),
		};

		axios.post(window.location.origin + '/api/project/entry', {
			title: window.location.search.slice(3),
			newEntry: entry,
		});

		function formObj(type) {
			switch (type) {
				case 'initialize':
					return { name: '', indent: 0 };

				case 'set':
					return { name: '', value: '', indent: 0 };

				case 'add':
				case 'subtract':
				case 'multiply':
				case 'divide':
					return { firstVal: '', secondVal: '', assignee: '', indent: 0 };

				case 'if':
					return { name: '', comparison: '', value: '', indent: 0 };

				case 'while':
					return { name: '', comparison: '', value: '', indent: 0 };

				case 'read':
				case 'write':
					return { from: '', to: '', indent: 0 };

				case 'print':
				case 'return':
				case 'freeform':
					return { value: '', indent: 0 };
			}
		}
	}
	//====//

	render() {
		return (
			<div>
				<div id="declareSection" className="asideCategory">
					<h2>Declaration</h2>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'declare',
							type: 'initialize',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Initialize
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'declare',
							type: 'set',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								id="set"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Set
						</div>
					</a>
				</div>

				<div id="arithmaticSection" className="asideCategory">
					<h2>Arithmatic</h2>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'arithmatic',
							type: 'add',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Add
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'arithmatic',
							type: 'subtract',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Subtract
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'arithmatic',
							type: 'multiply',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Multiply
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'arithmatic',
							type: 'divide',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Divide
						</div>
					</a>
				</div>

				<div id="loopSection" className="asideCategory">
					<h2>Flow & Iteration</h2>

					<a
						href=""
						onClick={this._handleClick.bind({ category: 'loop', type: 'if' })}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							If
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'loop',
							type: 'while',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							While
						</div>
					</a>
				</div>

				<div id="ioSection" className="asideCategory">
					<h2>Input / Output</h2>
					<a
						href=""
						onClick={this._handleClick.bind({ category: 'io', type: 'read' })}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Read
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({ category: 'io', type: 'write' })}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Write
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({ category: 'io', type: 'print' })}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Print
						</div>
					</a>

					<a
						href=""
						onClick={this._handleClick.bind({ category: 'io', type: 'return' })}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Return
						</div>
					</a>
				</div>

				<div id="otherSection" className="asideCategory">
					<h2>Other / Misc</h2>

					<a
						href=""
						onClick={this._handleClick.bind({
							category: 'other',
							type: 'freeform',
						})}
					>
						<div className="type">
							<img
								className="addImage"
								src="assets/images/add.svg"
								alt="add"
								height="15px"
							/>{' '}
							Freeform
						</div>
					</a>
				</div>
			</div>
		);
	}
} //end of render

export default Sidebar;
