<template>
	<div>
		<div class="">
			<input type="button" value="2017" v-model='selectDAY' @click = 'ToggleCalendar()'>
		</div>
		<div class="M-Calendar" v-if='toggleCalendar'>
			<div class="date-nav">
				<div class="date-year">
					<span @click = 'ChangeYear("-")'><</span>
					<span v-html='calendarData.currentY'>&nbsp;&nbsp;&nbsp;2017&nbsp;&nbsp;&nbsp;</span>
					<span @click = 'ChangeYear("+")'>></span>
				</div>
				<div class="date-month">
					<span @click='ChangeMonth("-")'><</span>
					<span v-html='calendarData.currentM'>&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;</span>
					<span @click='ChangeMonth("+")'>></span>
				</div>
			</div>
			<div class="date-header">
				<div>一</div>
				<div>二</div>
				<div>三</div>
				<div>四</div>
				<div>五</div>
				<div>六</div>
				<div>日</div>
			</div>
			<ul>
				<li v-bind:class='liClass'   v-for='(item,key) in calendarData.DateObj' @click = 'selectDay(item)'>{{item.date}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Calendar',
		props:['liClass'],
		data() {
			return {
				calendarData: {
					//初始化当月所属的年-月-日-星期
					currentY: 0,
					currentM: 0,
					currentD: 0,
					currentW: 0,
					//日期对象
					DateObj: {},
				},
				calendarAction: {

				},
				toggleCalendar:false,
				selectDAY:''
			}
		},
		methods: {
			//five 切换月份
			ChangeMonth(type) {
				if(type == "+") {
					this.calendarData.currentM++;
					if(this.calendarData.currentM >= 13) {
						this.calendarData.currentM = 1;
						this.calendarData.currentY++;
					}
					this.calendarAction.initial();
				} else if(type == "-") {
					this.calendarData.currentM--;
					if(this.calendarData.currentM <= 0) {
						this.calendarData.currentM = 12;
						this.calendarData.currentY--;
					}
					this.calendarAction.initial();
				}
			},
			ChangeYear(type){
				if(type == "+") {
					this.calendarData.currentY++;
					this.calendarAction.initial();
				} else if(type == "-") {
					this.calendarData.currentY--;
					this.calendarAction.initial();
					console.log(this.calendarData.currentY)
				}
			},
			selectDay(item){
				this.toggleCalendar = false;
				this.selectDAY = this.calendarData.currentY +'-'+ this.calendarData.currentM+'-'+item['date'];	
			},
			//控制显示隐藏
			ToggleCalendar(){
				this.toggleCalendar = !this.toggleCalendar;
			}
		},
		mounted() {
			//控制日历的数据  和 操作对象
			var CalendarData = this.calendarData,
				CalendarAction = this.calendarAction,
				_this = this;
				
				
			CalendarData.DateObj = [];			
			CalendarAction.configDateArr = function(){
				for(var index = 0;index<42;index++){
					var tmpObj = {};
					CalendarData.DateObj.push(tmpObj)
				}
			}
			CalendarAction.configDateArr();		
				

			//one 判断当月所属的 年-月-日-星期
			CalendarData.currentY = new Date().getFullYear();
			CalendarData.currentM = new Date().getMonth() + 1;
			CalendarData.currentD = new Date().getDate();
			CalendarData.currentW = new Date().getDay();
			
			_this.selectDAY = this.calendarData.currentY +'-'+ this.calendarData.currentM+'-'+this.calendarData.currentD;

			//two 判断某年某月的第一天是周几
			CalendarAction.configWeek = function(year, month) {
				var tmp = year + '/' + month + '/' + '01';
				return new Date(tmp).getDay();
			};
			
			//three 判断这一个月是多少天
			CalendarAction.configDayNum = function(year, month) {
				if(((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
					/*闰年*/
					if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
						return 31;
					} else if(month == 2) {
						return 29;
					} else {
						return 30;
					}
				} else {
					/*平年*/
					if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
						return 31;
					} else if(month == 2) {
						return 28;
					} else {
						return 30;
					}
				}
			};

			// four 用来绘制日历
			CalendarAction.initial = function(whenDay, DayNum) {
				//four--(1)  年&&月
				
				var whenDay = CalendarAction.configWeek(CalendarData.currentY, CalendarData.currentM) == 0 ? 7 : CalendarAction.configWeek(CalendarData.currentY, CalendarData.currentM);
				var DayNum = CalendarAction.configDayNum(CalendarData.currentY, CalendarData.currentM);
				//four--(2)置空
				CalendarData.DateObj.map(function(v, i, arr) {
					CalendarData.DateObj[i]['date'] = '';
					_this.$set(CalendarData.DateObj,i,{"date":""});
				});
				
				//four--(1)绑定日期
				for(var j = 0; j < DayNum; j++) {
					CalendarData.DateObj[whenDay - 1 + j]['date'] = j + 1;
					_this.$set(CalendarData.DateObj,whenDay - 1 + j, {"date":j+1});
				}
			}
			CalendarAction.initial();
		},
		computed:{
			
		}

	}
</script>

<style lang="scss">
	.M-Calendar {
		width:98%,;
		height:100%;
		margin:0 auto;
		border:1px solid #00a1cb;
		box-sizing:border-box;
		.date-nav{
			height:40px;
			overflow:hidden;
			background:#00a1cb;
			text-align:center;
			line-height:40px;
			color:#FFFFFF;
			
			.date-year,.date-month{
				width:50%;
				height:100%;
				display:inline-block;
				float:left;
			}
		}
		
		
		ul {
			width:100%;
			padding:0;
			margin:0;
			overflow:hidden;
			li {
				padding:0 0;
				width:14%;
				height: 50px;
				list-style: none;
				float: left;
				color:#000000;
				background:#FFFFFF;
				line-height: 50px;
				text-align: center;
				font-size: 18px;
				box-sizing: content-box;
			}
		}
		
		.date-header {
			width:100%;
			overflow:hidden;
			background:#f5f5f5;
			div {
				opacity: 0.8;
				width:14%;
				height: 40px;
				display:block;
				box-sizing: content-box;
				float: left;
				text-align: center;
				color:#000000;
				line-height: 40px;
			}
		}
		
	}
</style>