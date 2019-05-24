import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class ViewReport extends React.Component {
	constructor(props) {
		super(props);
	}
	displayReport = () => {
		return this.props.report.data ? JSON.stringify(this.props.report.data) : '';
	};
	render() {
		console.log('4:-' + JSON.stringify(this.props.report.data));
		let displayData = [];

		if (localStorage.getItem('data')) {
			displayData = displayData.concat(JSON.parse(localStorage.getItem('data')));
			if (this.props.report.data) {
				console.log('2] LOCALSTORAGE AND PROPS.DATA');
				this.props.report.data.forEach(v => {
					console.log('v:-' + JSON.stringify(v));
					displayData.push(v);
				});
			}
		} else {
			console.log('1] NO LOCALSTORAGE BUT PROPS.DATA');
			if (this.props.report.data) displayData = this.props.report.data;
		}
		
    localStorage.setItem('data', JSON.stringify(displayData));
		
		
		const columns = [
			{
				Header: 'Date',
				accessor: 'date', // String-based value accessors!
				sortMethod: (a,b)=>{
					let pattern = /(\d{1,3})/;
					if (a.match(pattern) && b.match(pattern)) {
						return parseInt(a.match(pattern)[0]) < parseInt(b.match(pattern)[0]) ? 1 : -1
					}
				}
			},
			{
				Header: 'Category',
				accessor: 'category',
			},
			{
				Header: 'Status',
				accessor: 'status',
			},
		];

		return (
			<div className="mainView">
				<div className="createView">
					<div className="myformView">
						<input type="text" placeholder="SEARCH REPORT" value="" />
						<select className="optionsView">
							<option value="sort_date">SORT_BY_DATE</option>
							<option value="sort_category">SORT_BY_CATEGORY</option>
						</select>
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
						}}/>
					</div>
				</div>
			</div>
		);
	}
}

