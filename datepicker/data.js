(function(){
	var datepicker = {};
	
	datepicker.getMonthData = function (year, month) {
	
		var ret = [];
		
		// 设置默认年月
		if(!year || !month){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		
		// 获取当月第一天
		var firstDay = new Date(year, month-1, 1);
		var firstDayWeekDay = firstDay.getDay(); // 获取当月第一天是星期几
		if(firstDayWeekDay === 0) firstDayWeekDay = 7; // 如果是0代表是星期天
		
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;
		
		// 获取上个月最后一天
		var lastDayOfLastMonth = new Date(year, month-1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); // 获取上个月最后一天的具体数值
		
		// 获取当前月的最后一天
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate(); // 获取当前月最后一天的具体数值
		
		// 获取第一行上个月所占的天数
		var preMonthDayCount = firstDayWeekDay - 1;
		
		for (var i=0; i<7*6; i++) {
			var date = i - preMonthDayCount + 1;
			var showDate = date;
			var thisMonth = month;
			
			// 上一月
			if (date <= 0) {
				thisMonth = month - 1;
				showDate =  lastDateOfLastMonth + date;
			}
			// 下一月
			else if (date > lastDate) {
				thisMonth = month + 1;
				showDate = date - lastDate;
			}
			
			if (thisMonth === 0) thisMonth = 12;
			if (thisMonth === 13) thisMonth = 1;
			
			ret.push({
				date: date,
				month: thisMonth,
				showDate: showDate
			});
			
		}
		
		return {
				year: year,
				month: month,
				days: ret
			}
	
	}
	
	window.datepicker = datepicker;
})();