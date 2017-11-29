;(function(){
	
	var datepicker = window.datepicker;
	var monthData;
	
	datepicker.buildUi = function (year, month) {
		
		monthData = datepicker.getMonthData(year, month);
		
		var html = '<div class="ui-datepicker-header">' +
			'<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
			'<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
		'<span class="ui-datepicker-curr-month">'+ monthData.year + '-' + monthData.month +'</span>' +
		'</div>' +
		'<div class="ui-datepicker-body">' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<th>一</th>' +
						'<th>二</th>' +
						'<th>三</th>' +
						'<th>四</th>' +
						'<th>五</th>' +
						'<th>六</th>' +
						'<th>七</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' 
			
			for (var i=0; i<monthData.days.length; i++) {
				if(i%7 === 0) html += '<tr>';
				html += '<td data-date="'+ monthData.days[i].date +'">'+ monthData.days[i].showDate +'</td>';
				if(i%7 === 6) html += '</tr>';
					
			}
				
			html +='</tbody>' +
			 	'</table>' +
			  '</div>'
		
		return html;
	}
	
	var $wrapper;
	// 渲染数据
	datepicker.render = function(dir) {
		
		var year, month;
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}
		
		if(dir === 'prev'){
			month = ((month-1) <= 0)?12:--month;
			year = (month===12)?--year:year;
		}
		else if(dir === 'next'){
			month = ((month+1) > 12)?1: ++month;
			year = (month === 1)?++year:year;
		}
		var html = datepicker.buildUi(year, month);
		
		// <div class="ui-datepicker-wrapper">
		$wrapper = document.querySelector('.ui-datepicker-wrapper');
		if(!$wrapper) {
			$wrapper = document.createElement('div');
			$wrapper.className = 'ui-datepicker-wrapper';
			document.body.appendChild($wrapper);	
		}
		$wrapper.innerHTML = html;
				
	}
	
	datepicker.init = function(input) {
		
		datepicker.render();
		
		var $input = document.querySelector(input);
		var isOpen = false;
		
//		$input.addEventListener('focus', function() {
//			$wrapper.classList.add('ui-datepicker-wrapper-show');
//		});
//		$input.addEventListener('blur', function(){
//			$wrapper.classList.remove('ui-datepicker-wrapper-show');
//		});
		// 点击输入框显示隐藏，并重新计算显示位置
		$input.addEventListener('click', function(){
			if(isOpen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height  = $input.offsetHeight;
				$wrapper.style.top = top + height + 2 + 'px';
				$wrapper.style.left = left + 'px';
				isOpen = true;
			}
		});
		
		// 上一月下一月
		$wrapper.addEventListener('click', function(e) {
			var $target = e.target;
			if(!$target.classList.contains('ui-datepicker-btn')){
				return;
			}
			// 上一月
			else if($target.classList.contains('ui-datepicker-prev-btn')){
				datepicker.render('prev');
			}
			// 下一月
			else if($target.classList.contains('ui-datepicker-next-btn')) {
				datepicker.render('next');
			}
		})
		
		// 点击日期
		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			
			if($target.tagName.toLocaleLowerCase() !== 'td') return;
			
			var date = new Date(monthData.year, monthData.month-1, $target.dataset.date);
			
			$input.value = formatDate(date);
			
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
			isOpen = false;
		});
		
	}
	// 格式化数据
	function formatDate (date) {
		var year = date.getFullYear();
		var month = checkZero(date.getMonth() + 1);
		var date = checkZero(date.getDate());
		
		return year + '-' + month + '-' + date;
		
	}
	// 补零函数
	function checkZero (data) {
		if( data < 10) {
			data = '0' + data;
		}
		return data;
	}
	
})();
