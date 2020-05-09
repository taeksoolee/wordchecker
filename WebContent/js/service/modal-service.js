export function setModalService(angularModule){
    angularModule
    .factory('defualtModalFactory', function(){
        return {
            confirm: {
                "title": "",
                "content": "",
                "callback": function(){}
            },
            alert: {
                "content1": "",
                "linkComment": "",
                "linkUrl": "",
                "content2": ""
            }
        } 
    });
}

