export function setDateService(angularModule){
    angularModule
    .service('dateSetService', function(){
        this.dateFormatRex = {
            '-' : /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
            '/' : /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/,
            'ko' : /[0-9]{4}년[0-9]{2}월[0-9]{2}일/,
            'koSpace' : /[0-9]{4}년 [0-9]{2}월 [0-9]{2}일/,
        }
        
        var now = new Date();
        var nowYear = now.getYear() + 1900;
        
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
        var setYear = function(obj){
            var yearArr = [];
            for(let i = nowYear; i>=1900; i--){
                yearArr.push(i);
            }
            obj.yearArr = yearArr;
            return obj;
        }
        
        /* 주어진 객체에 monthArr를 추가 */
        var setMonth = function(obj){
            var monthArr = [];
            for(let i = 1; i<=12; i++){
                monthArr.push(i);
            }
            obj.monthArr = monthArr;
            return obj;
        }
        
        /* 주어진 객체에 dayArr를 추가 */
        var setDay = function(obj, selectedYear, selectedMonth){
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

        // select form의 날짜 세팅
        this.setDateSelect = function(){
            var dateObj = {};
            setYear(dateObj);
            setMonth(dateObj);
            setDay(dateObj);
            
            var $year = $('.year');
            var $month = $('.month');
            var $day = $('.day');

            var createYearOptionEle = function(year){
                var op = document.createElement('option')
                op.value = year;
                op.innerText = year + '년';
                return op
            }

            var createMonthOptionEle = function(month){
                var op = document.createElement('option')
                op.value = month;
                month = month<10?'0'+month:month;
                op.innerText = month + '월';
                return op;
            }

            var createDayOptionEle = function(day){
                var op = document.createElement('option')
                op.value = day;
                day = day<10?'0'+day:day;
                op.innerText = day + '일';
                return op;
            }

            for(let year of dateObj.yearArr){
                $year.append(createYearOptionEle(year));
            }

            for(let month of dateObj.monthArr){
                $month.append(createMonthOptionEle(month));
            }

            for(let day of dateObj.dayArr){
                $day.append(createDayOptionEle(day));
            }
        }
    });
}