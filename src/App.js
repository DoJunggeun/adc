import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			acd: '',
			dest: '용인',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	handleSubmit(event) {
		const month = 8;
		let data = JSON.parse(localStorage.getItem(month));
		const date = this.state.date;
		const dest = this.state.dest;
		const acd = Number(this.state.acd);
		if (data === null) {
			data = [[date, dest, acd]];
		} else {
			data = Object.values(data);
			for (let i = 0; i < data.length; i++) {
				if (this.state.date < data[i][0]) {
					data.splice(i, 0, [date, dest, acd]);
					break;
				}
				if (i === data.length - 1) {
					data.push([date, dest, acd]);
					break;
				}
			}
		}
		localStorage.setItem(month, JSON.stringify(data));

		this.setState({ date: '', dest: '용인', acd: '' });
	}

	render() {
		const today = new Date();
		console.log(this.state);
		return (
			<div className="App">
				<h2>주파 계산기</h2>
				<div className="inputs">
					<input
						type="date"
						value={this.state.date}
						name="date"
						onChange={this.handleChange}
						style={{textAlign:'center', fontSize:'1rem'}}
					/>
					<input
						type="text"
						value={this.state.dest}
						name="dest"
						onChange={this.handleChange}
						style={{textAlign:'center', fontSize:'1rem'}}
					/>
					<input
						type="text"
						value={this.state.acd}
						name="acd"
						onChange={this.handleChange}
						placeholder="누적주파"
						style={{textAlign:'center', fontSize:'1rem'}}

					/>
					<input type="button" value="저장" onClick={this.handleSubmit} />
				</div>
				
				<button
					style={{ height: 40, width: 150 }}
					onClick={() =>{ localStorage.clear(); this.setState({date: '', dest: '용인', acd: ''})}}
					>로컬스토리지 초기화</button>
				
				<div className="outputs">
					{localStorage.getItem(8)}
				</div>
			</div>
		);
	}
}

export default App;