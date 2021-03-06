 //控制层 
app.controller('seckillGoodsController' ,function($scope,$controller,itemCatService,seckillGoodsService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
	$scope.updateAuditStatus=function(auditStatus){
		goodsService.updateAuditStatus(auditStatus,$scope.selectIds).success(function(response){
			if(response.success){
				$scope.reloadList();
				$scope.selectIds=[];
			}else{
				alert(response.message);
			}
			
		})
		
	}
	
	
	$scope.itemCat={};
	$scope.findAllItemCat=function(){
		itemCatService.findAll().success(function(response){
			for (var i = 0; i < response.length; i++) {
//				response[i]={"id":1,"name":"图书、音像、电子书刊","parentId":0,"typeId":35}
				$scope.itemCat[response[i].id]=response[i].name; //$scope.itemCat[1]="图书、音像、电子书刊";
			}
			
		})
	}
	
	//0：未审核  1：已审核  2:驳回
	$scope.status=["未审核","已审核","驳回"];
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		seckillGoodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		seckillGoodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
		$scope.updateStatus=function(status,info){
		var flag = window.confirm("确认"+info+"吗?");
		if(flag){
			seckillGoodsService.updateStatus(status,$scope.entity.id).success(function(response){
				if(response.success){
					$scope.reloadList();
				}else{
					alert(response.message);
				}
			})
		}
	}
    
});	
