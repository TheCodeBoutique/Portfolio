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
			}),
			
		}), //end of slideInNav
  
	})

});
