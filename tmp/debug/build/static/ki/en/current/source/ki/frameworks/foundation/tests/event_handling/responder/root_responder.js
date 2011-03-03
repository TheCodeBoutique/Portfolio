// ==========================================================================
// Ki.Statechart Unit Test
// ==========================================================================
/*globals Ki statechart */

window.statechart = null;
var responder, fooInvokedCount;

// ..........................................................
// CONTENT CHANGING
// 

module("Ki.Statechart: No Concurrent States - Root Responder Default Responder Tests", {
  setup: function() {
    fooInvokedCount = 0;
    
    window.statechart = Ki.Statechart.create({
      
      rootState: Ki.State.design({
        
        initialSubstate: 'a',
        
        a: Ki.State.design({
          foo: function() { 
            fooInvokedCount++;
            this.gotoState('b'); 
          }
        }),
        
        b: Ki.State.design({
          foo: function() {
            fooInvokedCount++;
            this.gotoState('a'); 
          }
        })
        
      })
      
    });
    
    window.statechart.initStatechart();
    
    responder = SC.RootResponder.responder;
    
    SC.RunLoop.begin();
    responder.set('defaultResponder', 'statechart');
    SC.RunLoop.end();
  },
  
  teardown: function() {
    window.statechart = null;
    responder = null;
    SC.RootResponder.responder.set('defaultResponder', null);
  }
});

test("click button", function() {
  equals(fooInvokedCount, 0, 'foo should not have been invoked');
  equals(statechart.stateIsCurrentState('a'), true, 'state a should be a current state');
  equals(statechart.stateIsCurrentState('b'), false, 'state b should not be a current state');
  
  responder.sendAction('foo');
  
  equals(fooInvokedCount, 1, 'foo should have been invoked once');
  equals(statechart.stateIsCurrentState('a'), false, 'state a should not be a current state');
  equals(statechart.stateIsCurrentState('b'), true, 'state b should be a current state');
  
  responder.sendAction('foo');
  
  equals(fooInvokedCount, 2, 'foo should have been invoked twice');
  equals(statechart.stateIsCurrentState('a'), true, 'state a should be a current state');
  equals(statechart.stateIsCurrentState('b'), false, 'state b should not be a current state');
  
});; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('ki');