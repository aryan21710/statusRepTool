import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class ViewReport extends React.Component {
	constructor(props) {
		super(props);
	}

	convertToMap=(data)=>{
		 let map = new Map();
				let key =
					'date' +
					':' +
					data['date'] +
					':' +
					'category' +
					':' +
					data['category'] +
					':' +
					'status' +
					':' +
					data['status'];
				map.set(key, 1);
				return map;
			
	} 

	convertMaptoObj=(d)=>{
		let arrOfObj=d.map((m)=>{
			let arr = [];
			let obj={}
			for(let k of m.keys()) arr.push(k.split(':'))
			for(let i=1;i<= arr[0].length-1;i++) {
				if (i%2!=0) {
					(obj[arr[0][i - 1]] = arr[0][i]);
				}
			}
			return obj
		})
		return arrOfObj;
		}

	
	
	render() {
		console.log('4:-' + JSON.stringify(this.props.data));

		let displayData = []
		let d=[]

				if (localStorage.getItem('data')) {
					displayData = displayData.concat(JSON.parse(localStorage.getItem('data')));
					const localStortoMap=displayData.map((m)=>{
				     return this.convertToMap(m);
					})

				

					if (this.props.data) {
						console.log('2] LOCALSTORAGE AND PROPS.DATA');
						const propsDatatoMap = this.props.data.map(m => {
							return this.convertToMap(m);
						});
					if (localStortoMap.length > 0 && propsDatatoMap.length > 0) {
					
							for (let j=0; j<=propsDatatoMap.length-1;j++) {
								let flag=false;
								for(let i=0; i<=localStortoMap.length-1;i++) {
									for(let k of localStortoMap[i].keys()) {
										if (propsDatatoMap[j].has(k)) flag=true
									}
									if (flag) break 	
								}
							
							!flag && (d.push(propsDatatoMap[j])) 
						}																				

							
						
						console.log('d:-'+d);

						const d1=d.length > 0 ? this.convertMaptoObj(d) : []

						console.log('d1:-'+JSON.stringify(d1,null,4));
				
						// displayData=displayData.concat({
						// 	...JSON.parse(localStorage.getItem('data')),
						// 	...this.props.data,
						// });

						d1.forEach(v => {

							console.log('v:-' + JSON.stringify(v));
							displayData.push(v);
						});
					} else {
								if (this.props.data)
									displayData.push(
											this.props.data
											);

					}
					}
				} else {
					console.log('1] NO LOCALSTORAGE BUT PROPS.DATA');
					if (this.props.data) displayData.push(this.props.data);
				}		
			localStorage.setItem('data', JSON.stringify(displayData));
		
		
		
		const columns = [
			{
				Header: 'Click to Sort',
				accessor: 'date', // String-based value accessors!
				sortMethod: (a,b)=>{
					let pattern = /(\d{1,3})/;
					if (a.match(pattern) && b.match(pattern)) {
						return parseInt(a.match(pattern)[0]) < parseInt(b.match(pattern)[0]) ? 1 : -1
					}
				}
			},
			{
				Header: 'Click to Sort',
				accessor: 'category',
			},
			{
				Header: 'Click to Sort',
				accessor: 'status',
			},
		];

		return (
			<div className="mainView">
				<div className="createView">
					<div className="myformView">
						<input type="text" placeholder="SEARCH REPORT" value="" />
						<ReactTable
							className="-striped -highlight textAreaView"
							data={displayData}
							columns={columns}
							defaultSorted={[
								{
									id: 'this.state.category',
									desc: true,
								},
							]}
						/>
					</div>
				</div>
			</div>
		);
	}
}

