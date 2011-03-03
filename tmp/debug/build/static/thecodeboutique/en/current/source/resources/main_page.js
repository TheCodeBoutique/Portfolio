// ==========================================================================
// Project:   Thecodeboutique - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

// This page describes the main user interface for your application.  
Thecodeboutique.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
		classNames:['base-view'],
    childViews: 'globeImage tcbText slideInNav'.w(),
		defaultResponder: Thecodeboutique.statechart,
		
		globeImage: SC.ImageView.design({
			classNames:['globe-image'],
			layout: { bottom:153,right:-174, height:400, width:415 },
			useImageQueue: NO, 
		 }),
		
		tcbText: SC.LabelView.design({
		 classNames:['tcb-text'],
		 layout:{bottom:150, left:10, width:550,height:150},
		 escapeHTML: NO,
		 value:'The Code Boutique'
		}),
		
    slideInNav: SC.View.design({
			classNames:['sliding-navigation'],
			layout:{bottom:190, left:0, width:0,height:128},
			childViews:'homeButton portfolioButton contactButton'.w(),
			
			
<<<<<<< HEAD
			homeButton:SC.ButtonView.design({
				classNames: ['home-button-large'],
			  layout:{right:310,centerY:0,height:110,width:110},
		 		target: "Thecodeboutique.statechart",
				action: "goToHomePage",
			}),
			
			portfolioButton:SC.ButtonView.design({
				classNames: ['portfolio-button-large'],
			  layout:{right:160,centerY:0,height:110,width:110},
		 		target: "Thecodeboutique.statechart",
			  action: "goToPortfolio",
			}),
			
			contactButton:SC.ButtonView.design({
				classNames: ['contact-button-large'],
			  layout:{right:10,centerY:0,height:110,width:110},
		 		target: "Thecodeboutique.statechart",
			 	action: "goToContact",
=======
			/*profileButton:SC.ButtonView.design({
			  layout:{right:440,centerY:0,height:100,width:100},
			  title:  "Profile",
			}),*/
			
			iconOne:SC.View.design({
				classNames:['icon-one'],
				layout:{right:300,centerY:0,height:100,width:100},
				backgroundColor:'black',
				mouseEntered: function(evt) {
			   this.animate('scale',1.02,{duration:.3,timing:'ease-in-out'});
			   return YES
			  },
				mouseExited: function() {
					this.animate('scale',1,{duration:.3,timing:'ease-in-out'});
		      return YES
				},
				mouseDown:function(evt){Thecodeboutique.statechart.sendEvent('goToHomePage');},
				childViews:'profile'.w(),
				
				profile:SC.LabelView.design({
					classNames:['landing-labels'],
					layout: { bottom:6, height: 30, left: 30, width: 60 },
					escapeHTML: NO,
					value:'Home',
				}),
			}),
			
			iconTwo:SC.View.design({
				classNames:['icon-one'],
				layout:{right:150,centerY:0,height:100,width:100},
				backgroundColor:'black',
				mouseEntered: function(evt) {
			   this.animate('scale',1.02,{duration:.3,timing:'ease-in-out'});
			   return YES
			  },
				mouseExited: function() {
					this.animate('scale',1,{duration:.3,timing:'ease-in-out'});
		      return YES
				},
				mouseDown:function(evt){Thecodeboutique.statechart.sendEvent('goToProfile');},
				childViews:'profile'.w(),
				
				profile:SC.LabelView.design({
				 classNames:['landing-labels'],
				 layout: { bottom:6, height: 30, left: 20, width: 100 },
				 escapeHTML: NO,
				 value:'Profile'
				 }),
			}),
			
			iconThree:SC.View.design({
				classNames:['icon-one'],
				layout:{right:10,centerY:0,height:100,width:100},
				backgroundColor:'black',
				mouseEntered: function(evt) {
			   this.animate('scale',1.02,{duration:.3,timing:'ease-in-out'});
			   return YES
			  },
				mouseExited: function() {
					this.animate('scale',1,{duration:.3,timing:'ease-in-out'});
		      return YES
				},
				mouseDown:function(evt){Thecodeboutique.statechart.sendEvent('goToContact');},
				childViews:'profile'.w(),
				
				profile:SC.LabelView.design({
				classNames:['landing-labels'],
				layout: { bottom:6, height: 30, left:20, width: 100 },
				escapeHTML: NO,
				value:'Contact'
				}),
>>>>>>> 1376c7abf43c539c9f41b029f446bc78c92ab5fe
			}),
			
		}), //end of slideInNav
  
	})

});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('thecodeboutique');