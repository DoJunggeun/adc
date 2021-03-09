# [누적 주행거리 계산기](https://dojunggeun.github.io/adc/)

## Motivation
운전병으로 복무 중인 나는 매일 운행 내역(당일 운행 시작시 주행거리, 당일 운행 종료시 주행거리, 행선지 등)을 기록하여 매달 양식에 맞추어 제출해야 한다. 기존에는 운행 내역을 기본 메모 앱에 기록했다. 그런데 당일 누적 주행거리, 월 누적 주행거리 등을 작성할 때마다 일일히 계산해야하는 불편함이 있어 (내가 쓰려고) 간단한 웹앱을 만들었다.

## Features
- 일일 주행 기록 입력
	- 날짜는 당일, 행선지는 용인이 기본값


- 입력된 주행 기록 검사
	- 입력한 날짜의 누적 주행거리가 이전 주행거리보다 작거나
	이후 주행거리보다 크면 입력 실패

## What I used
- JS basics
	- Input tag (text, date)
	- Date Object
	- Alert, Confirm, Prompt
	- Localstorage
- React basics
	- State, Props
	- Fragment
- CSS basics
	- Keyframes & Transform