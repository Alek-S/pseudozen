import React from 'react';

class Sidebar extends React.Component{
	constructor(){
		super();
	}



	//==HANDLERS==
	//====//


	render(){
		return(
			<div>
				<div id="declareSection" className='asideCategory'>
					<h2>Declaration</h2>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Initialize</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/>Set</div></a>
				</div>


				<div id="arithmaticSection" className='asideCategory'>
					<h2>Arithmatic</h2>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Add</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Subtract</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Multiply</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Divide</div></a>
				</div>


				<div id="loopSection" className='asideCategory'>
					<h2>Control Flow & Iteration</h2>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> If</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> While</div></a>
				</div>


				<div id="ioSection" className='asideCategory'>
					<h2>Input / Output</h2>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Read</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Write</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Print</div></a>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Return</div></a>
				</div>


				<div id="otherSection" className='asideCategory'>
					<h2>Other / Misc</h2>
					<a href=''><div className='type'><img className='addImage' src="assets/images/add.svg" alt="add" height='15px'/> Freeform</div></a>
				</div>
			</div>

		);
	}
}


export default Sidebar;