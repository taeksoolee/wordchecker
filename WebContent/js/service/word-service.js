export function setWordService(angularModule){
    angularModule
    .factory('defaultWordFactory', function(){
        return {
            wordList: [
                {
                    no: "0",
                    speling: "apple",
                    meaning: "사과"
                },
                {
                    no: "1",
                    speling: "banaban",
                    meaning: "바나나"
                },
                {
                    no: "2",
                    speling: "choco",
                    meaning: "초코"
                },
                {
                    no: "3",
                    speling: "hi",
                    meaning: "안녕"
                }
            ],
            word: {
                no: "3",
                speling: "hi",
                meaning: "안녕"
            }
        } 
    });
}