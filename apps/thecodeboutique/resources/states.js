SC.mixin(Thecodeboutique, {
  statechart: Ki.Statechart.create({
    rootState: Ki.State.design({
      initialSubstate: 'FirstView',
      FirstView: Ki.State.design({

        enterState: function() {
					// State description: sets the mainPage.mainPane, //
					// delays the animated navigation bar, //
					// sets the tcb text to 0, //
					// sets the navigation buttons reversed //
  				console.log('enterState: mainPage.mainPane w/ animated navigation');
					Thecodeboutique.getPath('mainPage.mainPane').append();
					Thecodeboutique.mainPage.mainPane.slideInNav.iconOne.animate('rotateY',180,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.iconTwo.animate('rotateY',180,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.iconThree.animate('rotateY',180,{duration:1.4, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.tcbText.animate('opacity',0.0,{duration:1, timing:'ease-in-out'});
					// sets the content in the controller apps //
					// sets the profilePage.mainPane //
					// starts the imageArray //
					console.log('enterStatePreLoad: homePage.mainPane w/ slideShow array');
					Thecodeboutique.getPath('homePage.mainPane');
					Thecodeboutique.appsController.set('content', Thecodeboutique.apps);
					Thecodeboutique.homePage.mainPane.middleView.slideShow.imageArray();
					Thecodeboutique.homePage.mainPane.middleView.slideShowBack.imageArray();
					this.invokeLater(this.slideNavigationBarIn,1200);
				},
				
				slideNavigationBarIn:function() {
					// Function description: slides the navigation bar in and delays the flipping navigation buttons //
					console.log('    slideNavigationBarIn: slides the navigation bar in from the left');
					Thecodeboutique.mainPage.mainPane.slideInNav.animate('opacity',0.8,{duration:1, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.animate('width',.9999,{duration:1, timing:'ease-in-out'});
					this.invokeLater(this.adjustTCBTextOpacity,500);
				},
				
				adjustTCBTextOpacity:function() {
					// Function description: changes the opacity bar in and delays the flipping navigation buttons //
					console.log('    adjustTCBTextOpacity: changes the opacity of the TCB text from 0 to 1');
					Thecodeboutique.mainPage.mainPane.tcbText.animate('opacity',1.0,{duration:1, timing:'ease-in-out'});
					this.flipNavigationButtons();
				},
				
				flipNavigationButtons:function() {
					// Function description: flips the navigation buttons 180 degrees //
					console.log('    flipNavigationButtons: flips the navigation buttons 180 degrees');
					Thecodeboutique.mainPage.mainPane.slideInNav.iconOne.animate('rotateY',0,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.iconTwo.animate('rotateY',0,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.slideInNav.iconThree.animate('rotateY',0,{duration:1.4, timing:'ease-in-out'});
				},
				
				goToHomePage:function() {
					// Function description: exits the current state and goes to the profile views enter state //
					console.log('    goToHomePage: starts the enter state for the profile view');
					this.gotoState('Home');
				},
				goToProfile:function() { 
					this.gotoState('Profile');
				},
				goToContact:function()
				{
					this.gotoState('Contact');
				}
				
			}), 

// end of the first view //
// start of the home view //
			
			Home: Ki.State.design({
				
				enterState: function() {
						console.log('enterState: homePage.mainPane');
						Thecodeboutique.getPath('mainPage.mainPane').remove();
						Thecodeboutique.getPath('homePage.mainPane').append();
						Thecodeboutique.homePage.mainPane.middleView.animate('opacity',1,{duration:.5, timing:'ease-in-out'});
						this.invokeLater(this.scaleIn,500);
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
        	},
				
				scaleIn:function() {
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',1.3,{duration:.5, timing:'ease-in-out'},this.invokeLater(this.backDown,500));
					},
					
				backDown:function() {
					Thecodeboutique.homePage.mainPane.middleView.contentFrame.animate('width',650,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.animate('scale',1.0,{duration:.5, timing:'ease-in-out'});		
					Thecodeboutique.homePage.mainPane.bottomView.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.topView.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});						
				},
				
				exit:function() {
					this.gotoState('Exit');
				},
				
				goToProfile:function() { 
					this.gotoState('Profile');
				},
				goToContact:function()
				{
					this.gotoState('Contact');
				},
				
			}), 
			
// end of the home view //
// start of the portfolio view //

Profile: Ki.State.design({
				
				enterState: function() {
					console.log('Profile');
					Thecodeboutique.getPath('mainPage.mainPane').remove();
					Thecodeboutique.getPath('profilePage.mainPane').append();
					
					// Reset home page to its default state //
					Thecodeboutique.getPath('homePage.mainPane')
					Thecodeboutique.homePage.mainPane.middleView.animate('opacity',0.0,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.bottomView.animate('opacity',0.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.topView.animate('opacity',0.0,{duration:1.5, timing:'ease-in-out'});
					Thecodeboutique.homePage.mainPane.middleView.contentFrame.animate('width',0,{duration:.5, timing:'ease-in-out'});
        	},
					goBackToHome:function()
					{
						Thecodeboutique.getPath('profilePage.mainPane').remove();
						Thecodeboutique.getPath('homePage.mainPane').append();
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
						this.gotoState('Home');
					},
					goToContact:function()
					{
						Thecodeboutique.getPath('profilePage.mainPane').remove();
						Thecodeboutique.getPath('contactPage.mainPane').append();
						this.gotoState('Contact');
					}
			}),
			
			Contact: Ki.State.design({
				
				enterState: function() {
					console.log('Profile');
					Thecodeboutique.getPath('mainPage.mainPane').remove();
					Thecodeboutique.getPath('contactPage.mainPane').append();
					
        	},
					goBackToHome:function()
					{
						Thecodeboutique.getPath('contactPage.mainPane').remove();
						Thecodeboutique.getPath('homePage.mainPane').append();
						Thecodeboutique.homePage.mainPane.middleView.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
						this.gotoState('Home');
					},
					goToProfile:function() { 
						Thecodeboutique.getPath('contactPage.mainPane').remove();
						Thecodeboutique.getPath('profilePage.mainPane').append();
						this.gotoState('Profile');
					},
			})
    })
  
  })

});
