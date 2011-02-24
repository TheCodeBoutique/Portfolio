Thecodeboutique.profilePage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'frame bottomFrame topFrame'.w(),

		defaultResponder: Thecodeboutique.statechart,
    
    frame:SC.View.design({
			classNames:['profile-frame'],
			layout:{top:120, height:300},
			backgroundColor:'gray',
			childViews:'contentFrame'.w(),
			
			contentFrame:SC.View.design({
				layout:{top:55, height:218,left:20,width:0},
				//backgroundColor:'black',
				childViews:'appContent'.w(),
				
				appContent:SC.LabelView.design({
							    layout: { top:5, height:130, left:10, width:400 },
				          escapeHTML: NO,
							    isTextSelectable: YES,
							    valueBinding:'Thecodeboutique.contentController.nowShowing'
							  	}),
						
			}),
			
		}),//end of the frame
		topFrame:SC.View.design({
			classNames:['bottom-frame'],
			layout:{top:0,height:160},
			backgroundColor:'silver',
			childViews:'logo button1 button2 button3'.w(),
			
			logo:SC.ImageView.design({
						//classNames:['sprout'],
						layout: { left:20,top:20, height:100, width: 100 },
						useImageQueue: NO, 
						value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/globe.png',
			    }),
			button1:SC.ButtonView.design({
					        layout: { top:40, height: 44, left: 150, width: 125 },
					        title:  "Profile",
									controlSize: SC.JUMBO_CONTROL_SIZE,
									//target: "ScCommunityMarketing.betaController",
									//action: "addTask",
									//isDefault: YES
					      }),
									button2:SC.ButtonView.design({
											        layout: { top:40, height: 44, left: 288, width: 125 },
											        title:  "Profile",
															controlSize: SC.JUMBO_CONTROL_SIZE,
															//target: "ScCommunityMarketing.betaController",
															//action: "addTask",
															//isDefault: YES
											      }),
															button3:SC.ButtonView.design({
																	        layout: { top:40, height: 44, left: 426, width: 125 },
																	        title:  "Profile",
																					controlSize: SC.JUMBO_CONTROL_SIZE,
																					//target: "ScCommunityMarketing.betaController",
																					//action: "addTask",
																					//isDefault: YES
																	      }),
			}),
			
		bottomFrame: SC.View.design({
			classNames:['bottom-frame'],
			layout:{bottom:0,height:200},
			backgroundColor:'silver',
			childViews:'image1 image2 image3 image4'.w(),
			
			image1:SC.ImageView.design({
						//classNames:['sprout'],
						layout: { left:100, bottom:10, height:134, width: 231 },
						useImageQueue: NO, 
						value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/One-dark.png',
			    }),
					image2:SC.ImageView.design({
								//classNames:['sprout'],
								layout: { left:354, bottom:10, height:134, width: 231 },
								useImageQueue: NO, 
								value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/One-light.png',
					    }),
							image3:SC.ImageView.design({
										//classNames:['sprout'],
										layout: { right:100, bottom:10, height:134, width: 231 },
										useImageQueue: NO, 
										value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/Two-Dark.png',
							    }),
									image4:SC.ImageView.design({
												//classNames:['sprout'],
												layout: { right:354, bottom:10, height:134, width: 231 },
												useImageQueue: NO, 
												value: '/static/thecodeboutique/en/3a8a13bbde339403cef375ff46cfe516b94b2a05/resources/images/Two-Light.png',
									    }),
			
		})
  })

});