import React, { Component, Fragment, useState } from 'react';
import './App.css';
import tire from './tire.png';
import logo from './1.png';
import del from './delete.png';
import edit from './edit.png';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			acd: '',
			dest: '용인',
			monthDisplay: '',
			editDisplay:false,
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
		} else {
			month = ''+month;
		}
		let date = today.getDate();
		if (date < 10) {
			date = '0' + date;
		}
		const now = year + '-' + month + '-' + date;
		this.setState({
			date: now,
			month: month,
			monthDisplay: month
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
				month: month,
			});
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
			alert(date.substr(5, 2) + '/' + date.substr(8, 2) + '의 행선지를 입력해주세요!');
			return;
		}
		if (acd === 0) {
			alert(date.substr(5, 2) + '/' + date.substr(8, 2) + '의 누적 주행거리를 입력해주세요!');
			return;
		}
		let data = JSON.parse(localStorage.getItem('distances'));
		if (data == null || data == undefined || data == '') {
			data = [[date, dest, acd]];
		} else {
			data = Object.values(data);
			for (let i = 0; i < data.length; i++) {
				if (this.state.date === data[i][0]) {
					alert(
						date.substr(5, 2) +
							'/' +
							date.substr(8, 2) +
							'의 주파는 이미 입력되어 있습니다!'
					);
					return;
				}
				if (this.state.date > data[i][0]) {
					if (data[i][2] >= acd) {
						alert(
							date.substr(5, 2) +
								'/' +
								date.substr(8, 2) +
								'의 누적 주행거리는' +
								data[i][0].substr(5, 2) +
								'/' +
								data[i][0].substr(8, 2) +
								'의 누적 주행거리보다 커야합니다! '
						);
						return;
					}
				}
				if (this.state.date < data[i][0]) {
					if (data[i][2] <= acd) {
						alert(
							date.substr(5, 2) +
								'/' +
								date.substr(8, 2) +
								'의 누적 주행거리는' +
								data[i][0].substr(5, 2) +
								'/' +
								data[i][0].substr(8, 2) +
								'의 누적 주행거리보다 작아야합니다! '
						);
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
		localStorage.setItem('distances', JSON.stringify(data));

		this.setState({ date: '', dest: '용인', acd: '', monthDisplay:date.substr(5,2) });
	}
	resetData() {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('정말 초기화 하시겠습니까?\n입력한 모든 데이터가 삭제됩니다.')) {
			localStorage.clear();
			this.setState({ date: '', dest: '용인', acd: '' });
		} else {
		}
	}

	welcome() {
		if (localStorage.getItem('welcome') !== 'done') {
			if (
			// eslint-disable-next-line no-restricted-globals
				confirm(
					'올바른 사용법\n\n1.홈 화면에 추가해서 사용해주세요!\n동일한 방식으로 접속하셔야 데이터가 잘 저장됩니다ㅎㅎ \n2.저번 달 마지막 주파를 입력해주셔야\n일간, 월간 누적 주파가 정상적으로 출력됩니다!\n\n확인을 누르시면 다시 표시되지 않습니다.'
				)
			) {
				localStorage.setItem('welcome', 'done');
				return true;
			} else {
				localStorage.setItem('welcome', 'not yet');
				return true;
			}
		}
	}
	editButton() {
		if (this.state.editDisplay === false) {
			this.setState({editDisplay:true})	
		}
		if (this.state.editDisplay === true) {
			this.setState({editDisplay:false})	
		}
	}
	render() {
		{
			setTimeout(this.welcome(), 1500);
		}
		return (
			<div className="App">
				<p style={{margin:0, fontSize:10, position:'fixed', right:0, top:0}}>made by 도정근</p>
				<div className="App-header">
					<img src={logo} alt="logo" className="headerimage" />
					<h2>주파 계산기</h2>
					<img src={tire} alt="tire" className="headerimage logo" />
				</div>
				<button
					style={{
						height: 28,
						width:56 ,
						fontSize: '0.7rem',
						position: 'absolute',
						top: 20,
						right: 10,
					}}
					onClick={() => {
						this.resetData();
					}}
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
						style={{ textAlign: 'center', fontSize: '1rem', width: '100%' }}
					/>
				</div>
				<div
					style={{
						display: 'relative',
						width: '100%',
						justifyContent: 'center',
						paddingBottom: 10,
					}}
				>
					<select
						name="monthDisplay"
						value={this.state.monthDisplay}
						style={{ height: 30, width: '30%', fontSize: '1rem', textAlign: 'center', margin:'auto' }}
						onChange={this.handleChange}
					>
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
					<button style={{height: 28, width:56, fontSize: '0.8rem', position: 'absolute', right:10}} onClick={() => this.editButton()}>
						{this.state.editDisplay ? '완료' : '수정'}
					</button>

				</div>
				

				
				<div className="outputs">
					<Output month={this.state.monthDisplay} editDisplay={this.state.editDisplay}/>
				</div>
				<p style={{fontSize:9, marginTop:50, marginBotton:0}}>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
			</div>
		);
	}
}

export default App;

function Output(props) {
	const forceUpdate = useForceUpdate();
	let editDisplay = props.editDisplay;
	const month = props.month;
	let fullDatas = JSON.parse(localStorage.getItem('distances'));
	if (fullDatas == null || fullDatas == undefined || fullDatas == '') {
		return (
			<Fragment>
				<table
					border="1px solid black"
					width="360px"
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
	}

	let datas = [];
	let lastacd = 0;
	for (let i = 0; i < fullDatas.length; i++) {
		if (fullDatas[i][0].substr(5, 2) === month) {
			datas.push(fullDatas[i]);
		} else if ( fullDatas[i][0].substr(5, 2) == month - 1 ) {
			lastacd = fullDatas[i][2];
		}
	}

	let list;
	let monthsum = 0;

	if (datas === null) {
		return (
			<Fragment>
				<table
					border="1px solid black"
					width="360px"
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
		if (fullDatas[0][0].substr(5, 2) === month) {
			fullDatas[0][3] = '??';
			fullDatas[0][4] = '??';
		}
		for (let i = 0; i < datas.length; i++) {
			if (datas[i][3] === '??') continue;
			if (i === 0) {
				datas[i][3] = datas[i][2] - lastacd;
				monthsum = monthsum + datas[i][3];
				datas[i][4] = monthsum;
			} else {
				datas[i][3] = datas[i][2] - datas[i - 1][2];
				monthsum = monthsum + datas[i][3];
				datas[i][4] = monthsum;
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
				<td style={{display: editDisplay ? 'flex' : 'none', border:'0px'}}>
					<img
						src={edit}
						alt={'수정'}
						style={{width:26, height:26, margin:'auto'}}
						onClick={() => {
							editData(data[0]);
							forceUpdate();
						}}
					/>
					<img
						src={del}
						alt={'삭제'}
						style={{width:26, height:26, margin:'auto'}}
						onClick={() => {
							deleteData(data[0]);
							forceUpdate();
						}}
					/>
				</td>
			</tr>
		));
	}

	return (
		<Fragment>
			<table
				border="1px solid black"
				width="360px"
				align="center"
				style={{ fontSize: '0.9rem' }}
			>
				<tr>
					<th>날짜</th>
					<th>행선지</th>
					<th>일간 / 월간</th>
					<th>누적</th>
					<th style={{display:editDisplay ? 'block' : 'none', border:'0px'}}> </th>
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

function deleteData(date) {
	// eslint-disable-next-line no-restricted-globals
	if (confirm(date.substr(5,2)+'/'+date.substr(8,2)+'의 주행 기록을 삭제하시겠습니까?')) {
		let fullDatas = JSON.parse(localStorage.getItem('distances'));
		for (let i = 0; i < fullDatas.length; i++) {
			if (fullDatas[i][0] === date) {
				fullDatas.splice(i, 1);
				localStorage.setItem('distances', JSON.stringify(fullDatas));
				alert('삭제되었습니다');
				return;
			}
		}
	} else {
		alert('취소되었습니다');
	}

}

function editData(date) {
	let data;
	let newDestination;
	let newDistance;
	let newDate;
	let editIndex;
	// eslint-disable-next-line no-restricted-globals
	if (confirm(date.substr(5,2)+'/'+date.substr(8,2)+'의 주행 기록을 수정하시겠습니까?')) {
		let fullDatas = JSON.parse(localStorage.getItem('distances'));
		for (let i = 0; i < fullDatas.length; i++) {
			if (fullDatas[i][0] === date) {
				data = fullDatas[i];
				editIndex = i;
				// eslint-disable-next-line no-restricted-globals
				newDate = prompt(data[0].substr(5,2)+'/'+data[0].substr(8,2)+'의 주파가 맞나요?', data[0]);
				// eslint-disable-next-line no-restricted-globals
				newDestination = prompt(data[0].substr(5,2)+'/'+data[0].substr(8,2)+'의 행선지는?', data[1]);
				// eslint-disable-next-line no-restricted-globals
				newDistance = prompt(data[0].substr(5,2)+'/'+data[0].substr(8,2)+'의 누적 주행거리는?', data[2]);
				break;
			}
		}
		
		// for (let i = 0; i < fullDatas.length; i++) {
		// 	if (this.state.date > fullDatas[i][0]) {
		// 		if (fullDatas[i][2] >= newDistance) {
		// 			alert(
		// 				data[0].substr(5, 2) +
		// 					'/' +
		// 					data[0].substr(8, 2) +
		// 					'의 누적 주행거리는' +
		// 					fullDatas[i][0].substr(5, 2) +
		// 					'/' +
		// 					fullDatas[i][0].substr(8, 2) +
		// 					'의 누적 주행거리보다 커야합니다! '
		// 			);
		// 			return;
		// 		}
		// 	}
		// 	if (this.state.date < fullDatas[i][0]) {
		// 		if (fullDatas[i][2] <= newDistance) {
		// 			alert(
		// 				data[0].substr(5, 2) +
		// 					'/' +
		// 					data[0].substr(8, 2) +
		// 					'의 누적 주행거리는' +
		// 					fullDatas[i][0].substr(5, 2) +
		// 					'/' +
		// 					fullDatas[i][0].substr(8, 2) +
		// 					'의 누적 주행거리보다 작아야합니다! '
		// 			);
		// 			return;
		// 		}
		// 	}
		// }
		
		
		fullDatas.splice(editIndex,1,[newDate, newDestination, newDistance])
		localStorage.setItem('distances', JSON.stringify(fullDatas));
		alert('반영되었습니다');
		return;

	} else {
		alert('취소되었습니다');
	}
}


function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return () => setValue((value) => ++value); // update the state to force render
}