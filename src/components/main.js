import React from 'react';
import axios from 'axios';

import Editor from './children/editor.js';
import New from './children/new.js';
import Public from './children/public.js';
import PublicViewer from './children/publicView.js';

class Main extends React.Component {
	constructor() {
		super();

		this.state = {
			name: undefined,
		};
	}

	//==Life Cycle==
	componentWillMount() {
		this._getUser();
	}

	//====//

	//==HANDLERS==
	_handleLogout(event) {
		event.preventDefault();

		axios.post(window.location.origin + '/api/logout').then(() => {
			window.location.replace(window.location.origin + '/');
		});
	}

	_getUser() {
		if (
			window.location.pathname === '/project' &&
			this.state.name === undefined
		) {
			console.log(1);
			axios.get(window.location.origin + '/api/name').then(res => {
				if (res.data.name) {
					this.setState({
						name: res.data.name,
					});
				}
			});
		}
	}

	_getNav() {
		const pathname = window.location.pathname;

		if (pathname === '/project') {
			if (!location.search || location.search.length < 1) {
				return (
					<div id="nav">
						<a href="/">
							<img
								id="logoSVG"
								src="./assets/images/logo.svg"
								alt="Logo"
								height="40px"
							/>
						</a>
						<p id="accountName"> {` ${this.state.name}'s Account `}</p>
						<a href="/" className="btn" id="back">
							back
						</a>
						<a
							href=""
							className="btn"
							id="logout"
							onClick={e => this._handleLogout(e)}
						>
							logout
						</a>
					</div>
				);
			} else {
				return (
					<div id="nav">
						<a href="/">
							<img
								id="logoSVG"
								src="./assets/images/logo.svg"
								alt="Logo"
								height="40px"
							/>
						</a>
						<p id="accountName"> {` ${this.state.name}'s Account `}</p>
						<a href="/project" className="btn" id="back">
							back
						</a>
						<a
							href=""
							className="btn"
							id="logout"
							onClick={e => this._handleLogout(e)}
						>
							logout
						</a>
					</div>
				);
			}
		}
		if (pathname === '/public') {
			if (!location.search || location.search.length < 1) {
				return (
					<div id="nav">
						<a href="/">
							<img
								id="logoSVG"
								src="./assets/images/logo.svg"
								alt="Logo"
								height="40px"
							/>
						</a>
						<p id="accountName">Public Projects</p>
						<a href="/" className="btn" id="back">
							back
						</a>
					</div>
				);
			} else {
				return (
					<div id="nav">
						<a href="/">
							<img
								id="logoSVG"
								src="./assets/images/logo.svg"
								alt="Logo"
								height="40px"
							/>
						</a>
						<p id="accountName">Public Projects</p>
						<a href="/public" className="btn" id="back">
							back
						</a>
					</div>
				);
			}
		}
	}
	//====//

	//==RENDER==
	render() {
		let body = null;

		if (window.location.pathname === '/project' && !location.search) {
			body = <New />;
		} else if (window.location.pathname === '/project') {
			body = <Editor project={location.search.slice(3)} />;
		} else if (window.location.pathname === '/public' && !location.search) {
			body = <Public />;
		} else {
			body = <PublicViewer project={location.search.slice(3)} />;
		}

		return (
			<div>
				<header>{this._getNav()}</header>

				<section id="main">{body}</section>
			</div>
		);
	}
	//====//
} //end of Class

export default Main;
