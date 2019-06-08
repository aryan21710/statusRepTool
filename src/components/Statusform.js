import React from "react";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import moment from "moment";
import ReactTable from 'react-table';
import './../../styles/react-table.css';

export default class StatusForm extends React.Component {
  constructor(props) {
    super(props);
	this.userText = "";
	this.submitBtn=true;
    this.state = {
		createdAt: moment(),
		calFocussed: false,
		categoryObj: {},
		categoryCnt: 1,
		category: 'Miscellaneous',
		text: '',
		data: [],
	};
  }

  Submit = e => {
    e.preventDefault();
  };

  render() {
	   const columns = [
			{
				Header: 'Date',
				accessor: 'date', // String-based value accessors!
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
		<div className="main">
			<div className="create">
				<form className="myForm" onSubmit={this.Submit}>
					<div className="addRepDiv">
						<SingleDatePicker
							date={this.state.createdAt}
							onDateChange={createdAt => {
								createdAt && this.setState({ createdAt });
							}}
							focused={this.state.calFocussed}
							onFocusChange={({ focused }) => {
								this.setState({ calFocussed: focused });
							}}
							numberOfMonths={1}
							isOutsideRange={() => false}
						/>

						<select
							className="options"
							onChange={e => {
								if (e.target.value != 'Category') {
									this.setState({
										category: e.target.value,
									});
								}
							}}
						>
							<option value="React">React</option>
							<option value="Javascript">Javascript</option>
							<option value="Resume">Resume</option>
							<option value="Css animation">Css animation</option>
							<option value="WowExp">WowExp</option>
							<option value="LogoDesign">LogoDesign</option>
							<option value="CharDesign">CharDesign</option>
							<option value="Comicstrip">Comicstrip</option>
							<option value="UIDesign">UIDesign</option>
							<option value="Category" selected>
								Category
							</option>
						</select>

						<textarea
							className="textarea1"
							placeholder="ENTER WORK DONE"
							value={this.state.text}
							name="textElm"
							onInput={e => {
								this.setState({
									text: e.target.value,
								});
								e.target.value = '';
							}}
						/>
						<button
							className="btn1"
							onClick={e => {
								if (this.state.text.length > 0 && this.state.text != '') {
									console.log('ADD REPORT NOW');
									this.setState({
										categoryCnt: this.state.categoryCnt + 1,
									});
									const categ = this.state.category;
									const text = this.state.text;
									console.log('text:-' + text);
									const obj1 = {};
									obj1[categ] = text;

									this.setState({
										categoryObj: Object.assign({}, this.state.categoryObj, obj1),
									});
									console.log(JSON.stringify(this.state.categoryObj, null, 4));

									this.setState({
										text: '',
									});
									let dataobj = {
										date: this.state.createdAt.format('LL'),
										category: this.state.category,
										status: this.state.text,
									};

									console.log('DATAOBJ:-' + JSON.stringify(dataobj, null, 4));
									this.submitBtn = false;

									this.setState({
										data: this.state.data.concat(dataobj),
									});
									console.log('NEW DATA NOW:-' + JSON.stringify(this.state.data, null, 4));
								} else {
									alert('NO STATUS REPORT ENTERED');
								}
							}}
						>
							{' '}
							+
						</button>
					</div>

					<div className="submitRepDiv">
						<ReactTable
							className="-striped -highlight"
							data={this.state.data}
							columns={columns}
							defaultSorted={[
								{
									id: 'this.state.category',
									desc: true,
								},
							]}
						/>

						<div className="btn2">
							<button
								onClick={() => {
									if (this.submitBtn) {
										alert('PLEASE ENTER STATUS, ADD REPORT TO PROCEED WITH SUBMIT');
									} else {
										console.log('SUBMITTING THE PROPS OUT OF STATUSFORM');
										this.props.onSubmit({
											createdAt: this.state.createdAt,
											calFocussed: this.state.calFocussed,
											categoryObj: this.state.categoryObj,
											categoryCnt: this.state.categoryCnt,
											category: this.state.category,
											text: this.state.text,
											data: this.state.data,
										});
									}
								}}
							>
								Submit Report
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
  }
}
