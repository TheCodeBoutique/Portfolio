Thecodeboutique.contributionPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
		classNames:['base-view'],
    childViews: 'selectionView topView bottomBar'.w(),

		defaultResponder: Thecodeboutique.statechart,
		
		topView: SC.View.design({
					  layout: { top: 0, left: 0, right: 0, height: 125 },  
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
						}),//end of top toolBar..
						bottomBar: SC.ToolbarView.design({
									  layout: { bottom: 0, left: 0, right: 0, height: 45 },  
									  //childViews:' '.w(),
										}),
	
		  	selectionView: SC.SplitView.design({	
		    	layout: { left: 0, top: 125, right: 0, bottom: 32 },
		      layoutDirection: SC.LAYOUT_HORIZONTAL,
		      autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
		      defaultThickness: 0.8,

		     topLeftView: SC.View.design({
		     	layout: { top: 45, bottom: 32, width: 200 },
		      childViews: 'appView'.w(),

		appView: SC.ScrollView.design({
			    hasHorizontalScroller: NO,
			    layout: { top: 0, bottom: 0, left: 0, right:0},
			    //Here is the original list view, which is bound to the tasksController

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
			   })//end of scroll view
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