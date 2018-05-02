sap.ui.jsview("AnshTask.view.View1", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.View1
	 */
	getControllerName: function() {
		return "AnshTask.controller.View1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.View1
	 */
	createContent: function(oController) {
		
		///////////////////////////////Table///////////////////////////////////////////////
		//Jobs Screen
	var BJobsTableHeader=new sap.m.Table(
    {
                					showNoData:false,
                					growing:true,
    								growingThreshold:4,
    								growingTriggerText:true,
                				    mode:"MultiSelect",
                				//	inset:true,
                				//	rowHeight:"10%",
                					columns:[
                							new sap.m.Column({
                					        	 //hAlign:"Left",
                			            //          width:"4.7em",
                				           //      minScreenWidth:"Tablet",
                				                
                				           //      demandPopin:true,
                					        	 header : new sap.m.Text({
                			                            text : "Task Id "
                			                        })
                					        		 
                					         }),
                					         new sap.m.Column({
                					        	 //hAlign:"Left",
                			            //          width:"4.7em",
                				           //      minScreenWidth:"Tablet",
                				                
                				           //      demandPopin:true,
                					        	 header : new sap.m.Text({
                			                            text : "Task Name "
                			                        })
                					        		 
                					         }),
                					         new sap.m.Column({
                					        	 //hAlign:"Left",
                			            //          width:"4.7em",
                				           //      minScreenWidth:"Tablet",
                				                
                				           //      demandPopin:true,
                					        	 header : new sap.m.Text({
                			                            text : "Task Description "
                			                        })
                					        		 
                					         }),
                					           new sap.m.Column({
                					        	 //hAlign:"Left",
                			            //          width:"2.7em",
                				           //      minScreenWidth:"Tablet",
                				                
                				           //      demandPopin:true,
                					        	 header : new sap.m.Text({
                			                            text : "Task Status"
                			                        })
                					        		 
                					         }),
                					         new sap.m.Column({
                					        	 //hAlign:"Left",
                			            //          width:"2.7em",
                				           //      minScreenWidth:"Tablet",
                				                
                				           //      demandPopin:true,
                					        	 header : new sap.m.Text({
                			                            text : "Creation Date"
                			                        })
                					        		 
                					         }),
                					           new sap.m.Column({
                					        	 //hAlign:"Left",
                			            //          width:"2.7em",
                				           //      minScreenWidth:"Tablet",
                				                
                				           //      demandPopin:true,
                					        	 header : new sap.m.Text({
                			                            text : "Task Criticality"
                			                        })
                					        		 
                					         })
                					       
                					         ]});
	
	var BJobsTable=new sap.m.Table("BJobsTable",
    {
                				    mode:"MultiSelect",
                					//inset:true,
                				//	rowHeight:"10%",
                					columns:[
                					         
                					         new sap.m.Column({ }),
                					         new sap.m.Column({ }),
                					           new sap.m.Column( {}),
                					           new sap.m.Column({ }),
                					         new sap.m.Column({ }),
                					         new sap.m.Column({ }),
                					        
                					         
                					         ]});
    var BJobsTableTemplate=new sap.m.ColumnListItem({
                				type:sap.m.ListType.Active,
                					press:function(evt)
								{
									//oController.ShowLogs(evt);
									oController.ShowJobDetails(evt);
								},
                				cells:[
                						new sap.m.ObjectIdentifier(
                				       {
                				      	text:"{BJobsTableModel>_id}"
                				       }),
                						new sap.m.ObjectIdentifier(
                				       {
                				      	text:"{BJobsTableModel>name}"
                				       }),
                				       new sap.m.ObjectIdentifier(
                				       {
                				      	text:"{BJobsTableModel>description}"
                				       }),
                				        new sap.m.ObjectStatus(
								       {
								      	text:"{BJobsTableModel>task_status}",
								      	state:"{BJobsTableModel>task_status_color}"
								      	
								       }).addStyleClass("sapUiSmallMarginBottom"),
                				       new sap.m.ObjectIdentifier(
                				       {
                				      	text:"{BJobsTableModel>creation_date}" 
                				      	
                				       }),
                				     
                				       
                				        new sap.m.ObjectStatus(
								       {
								      	text:"{BJobsTableModel>task_urgency}",
								      	state:"{BJobsTableModel>task_urgency_color}"
								      	
								       }).addStyleClass("sapUiSmallMarginBottom")
								 
           //     				        new sap.m.ProgressIndicator({
											// //class:"sapUiSmallMarginBottom",
											// percentValue:"{BJobsTableModel>job_execution_progress_percentage}",
											// displayValue:"{BJobsTableModel>job_execution_progress_percentage}"+"%",
											// showValue:true,
											// state:"{BJobsTableModel>job_status_color}" 
           //     				       })
                			    	]
                				
                			});
    BJobsTable.bindAggregation("items","BJobsTableModel>/modelData",BJobsTableTemplate);
	var BJobsTableTBHeader = new sap.m.OverflowToolbar({
        active: true,
        design : sap.m.ToolbarDesign.Solid,
		content :[
		    
		    new sap.m.Button({
			    icon:"sap-icon://synchronize",
			    class:" sapThemeHighlight-asBackgroundColor",
			    press : function() {
					oController.ShowBJobs();
               	
			}}).setTooltip(new sap.ui.commons.RichTooltip({title: "Quick Help",text:"Rfresh the table"}).setAtPosition("begin bottom")),
			
 			new sap.m.ToolbarSpacer(),
		    
		    new sap.m.Label({
							text : "Task List"
						}),
			
			new sap.m.ToolbarSpacer(),
			new sap.m.Button({
 			 icon:"sap-icon://add",
 			 press:function(){
 			 	  oController.addTask();
 			}
 			}).setTooltip(new sap.ui.commons.RichTooltip({title: "Quick Help",text:"Add the Task"}).setAtPosition("begin bottom")),

			new sap.m.Button({
 			 icon:"sap-icon://delete",
 			 press:function(){
 			 	  oController.FetchTable("delete");
 			}
 			}).setTooltip(new sap.ui.commons.RichTooltip({title: "Quick Help",text:"Delete the Task"}).setAtPosition("begin bottom")),

			new sap.m.Button({
 			 icon:"sap-icon://work-history",
 			 press:function(){
 			 	  oController.FetchTable("change");
 				}
 			}).setTooltip(new sap.ui.commons.RichTooltip({title: "Quick Help",text:"Change the Status"}).setAtPosition("begin bottom")),


 			        	    
	
			]
						
	});
	var oScrollContainer = new sap.m.ScrollContainer({height:"650px", vertical:true, focusable: true, content:[BJobsTable]});
	            
     var BJobslayout=new sap.ui.layout.VerticalLayout({width:"100%",
			content:[
				BJobsTableTBHeader,
				BJobsTableHeader,
				oScrollContainer
			]
	});
		//////////////////////////////////////////////////////////////////////////////
		
		///////////////Toolbar////////////////////////
		var customHeader=new sap.tnt.ToolHeader({
            content:[
            new sap.m.Button({
                        icon:"sap-icon://paging",
                        type:"Transparent",
                        class:" sapThemeHighlight-asBackgroundColor",
                        press : function(evt) {
                           //sap.demo.common1.menuPressed(evt,that);
                        }}),
                      
                new sap.m.Button({
                        icon:"sap-icon://home",
                        type:"Transparent",
                        class:" sapThemeHighlight-asBackgroundColor",
                        press : function() {
                            //  oDialog.open()
                             //var app = sap.ui.getCore().byId("myApp");
                             //    app.to("idlogin3");        
                        }}),
                new sap.m.Button({
                        icon:"images/weather.png",
                        type:"Transparent",
                        class:" sapThemeHighlight-asBackgroundColor",
                        press : function() {
                            //  oDialog.open()
                             //var app = sap.ui.getCore().byId("myApp");
                             //    app.to("idlogin3");      
                        }}),
               new sap.m.ToolbarSpacer(),
               new sap.m.Label({
                            text : "Ansh TODO Application"
                        }),
              new sap.m.ToolbarSpacer(),
             
                        new sap.m.MenuButton({
                            text:"Nelson Kalariya",
                            menu: new sap.m.Menu({
                                 itemSelected:function(oEvent)
                                 {
                                        var oItem = oEvent.getParameter("item"),
                                            sItemPath = "";
                                        while (oItem instanceof sap.m.MenuItem) {
                                            sItemPath = oItem.getText() + " > " + sItemPath;
                                            oItem = oItem.getParent();
                                        }
                        
                                        sItemPath = sItemPath.substr(0, sItemPath.lastIndexOf(" > "));
                                        // sap.m.MessageToast.show("Action triggered on item: " + sItemPath);
                                    
                                        if(sItemPath=="Logout")
                                        {
                                            
                                           // sap.demo.common.logout("0");
                                        }
                                        else if(sItemPath=="Help")
                                        {
                                        	//sap.demo.common.showHelp();
                                        }
                                        else if(sItemPath=="Profile")
                                        {
                                        //	sap.demo.common1.showProfile();
                                        }
                                 },
                                 items:[new sap.m.MenuItem({
                                     text:"Profile",
                                     icon:"sap-icon://customer"
                                     }),
                                     new sap.m.MenuItem({
                                         text:"Help",
                                         icon:"sap-icon://sys-help"
                                         }),
                                         new sap.m.MenuItem({
                                             text:"Logout",
                                             icon:"sap-icon://log"
                                            
                                             })
                                 ]
                            })
                        })
            
          ]
        });
		/////////////////////////////////////////////
		
		var oPage = new sap.m.Page({
			// title: "{i18n>title}",
			customHeader:customHeader,
			content: [BJobslayout]
		});

		var app = new sap.m.App("myApp", {
			initialPage: "oPage"
		});
		app.addPage(oPage);
		return app;
	}

});