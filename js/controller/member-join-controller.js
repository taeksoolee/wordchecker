export function joinMemberController(angularModule){
    angularModule
    .controller('JoinMemberController', function($scope, utils){
        utils.navCtrlFuncs.closeNav();
        $scope.joinForm = {
            "email":"",
            "password":"",
            "rePassword":"",
            "nickname":"",
            "birthday":""
        };
        

        $(function() {
            $('input[name="birthday"]').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format('YYYY'),10),
                yearSuffix: '년',
                locale :{
                    format: 'YYYY년 MM월 DD일',
                    
                    daysOfWeek: [
                        "월",
                        "화",
                        "수",
                        "목",
                        "금",
                        "토",
                        "일"
                    ],
                    monthNames: [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12"
                    ],

                },
                
            },
            function(start, end, label) {
                $scope.joinForm.birthday = start;
            })
        });

        $scope.join = function(){
            console.log($scope.joinForm);
        }
    })
}