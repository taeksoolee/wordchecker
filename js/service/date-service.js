var dateFormatRex = {
    '-' : /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
    '/' : /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/,
    'ko' : /[0-9]{4}년[0-9]{2}월[0-9]{2}일/,
    'koSpace' : /[0-9]{4}년 [0-9]{2}월 [0-9]{2}일/,
}

var now = new Date();
var nowYear = now.getYear() + 1900;
var nowMonth = now.getMonth()+1;
var nowDay = now.getDate();

// 윤년 여부를 검사하는 함수
function isLeaf(year) {
	var leaf = false;

	if(year % 4 == 0) {
		leaf = true;
		if(year % 100 == 0) leaf = false;
		if(year % 400 == 0) leaf = true;
	}
	return leaf;
}


/* 주어진 객체에 yearArr를 추가 */
export function setYear(obj){
    var yearArr = [];
    for(let i = nowYear; i>=1900; i--){
        yearArr.push(i);
    }
    obj.yearArr = yearArr;
    return obj;
}

/* 주어진 객체에 monthArr를 추가 */
export function setMonth(obj){
    var monthArr = [];
    for(let i = 1; i<=12; i++){
        monthArr.push(i);
    }
    obj.monthArr = monthArr;
    return obj;
}

/* 주어진 객체에 dayArr를 추가 */
export function setDay(obj, selectedYear, selectedMonth){
    var dayArr = [];
    if(typeof selectedYear != "undefined" && typeof selectedMonth != "undefined" ){
        //선택된 년, 월이 있을 경우
        var monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(isLeaf(selectedYear)) monthDay[1] = 29;
        for(let i = 1; i<=monthDay[selectedMonth-1]; i++){
            dayArr.push(i);
        }
    }else{
        //선택된 년, 월이 없을 경우
        for(let i = 1; i<=31; i++){
            dayArr.push(i);
        }
    }
    obj.dayArr = dayArr;
    return obj;
}