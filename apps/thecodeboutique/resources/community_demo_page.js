// ==========================================================================
// Project:   Thecodeboutique.communityDemoPage
// Copyright: ©2011 The Code Boutique
// Engineered by Chad Eubanks and Kyle Carriedo
// ==========================================================================
/*globals Thecodeboutique */

// This page describes a part of the interface for your application.
Thecodeboutique.communityDemoPage = SC.Page.design({

  mainPane: SC.MainPane.design({ 
		classNames: ['community-demo'],
	  childViews: 'labelView communityBackButton'.w(),

	  labelView: SC.LabelView.design({ 
	  	layout: { centerX: 0, centerY: 0, width: 200, height: 18 },
	    textAlign: SC.ALIGN_CENTER,
	   	tagName: "h1",
	    value: "Welcome to SproutCore!"
		}),
		
		communityBackButton:SC.ButtonView.design({
		 layout: { centerX: -200, centerY: 0, height: 44, width: 106 },
		 title:  "Home",
		 target: "Thecodeboutique.statechart",
		 action: "goBackToPortfolio",
		}),
		   
	})  
});