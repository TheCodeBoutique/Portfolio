Thecodeboutique.profilePage = SC.Page.design({

  mainPane: SC.MainPane.design({
		classNames:['base-view'],
    childViews: 'topView topBar middleView bottomBar'.w(),
		defaultResponder: Thecodeboutique.statechart,
		
		topView: SC.View.design({
			classNames:['profile-top-base-view'],
			layout: { top: 0, left: 0, right: 0, height: 120 },  
			childViews:'logo homeButton contributionButton contactButton'.w(),
    	
			logo:SC.ImageView.design({
		 		layout: { left:20,top:20, height:100, width: 100 },
		 		useImageQueue: NO, 
		 		value: sc_static('/images/globe.png'),
			}),
			
			homeButton:SC.ButtonView.design({
			 layout: { top:40, height: 40, left: 150, width: 106 },
			 title:  "Home",
			 target: "Thecodeboutique.statechart",
			 action: "goBackToHome",
			}),
			
			contributionButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 288, width: 106 },
			 	title:  "Portfolio",
			  target: "Thecodeboutique.statechart",
			  action: "goToContribution",
			 }),
			 
			contactButton:SC.ButtonView.design({
				layout: { top:40, height: 40, left: 426, width: 106 },
				title:  "Contact",
			 	target: "Thecodeboutique.statechart",
			 	action: "goToContact",
			}),
			
		}),
		
		topBar: SC.ToolbarView.design({
			classNames: ['toolbar'],
			layout: { top: 120, left: 0, right: 0, height: 37 },
		}),
		
		bottomBar: SC.ToolbarView.design({
			classNames: ['toolbar'],
			layout: { bottom: 0, left: 0, right: 0, height: 37 },
		}),
	
		middleView: SC.SplitView.design({	
	 		layout: { left: 0, top: 125, right: 0, bottom: 32 },
		  layoutDirection: SC.LAYOUT_HORIZONTAL,
		  autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
		  defaultThickness: 0.8,

		  topLeftView: SC.View.design({
		  	classNames: ['profile-leftView'],
				layout: { top: 205, bottom: 32, width: 200 },
		    childViews: 'appView topListView middleListView bottomListView'.w(),
		
				topListView: SC.View.design({
					classNames: ['profile-listview-top'],
					layout: { height: 18, width: 239, top: 50, left: 2 },
				}),
				
				middleListView: SC.View.design({
					classNames: ['profile-listview-middle'],
					layout: { top: 68, bottom: 45, width: 239, left: 2 },
				}),
				
				bottomListView: SC.View.design({
					classNames: ['profile-listview-bottom'],
					layout: { height: 18, width: 242, bottom: 27, left: 1 },
				}),

				appView: SC.ScrollView.design({
					classNames: ['profile-appView'],
			  	hasHorizontalScroller: NO,
			    layout: { top: 70, bottom: 0, left: 10, right: 10},
			    
					contentView: SC.ListView.design({
			  		contentValueKey: "name",
						contentBinding: "Thecodeboutique.appsController.arrangedObjects",
						selectionBinding: "Thecodeboutique.appsController.selection",
			     	rowHeight: 50,
						rowSpacing: 2,
						exampleView:Thecodeboutique.appList,
						contentIconKey: "appImage",
						hasContentIcon:  YES,
          	escapeHTML: NO,	
			  	})
			  
				})
		   
			}),//end of top left view

		//This is use so that no matter what that the signup image is always going to have a 400 max size
		 topLeftMaxThickness: 250,

		        //canCollapseViews: YES,
		        dividerView: SC.SplitDividerView.design({layout: {}}),

				//This is the right side of the site we can use this to keep switching out pages
		 bottomRightView:SC.ContainerView.design({
				nowShowingBinding:'Thecodeboutique.appController.nowShowing',
				layout: { centerX:0, top:0, bottom:0, centerY:0 }
			}), 
		 }),
	})	
	});