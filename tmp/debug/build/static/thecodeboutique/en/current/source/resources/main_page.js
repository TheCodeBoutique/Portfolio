// ==========================================================================
// Project:   Thecodeboutique - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

// This page describes the main user interface for your application.  
Thecodeboutique.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'TCB frame '.w(),

		defaultResponder: Thecodeboutique.statechart,
    
		TCB:SC.ImageView.design({
					//classNames:['sprout'],
					layout: { bottom:153,right:-174, height:400, width:415 },
					useImageQueue: NO, 
					value: '/static/thecodeboutique/en/current/resources/images/globe.png?1295160194',
		    }),
    frame: SC.View.design({
			classNames:['frame'],
			layout:{bottom:190, left:0, width:0,height:120},
			backgroundColor:'gray',
			childViews:'title iconOne iconTwo iconThree iconForth'.w(),
			
			title:SC.LabelView.design({
								classNames:['title-label'],
						    layout: {centerY:0,height:120, left: 0, width:400 },
								escapeHTML: NO,
						    value:'The Code Boutique'
						  	}),
			iconOne:SC.View.design({
				classNames:['icon-one'],
				layout:{right:440,centerY:0,height:100,width:100},
				backgroundColor:'black',
				mouseEntered: function(evt) {
			        this.animate('scale',1.07,{duration:.3,timing:'ease-in-out'});
			        return YES
			    },
					mouseExited: function() {
						this.animate('scale',1,{duration:.3,timing:'ease-in-out'});
		        return YES
						},
					mouseDown:function(evt){Thecodeboutique.statechart.sendEvent('goToProfilePage');},
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Profile',
							  	}),
			}),
			iconTwo:SC.View.design({
				classNames:['icon-one'],
				layout:{right:300,centerY:0,height:100,width:100},
				backgroundColor:'black',
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Contribution'
							  	}),
				
			}),
			iconThree:SC.View.design({
				classNames:['icon-one'],
				layout:{right:150,centerY:0,height:100,width:100},
				backgroundColor:'black',
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Contact'
							  	}),
			}),
			iconForth:SC.View.design({
				classNames:['icon-one'],
				layout:{right:10,centerY:0,height:100,width:100},
				backgroundColor:'black',
				childViews:'profile'.w(),
				profile:SC.LabelView.design({
									classNames:['landing-labels'],
							    layout: { bottom:0, height: 46, centerX: 0, width: 200 },
							    escapeHTML: NO,
							    value:'Unknown'
							  	}),
			}),
		}),//end of frame
  })

});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('thecodeboutique');