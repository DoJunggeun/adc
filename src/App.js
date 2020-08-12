import React, { Component, Fragment } from 'react';
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
		this.monthChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		const today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		let date = today.getDate();
		if (date < 10) {
			date = '0' + date;
		}
		const now = year + '-' + month + '-' + date;
		this.setState({
			date: now,
			month: month
		});
	}
	componentDidUpdate() {
		const today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		let date = today.getDate();
		if (date < 10) {
			date = '0' + date;
		}
		const now = year + '-' + month + '-' + date;
		if (this.state.date === '') {
			this.setState({
				date: now,
				month: month
			})
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	handleSubmit(event) {
		const date = this.state.date;
		const dest = this.state.dest;
		const acd = Number(this.state.acd);
		if (date === null) {
			alert('날짜를 입력해주세요!');
			return;
		}
		if (dest === '') {
			alert(date.substr(5,2)+'/'+date.substr(8,2)+'의 행선지를 입력해주세요!');
			return;
		}
		if (acd === 0) {
			alert(date.substr(5,2)+'/'+date.substr(8,2)+'의 누적 주행거리를 입력해주세요!');
			return;
		}
		const month = date.substr(5,2);
		let data = JSON.parse(localStorage.getItem(month));
		if (data === null) {
			data = [[date, dest, acd]];
		} else {
			data = Object.values(data);
			for (let i = 0; i < data.length; i++) {
				if (this.state.date == data[i][0]) {
					alert(date.substr(5,2)+'/'+date.substr(8,2)+'의 주파는 이미 입력되어 있습니다!')
					return;
				}
				if (this.state.date > data[i][0]) {
					if (data[i][2] >= acd ) {
						if (data[i][2] >= acd) {
							alert(date.substr(5,2)+'/'+date.substr(8,2)+'의 누적 주행거리는'+data[i][0].substr(5,2)+'/'+data[i][0].substr(8,2)+'의 누적 주행거리보다 커야합니다! ')
							return;
					}
					}
				}
				if (this.state.date < data[i][0]) {
					if (data[i][2] <= acd) {
						alert(date.substr(5,2)+'/'+date.substr(8,2)+'의 누적 주행거리는'+data[i][0].substr(5,2)+'/'+data[i][0].substr(8,2)+'의 누적 주행거리보다 작아야합니다! ')
						return;
					}
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
	resetData() {
	// eslint-disable-next-line no-restricted-globals
		if (confirm('정말 초기화 하시겠습니까? 입력한 모든 데이터가 삭제됩니다.')) {
			localStorage.clear();
			this.setState({ date: '', dest: '용인', acd: '' });
		} else {
		}
	}
	render() {
		console.log(this.state)
		return (
			<div className="App">
				<h2>주파 계산기</h2>
				<button
					style={{
						height: 30,
						width: 50,
						fontSize: '0.6rem',
						position: 'absolute',
						top: 20,
						right: 20,
					}}
					onClick={() => {this.resetData();}}
				>
					초기화
				</button>
				<div className="inputs">
					<input
						type="date"
						value={this.state.date}
						name="date"
						onChange={this.handleChange}
						style={{ textAlign: 'center', fontSize: '1rem', width: '100%' }}
					/>
					<input
						type="text"
						value={this.state.dest}
						name="dest"
						onChange={this.handleChange}
						placeholder="행선지"
						style={{ textAlign: 'center', fontSize: '1rem', width: '100%' }}
					/>
					<input
						type="text"
						value={this.state.acd}
						name="acd"
						onChange={this.handleChange}
						placeholder="누적 주행거리"
						style={{ textAlign: 'center', fontSize: '1rem', width: '100%' }}
					/>
					<input
						type="button"
						value="저장"
						onClick={this.handleSubmit}
						style={{ fontSize: '1rem' }}
					/>
				</div>
				<div style={{display:'flex', width:'100%', justifyContent:'center'}}>
						<select name="month" value={this.state.month} style={{height:30, width:'25%'}} onChange={this.handleChange}>
							<option value="01">1월 주파</option>
							<option value="02">2월 주파</option>
							<option value="03">3월 주파</option>
							<option value="04">4월 주파</option>
							<option value="05">5월 주파</option>
							<option value="06">6월 주파</option>
							<option value="07">7월 주파</option>
							<option value="08">8월 주파</option>
							<option value="09">9월 주파</option>
							<option value="10">10월 주파</option>
							<option value="11">11월 주파</option>
							<option value="12">12월 주파</option>
						</select>
				</div>
				<div className="outputs">
					<Output month={this.state.month}/>
				</div>
			</div>
		);
	}
}

export default App;

function Output(props) {
	const month = props.month;
	const lastacd = 80945;
	let datas = JSON.parse(localStorage.getItem(month));
	let list;
	let monthsum = 0;
	if (datas === null) {
		return (
			<Fragment>
				<h3>{month}월 주파</h3>
				<table
					border="1px solid black"
					width="360"
					align="center"
					style={{ fontSize: '0.9rem' }}
				>
					<tr>
						<th>날짜</th>
						<th>행선지</th>
						<th>일간/월간</th>
						<th>누적</th>
					</tr>
				</table>
			</Fragment>
		);
	} else {
		for (let i = 0; i < datas.length; i++) {
			if (i === 0) {
				datas[i].push(datas[i][2] - lastacd);
				datas[i].push(datas[i][3]);
			} else {
				datas[i].push(datas[i][2] - datas[i - 1][2]);
				datas[i].push(datas[i][3] + datas[i - 1][4]);
			}
		}
		list = datas.map((data) => (
			<tr key={data[2]}>
				<td>
					{data[0].substr(5, 2)}/{data[0].substr(8, 2)} {yoil(new Date(data[0]).getDay())}
				</td>
				<td>{data[1]}</td>
				<td>
					{data[3]} / {data[4]}
				</td>
				<td>{data[2]}</td>
			</tr>
		));
	}

	return (
		<Fragment>
			<h3>{month}월 주파</h3>
			<table
				border="1px solid black"
				width="360"
				align="center"
				style={{ fontSize: '0.9rem' }}
			>
				<tr>
					<th>날짜</th>
					<th>행선지</th>
					<th>일간/월간</th>
					<th>누적</th>
				</tr>
				{list}
			</table>
		</Fragment>
	);
}

function yoil(day) {
	if (day === 0) return <span style={{ color: 'red', fontWeight: 500 }}>일</span>;
	if (day === 1) return '월';
	if (day === 2) return '화';
	if (day === 3) return '수';
	if (day === 4) return '목';
	if (day === 5) return '금';
	if (day === 6) return <span style={{ color: 'darkblue', fontWeight: 500 }}>토</span>;
}

