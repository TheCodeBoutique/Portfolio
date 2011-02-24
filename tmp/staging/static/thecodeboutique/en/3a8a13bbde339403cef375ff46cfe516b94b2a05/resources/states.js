SC.mixin(Thecodeboutique, {
  
  statechart: Ki.Statechart.create({

    rootState: Ki.State.design({

      initialSubstate: 'Landing',

      Landing: Ki.State.design({

        enterState: function() {
  				console.log('Landing');
					Thecodeboutique.getPath('mainPage.mainPane').append();
					//ScCommunityApp.getPath('signInPage.mainPane').append();
					Thecodeboutique.mainPage.mainPane.frame.iconOne.animate('rotateY',180,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconTwo.animate('rotateY',180,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconThree.animate('rotateY',180,{duration:1.4, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconForth.animate('rotateY',180,{duration:1.6, timing:'ease-in-out'});
					
					//setup fram on other view
					Thecodeboutique.getPath('profilePage.mainPane');
					Thecodeboutique.profilePage.mainPane.frame.animate('scale',0.001,{duration:.5, timing:'ease-in-out'});
					
					this.invokeLater(this.fadeBarIn,1200);
        },
				fadeBarIn:function()
				{
					console.log('go bar');
					Thecodeboutique.mainPage.mainPane.frame.animate('opacity',0.8,{duration:1, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.animate('width',0.99,{duration:1, timing:'ease-in-out'});
					//this.gotoState('SignUp');
					this.invokeLater(this.flipLogos,600);
					
				},
				flipLogos:function()
				{
					Thecodeboutique.mainPage.mainPane.frame.iconOne.animate('rotateY',0,{duration:1.0, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconTwo.animate('rotateY',0,{duration:1.2, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconThree.animate('rotateY',0,{duration:1.4, timing:'ease-in-out'});
					Thecodeboutique.mainPage.mainPane.frame.iconForth.animate('rotateY',0,{duration:1.6, timing:'ease-in-out'});
				},
				goToProfilePage:function()
				{
					this.gotoState('Profile');
					
				}
			}), // end of the foo
			

			
	Exit: Ki.State.design({

    enterState: function() {
				console.log('EEEE');

    }
	}), // end of the foo		
			
			
			
			Profile: Ki.State.design({
				
				enterState: function() {
						console.log('Profile');
						Thecodeboutique.getPath('mainPage.mainPane').remove();
						Thecodeboutique.getPath('profilePage.mainPane').append();
						
						Thecodeboutique.profilePage.mainPane.frame.animate('opacity',1,{duration:.5, timing:'ease-in-out'});
						this.invokeLater(this.scaleIn,500);


        	},
					scaleIn:function()
					{
						Thecodeboutique.profilePage.mainPane.frame.animate('scale',1.3,{duration:.5, timing:'ease-in-out'},this.invokeLater(this.backDown,500));
						
					},
					backDown:function()
					{
						Thecodeboutique.profilePage.mainPane.frame.contentFrame.animate('width',450,{duration:.5, timing:'ease-in-out'});
						Thecodeboutique.profilePage.mainPane.frame.animate('scale',1.0,{duration:.5, timing:'ease-in-out'});		
						Thecodeboutique.profilePage.mainPane.bottomFrame.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});
						Thecodeboutique.profilePage.mainPane.topFrame.animate('opacity',1.0,{duration:1.5, timing:'ease-in-out'});						
					},
					exit:function()
					{
						this.gotoState('Exit');
					},
					goToProfileState:function()
					{
						this.gotoState('Profile');
					}
			}),
			
			Contact: Ki.State.design({
				
				enterState: function() {


					
        	},
					nextFunction:function()
					{
					}
			})
    })
  
  })

});
