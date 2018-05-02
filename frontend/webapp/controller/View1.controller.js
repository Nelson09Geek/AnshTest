sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("AnshTask.controller.View1", {

	onAfterRendering: function() {
		var that=this;
		that.ShowBJobs();
	
	},
	ShowBJobs:function()
	{
		var BJobsTable=sap.ui.getCore().byId("BJobsTable");
		

			$.ajax({
				url:'https://d69dc1df.ngrok.io/getTasks',
				type: 'POST',
				//data:jsonData,
				dataType: "json",
				// headers:{'X-Token-Header':token.token,"user_name":token.user_name,"customer_code":token.customer_code},
				success: function(data) {
					console.log(data);

								if(BJobsTable.getModel("BJobsTableModel"))
								{
									var BJobsTableModel=BJobsTable.getModel("BJobsTableModel");
									BJobsTableModel.setProperty("/modelData",data);
							        BJobsTableModel.refresh();
							        BJobsTable.setBusy(false);
								}
								else
								{
										var BJobsTableModel = new sap.ui.model.json.JSONModel({modelData: data});
										BJobsTable.setModel(BJobsTableModel,"BJobsTableModel");
										BJobsTable.setBusy(false);
								}

				},
				error:function(err)
				{
					//that._dialog.close();
					//	oTable.setBusy(false);
					// jQuery.sap.clearDelayedCall(_timeout);
				

						      	    	var bCompact = !!$().closest(".sapUiSizeCompact").length;
										sap.m.MessageBox.alert(
											"Technical Error... Please contact Admin");
				
						      	    	//sap.ui.commons.MessageBox.alert("Technical Error... Please contact Admin");
			}
		});
	},
	
	addTask:function()
	{
		var that=this;
		 var x=new sap.m.VBox({
						items:[
			                		new sap.m.Label(),
									new sap.m.Label({
									 text:"Task Name",
									 labelFor:"TName",
									  width:"26em"
									}),
									new sap.m.Input({
										id:"TName",
										type:"Text",
										width:"26em",
										placeholder:"Enter Task Name"
									}),
									new sap.m.Label(),
									new sap.m.Label({
									 text:"Task Description",
									 labelFor:"TDesc",
									  width:"26em"
									}),
									new sap.m.Input({
										id:"TDesc",
										type:"Text",
										width:"26em",
										placeholder:"Enter Task Description"
									}),
									new sap.m.Label(),
									new sap.m.Label({
									 text:"Criticality",
									 labelFor:"Tcritical",
									  width:"26em"
									}),
									new sap.m.ComboBox('Tcritical',{
										//value:"Glacier Tier",
										width:"26rem",
										items: [
													new sap.ui.core.ListItem({text: "Critical",key: "Critical"}),
													new sap.ui.core.ListItem({text: "Medium",key: "Medium"}),
													new sap.ui.core.ListItem({text: "Low",key: "Low"})    
													
												]
							        }).setSelectedKey("Critical")
		]});
		var First_Dialog_Opener= new sap.m.Dialog({
				                title: "Create Task",
				                type: 'Standard',
				                draggable: true,
				              //  contentWidth :'850px',
				               // contentHeight :'950px',
			                	content: [
										x
			                	],
			                
				                beginButton: new sap.m.Button({
					                    text: 'Next',
					                    press: function (evt) {
											//////////////////////////////
											var flag=0;

											var jsonData={};
											jsonData.name=sap.ui.getCore().byId("TName").getValue();
											jsonData.description=sap.ui.getCore().byId("TDesc").getValue();
											jsonData.task_urgency=sap.ui.getCore().byId("Tcritical").getSelectedKey();
											$.ajax({
											url:'https://d69dc1df.ngrok.io/addTasks',
											type: 'POST',
											data:jsonData,
											dataType: "json",
											// headers:{'X-Token-Header':token.token,"user_name":token.user_name,"customer_code":token.customer_code},
											success: function(data) {
												console.log(data);
												if(data.flag=="success")
												{
													sap.m.MessageBox.success("Task has been added successfully");
												
														First_Dialog_Opener.close();
														that.ShowBJobs();
												}
												else if(data.flag=="error")
												{
													sap.m.MessageBox.success("Error While Adding Task.Try again");
												}
												
											},
											error:function(err)
											{
													
												sap.m.MessageBox.alert(
																				"Technical Error... Please contact Admin");
													
															      	    	//sap.ui.commons.MessageBox.alert("Technical Error... Please contact Admin");
											}
											});
										
					                    }

								 }),
								 endButton: new sap.m.Button({
					                        text: 'Close',
					                        press: function () {
					                    	First_Dialog_Opener.close();

					                         }
			                	    }),
				                 afterClose: function() {
									
					                    First_Dialog_Opener.destroy();
				                    }


		      });
			
		   	First_Dialog_Opener.open();
	},
	FetchTable:function(key){
		
		var oTable=sap.ui.getCore().byId("BJobsTable");
	var that=this;
		if(oTable.getSelectedItems().length==1)	
		{
					var task_id;
				  var status;
					jQuery.each(oTable.getSelectedItems(),function(id,value)
					{
						
							task_id=value.getCells()[0].getText();
							status=value.getCells()[3].getText();
							 
						
					});
			
					if(key=="delete")
					{
							var jsonData={};
											jsonData.id=task_id;
											
											$.ajax({
											url:'https://d69dc1df.ngrok.io/deleteTasks',
											type: 'POST',
											data:jsonData,
											dataType: "json",
											// headers:{'X-Token-Header':token.token,"user_name":token.user_name,"customer_code":token.customer_code},
											success: function(data) {
												console.log(data);
												if(data.flag=="success")
												{
													sap.m.MessageBox.success("Task has been deleted successfully");
													that.ShowBJobs();
												}
												else if(data.flag=="error")
												{
													sap.m.MessageBox.success("Error While Deleting Task.Try again");
												}
												
											},
											error:function(err)
											{
													
												sap.m.MessageBox.alert(
																				"Technical Error... Please contact Admin");
													
															      	    	//sap.ui.commons.MessageBox.alert("Technical Error... Please contact Admin");
											}
											});
						
					}
					else if(key=="change")
					{
						
						
						if(status=="Completed")
						{
							
							sap.m.MessageBox.error("Its already Completed.You can not modify it");
						}
						else
						{
							////////////////////////////////////
							
							
		 var x=new sap.m.VBox({
						items:[
			                	
									new sap.m.Label(),
									new sap.m.Label({
									 text:"Status",
									 labelFor:"Tstatus",
									  width:"26em"
									}),
									new sap.m.ComboBox('Tstatus',{
										//value:"Glacier Tier",
										width:"26rem",
										items: [
													new sap.ui.core.ListItem({text: "Completed",key: "Completed"}),
												
												]
							        }).setSelectedKey("Completed")
							]});
								var First_Dialog_Opener= new sap.m.Dialog({
				                title: "Create Task",
				                type: 'Standard',
				                draggable: true,
				              //  contentWidth :'850px',
				               // contentHeight :'950px',
			                	content: [
										x
			                	],
			                
				                beginButton: new sap.m.Button({
					                    text: 'Next',
					                    press: function (evt) {
											//////////////////////////////
											var jsonData={};
											var task_status=sap.ui.getCore().byId("Tstatus").getSelectedKey();
											jsonData.id=task_id;
											jsonData.task_status=task_status;
											$.ajax({
											url:'https://d69dc1df.ngrok.io/updateTasks',
											type: 'POST',
											data:jsonData,
											dataType: "json",
											// headers:{'X-Token-Header':token.token,"user_name":token.user_name,"customer_code":token.customer_code},
											success: function(data) {
												console.log(data);
												if(data.flag=="success")
												{
													sap.m.MessageBox.success("Task has been updated successfully");
													First_Dialog_Opener.close();
													that.ShowBJobs();
												}
												else if(data.flag=="error")
												{
													sap.m.MessageBox.success("Error While updating Task.Try again");
												}
												
											},
											error:function(err)
											{
													
												sap.m.MessageBox.alert(
																				"Technical Error... Please contact Admin");
													
															      	    	//sap.ui.commons.MessageBox.alert("Technical Error... Please contact Admin");
											}
											});
										
					                    }

								 }),
								 endButton: new sap.m.Button({
					                        text: 'Close',
					                        press: function () {
					                    	First_Dialog_Opener.close();
															
					                       }
			                	    }),
				                 afterClose: function() {
									
					                    First_Dialog_Opener.destroy();
				                    }


		      });
	First_Dialog_Opener.open();
								///////////////////////////////////
							
						}
					}
					
		}
		else
		{
				sap.m.MessageBox.error("Please Select Only One Task");
		}
	}

	});
});