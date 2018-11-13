var mind = angular.module('mind',['ngRoute']);

mind.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/',{templateUrl:"html/mind/mindContent.html",controller:MindController})
}]);


function MindController($scope,$http,$window,$rootScope) {

    var jm = null;
    var mapid = null;

    //新建一个知识图谱
    $scope.open_empty = function () {
        var mind = {'data':{'id':'20180725213742','topic':'秋宁','color':'浅紫','children':[{'id':'2018625213717','topic':'可爱','color':'天蓝'},{'id':'2018625213713','topic':'美','color':'郁金色'}]},'meta':{'author':'hizzgdev@163.com','name':'jsMindremote','version':'0.2'},'format':'node_tree'};
        var mind1 = {'data':{id:'21c039f9231e455c90f880732df02e5a',topic:'116',parentid:'00100',color:'null'},'meta':{'author':'hizzgdev@163.com','name':'jsMindremote','version':'0.2'},'format':'node_tree'};
        var options = {
            container : 'jsmind_container',
            theme : 'greensea',
            editable : true
        }
        jm = new jsMind(options);
        jm.show(mind1);
    }

    $scope.open_empty();

    //新建图谱
    $scope.newMap = function () {

        $.messager.prompt('新建图谱','请输入图谱名称',function (r) {
            if (r) {

                $http.post('/mindmap/newMap?nodeName='+r).then(function (response) {

                    var status = response.data.data.status;

                    if (status == 200) {
                        var datas = eval('('+ response.data.data.datas +')');
                        mapid = response.data.data.mapid;
                        var mind1 = {'data':{id:'21c039f9231e455c90f880732df02e5a',topic:'116',parentid:'00100',color:'null'},'meta':{'author':'hizzgdev@163.com','name':'jsMindremote','version':'0.2'},'format':'node_tree'};
                        jm.show(datas);
                    } else if (status == 201) {
                        alert(response.data.data.message);
                    }

                })
            }
        })
    }

    $scope.newMap();

}