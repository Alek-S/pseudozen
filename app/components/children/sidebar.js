import React from 'react';

class Sidebar extends React.Component{
	render(){
		return(
			<div>
				<div id="declareSection" className='asideCategory'>
					<h2>Declaration</h2>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Initialize</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Set</a></div>
				</div>


				<div id="arithmaticSection" className='asideCategory'>
					<h2>Arithmatic</h2>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Add</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Subtract</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Multiply</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Divide</a></div>
				</div>


				<div id="loopSection" className='asideCategory'>
					<h2>Iteration</h2>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> If</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> While</a></div>
				</div>


				<div id="ioSection" className='asideCategory'>
					<h2>Input / Output</h2>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Read</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Write</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Print</a></div>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Return</a></div>
				</div>


				<div id="otherSection" className='asideCategory'>
					<h2>Other / Misc</h2>
					<div className='type'><a href=''><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Freeform</a></div>
				</div>
			</div>

		);
	}
}


export default Sidebar;