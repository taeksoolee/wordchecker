import { setYear, setMonth, setDay } from "../service/date-service.js";

export function searchMemberController(angularModule){
    angularModule
    .controller('SearchMemberController', function($scope, utils){
        utils.navCtrlFuncs.closeNav();

        // select form의 날짜 세팅
        var dateObj = {};
        setYear(dateObj);
        setMonth(dateObj);
        setDay(dateObj);
        
        for(let year of dateObj.yearArr){
            $('.year').append((function(){
                var op = document.createElement('option')
                op.value = year;
                op.innerText = year;
                return op;
            })());
        }

        for(let month of dateObj.monthArr){
            $('.month').append((function(){
                var op = document.createElement('option')
                op.value = month;
                op.innerText = month;
                return op;
            })());
        }

        for(let day of dateObj.dayArr){
            $('.day').append((function(){
                var op = document.createElement('option')
                op.value = day;
                op.innerText = day;
                return op;
            })());
        }
        

        
    })
};