// ==========================================================================
// Project:   Ki - A Statechart Framework for SproutCore
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals Ki */

/**
  Represents a state within a statechart. 
  
  The statechart actively manages all states belonging to it. When a state is created, 
  it immediately registers itself with it parent states. 
  
  You do not create an instance of a state itself. The statechart manager will go through its 
  state heirarchy and create the states itself.
*/
Ki.State = SC.Object.extend({
  
  /**
    The name of the state
    
    @property {String}
  */
  name: null,
  
  /**
    This state's parent state. Managed by the statechart
    
    @property {State}
  */
  parentState: null,
  
  /**
    This state's history state. Can be null. Managed by the statechart.
    
    @property {State}
  */
  historyState: null,
  
  /**
    Used to indicate the initial substate of this state to enter into. 
    
    You assign the value with the name of the state. Upon creation of 
    the state, the statechart will automatically change the property 
    to be a corresponding state object
    
    The substate is only to be this state's immediate substates. If
    no initial substate is assigned then this states initial substate
    will be an instance of an empty state (Ki.EmptyState).
    
    Note that a statechart's root state must always have an explicity
    initial substate value assigned else an error will be thrown.
    
    @property {String|State}
  */
  initialSubstate: null,
  
  /**
    Used to indicates if this state's immediate substates are to be
    concurrent (orthogonal) to each other. 
    
    @property {Boolean}
  */
  substatesAreConcurrent: NO,
  
  /**
    The immediate substates of this state. Managed by the statechart.
    
    @property {Array}
  */
  substates: null,
  
  /**
    The statechart that this state belongs to. Assigned by the owning
    statechart.
  
    @property {Statechart}
  */
  statechart: null,
  
  /**
    Indicates if this state has been initialized by the statechart
    
    @propety {Boolean}
  */
  stateIsInitialized: NO,
  
  /**
    An array of this state's current substates. Managed by the statechart
    
    @propety {Array}
  */
  currentSubstates: null,
  
  /** 
    Indicates if this state should trace actions. Useful for debugging
    purposes. Managed by the statechart.
  
    @see Ki.StatechartManager#trace
  
    @property {Boolean}
  */
  trace: function() {
    return this.getPath('statechart.trace');
  }.property().cacheable(),
  
  /** 
    Indicates who the owner is of this state. If not set on the statechart
    then the owner is the statechart, otherwise it is the assigned
    object. Managed by the statechart.
    
    @see Ki.StatechartManager#owner
  
    @property {SC.Object}
  */
  owner: function() {
    var sc = this.get('statechart'),
        owner = sc.get('owner');
    return owner ? owner : sc;
  }.property().cacheable(),
  
  init: function() {
    arguments.callee.base.apply(this,arguments);
    
    this._registeredEventHandlers = {};
    this._registeredStringEventHandlers = {};
    this._registeredRegExpEventHandlers = [];
    
    // Setting up observes this way is faster then using .observes,
    // which adds a noticable increase in initialization time.
    var sc = this.get('statechart');
    if (sc) {
      sc.addObserver('owner', this, '_statechartOwnerDidChange');
      sc.addObserver('trace', this, '_statechartTraceDidChange');
    }
  },
  
  /**
    Used to initialize this state. To only be called by the owning statechart.
  */
  initState: function() {
    if (this.get('stateIsInitialized')) return;
    
    this._registerWithParentStates();
    
    var key = null, 
        value = null,
        state = null,
        substates = [],
        matchedInitialSubstate = NO,
        initialSubstate = this.get('initialSubstate'),
        substatesAreConcurrent = this.get('substatesAreConcurrent'),
        statechart = this.get('statechart'),
        i = 0,
        len = 0,
        valueIsFunc = NO,
        historyState = null;
            
    if (SC.kindOf(initialSubstate, Ki.HistoryState) && initialSubstate.isClass) {
      historyState = this.createHistoryState(initialSubstate, { parentState: this, statechart: statechart });
      this.set('initialSubstate', historyState);
      
      if (SC.none(historyState.get('defaultState'))) {
        this.stateLogError("Initial substate is invalid. History state requires the name of a default state to be set");
        this.set('initialSubstate', null);
        historyState = null;
      }
    }
    
    // Iterate through all this state's substates, if any, create them, and then initialize
    // them. This causes a recursive process.
    for (key in this) {
      value = this[key];
      valueIsFunc = SC.typeOf(value) === SC.T_FUNCTION;
      
      if (valueIsFunc && value.isEventHandler) {
        this._registerEventHandler(key, value);
        continue;
      }
      
      if (valueIsFunc && value.statePlugin) {
        value = value.apply(this);
      }
      
      if (SC.kindOf(value, Ki.State) && value.isClass && this[key] !== this.constructor) {
        state = this.createSubstate(value, { name: key, parentState: this, statechart: statechart });
        substates.push(state);
        this[key] = state;
        state.initState();
        if (key === initialSubstate) {
          this.set('initialSubstate', state);
          matchedInitialSubstate = YES;
        } else if (historyState && historyState.get('defaultState') === key) {
          historyState.set('defaultState', state);
          matchedInitialSubstate = YES;
        }
      }
    }
    
    if (!SC.none(initialSubstate) && !matchedInitialSubstate) {
      this.stateLogError("Unable to set initial substate %@ since it did not match any of state's %@ substates".fmt(initialSubstate, this));
    }
    
    if (substates.length === 0) {
      if (!SC.none(initialSubstate)) {
        this.stateLogWarning("Unable to make %@ an initial substate since state %@ has no substates".fmt(initialSubstate, this));
      }
    } 
    else if (substates.length > 0) {
      if (SC.none(initialSubstate) && !substatesAreConcurrent) {
        state = this.createEmptyState({ parentState: this, statechart: statechart });
        this.set('initialSubstate', state);
        substates.push(state);
        this[state.get('name')] = state;
        state.initState();
        this.stateLogWarning("state %@ has no initial substate defined. Will default to using an empty state as initial substate".fmt(this));
      } 
      else if (!SC.none(initialSubstate) && substatesAreConcurrent) {
        this.set('initialSubstate', null);
        this.stateLogWarning("Can not use %@ as initial substate since substates are all concurrent for state %@".fmt(initialSubstate, this));
      }
    }
    
    this.set('substates', substates);
    this.set('currentSubstates', []);
    this.set('stateIsInitialized', YES);
  },
  
  /**
    creates a substate for this state
  */
  createSubstate: function(state, attrs) {
    return state.create(attrs);
  },
  
  /**
    Create a history state for this state
  */
  createHistoryState: function(state, attrs) {
    return state.create(attrs);
  },
  
  /**
    Create an empty state for this state's initial substate
  */
  createEmptyState: function(attrs) {
    return Ki.EmptyState.create(attrs);
  },
  
  /** @private 
  
    Registers event handlers with this state. Event handlers are special
    functions on the state that are intended to handle more than one event. This
    compared to basic functions that only respond to a single event that reflects
    the name of the method.
  */
  _registerEventHandler: function(name, handler) {
    var events = handler.events,
        event = null,
        len = events.length,
        i = 0;
        
    this._registeredEventHandlers[name] = handler;
    
    for (; i < len; i += 1) {
      event = events[i];
      
      if (SC.typeOf(event) === SC.T_STRING) {
        this._registeredStringEventHandlers[event] = {
          name: name,
          handler: handler
        };
        continue;
      }
      
      if (event instanceof RegExp) {
        this._registeredRegExpEventHandlers.push({
          name: name,
          handler: handler,
          regexp: event
        });
        continue;
      }
      
      this.stateLogError("Invalid event %@ for event handler %@ in state %@".fmt(event, name, this));
    }
  },
  
  /** @private
    Will traverse up through this state's parent states to register
    this state with them.
  */
  _registerWithParentStates: function() {
    this._registerSubstate(this);
    var parent = this.get('parentState');
    while (!SC.none(parent)) {
      parent._registerSubstate(this);
      parent = parent.get('parentState');
    }
  },
  
  /** @private
    Will register a given state as a substate of this state
  */
  _registerSubstate: function(state) {
    var path = state.pathRelativeTo(this);
    if (SC.none(path)) return; 
    
    // Create special private member variables to help
    // keep track of substates and access them.
    if (SC.none(this._registeredSubstatePaths)) {
      this._registeredSubstatePaths = {};
      this._registeredSubstates = [];
    }
    
    this._registeredSubstates.push(state);
    
    // Keep track of states based on their relative path
    // to this state. 
    var regPaths = this._registeredSubstatePaths;
    if (regPaths[state.get('name')] === undefined) {
      regPaths[state.get('name')] = { __ki_paths__: [] };
    }
    
    var paths = regPaths[state.get('name')];
    paths[path] = state;
    paths.__ki_paths__.push(path);
  },
  
  /**
    Will generate path for a given state that is relative to this state. It is
    required that the given state is a substate of this state.
    
    If the heirarchy of the given state to this state is the following:
    A > B > C, where A is this state and C is the given state, then the 
    relative path generated will be "B.C"
  */
  pathRelativeTo: function(state) {
    var path = this.get('name'),
        parent = this.get('parentState');
    
    while (!SC.none(parent) && parent !== state) {
      path = "%@.%@".fmt(parent.get('name'), path);
      parent = parent.get('parentState');
    }
    
    if (parent !== state && state !== this) {
      this.stateLogError('Can not generate relative path from %@ since it not a parent state of %@'.fmt(state, this));
      return null;
    }
    
    return path;
  },
  
  /**
    Used to get a substate of this state that matches a given value. 
    
    If the value is a state object, then the value will be returned if it is indeed 
    a substate of this state, otherwise null is returned. 
    
    If the given value is a string, then the string is assumed to be a path to a substate. 
    The value is then parsed to find the closes match. If there is no match then null 
    is returned. If there is more than one match then null is return and an error 
    is generated indicating ambiguity of the given value. 
    
    Note that when the value is a string, it is assumed to be a path relative to this 
    state; not the root state of the statechart.
  */
  getSubstate: function(value) {
    var valueType = SC.typeOf(value);
    
    // If the value is an object then just check if the value is 
    // a registered substate of this state, and if so return it. 
    if (valueType === SC.T_OBJECT) {
      return this._registeredSubstates.indexOf(value) > -1 ? value : null;
    }
    
    if (valueType !== SC.T_STRING) {
      this.stateLogError("Can not find matching subtype. value must be an object or string: %@".fmt(value));
      return null;
    }
    
    // The value is a string. Therefore treat the value as a relative path to 
    // a substate of this state.
    
    // Extract that last part of the string. Ex. 'foo' => 'foo', 'foo.bar' => 'bar'
    var matches = value.match(/(^|\.)(\w+)$/);
    if (!matches) return null;

    // Get all the paths related to the matched value. If no paths then return null.
    var paths = this._registeredSubstatePaths[matches[2]];
    if (SC.none(paths)) return null;
    
    // Do a quick check to see if there is a path that exactly matches the given
    // value, and if so return the corresponding state
    var state = paths[value];
    if (!SC.none(state)) return state;
    
    // No exact match found. If the value given is a basic string with no ".", then check
    // if there is only one path containing that string. If so, return it. If there is
    // more than one path then it is ambiguous as to what state is trying to be reached.
    if (matches[1] === "") {
      if (paths.__ki_paths__.length === 1) return paths[paths.__ki_paths__[0]];
      if (paths.__ki_paths__.length > 1) {
        var msg = 'Can not find substate matching %@ in state %@. Ambiguous with the following: %@';
        this.stateLogError(msg.fmt(value, this, paths.__ki_paths__));
      }
    } 
    
    return null;
  },
  
  /**
    Used to go to a state in the statechart either directly from this state if it is a current state,
    or from one of this state's current substates.
    
    Note that if the value given is a string, it will be assumed to be a path to a state. The path
    will be relative to the statechart's root state; not relative to this state.
    
    Method can be called in the following ways: 
    
    {{{
    
      // With one argument
      gotoState(<state>)
      
      // With two arguments
      gotoState(<state>, <hash>)
    
    }}}
    
    Where <state> is either a string or a Ki.State object and <hash> is a regular JS hash object.
    
    @param state {Ki.State|String} the state to go to
    @param context {Hash} Optional. context object that will be supplied to all states that are
           exited and entered during the state transition process
  */
  gotoState: function(state, context) {
    var fromState = null;
    
    if (this.get('isCurrentState')) {
      fromState = this;
    } else if (this.get('hasCurrentSubstates')) {
      fromState = this.get('currentSubstates')[0];
    }
    
    this.get('statechart').gotoState(state, fromState, context);
  },
  
  /**
    Used to go to a given state's history state in the statechart either directly from this state if it
    is a current state or from one of this state's current substates. 
    
    Note that if the value given is a string, it will be assumed to be a path to a state. The path
    will be relative to the statechart's root state; not relative to this state.
    
    Method can be called in the following ways:
    
    {{{
    
      // With one argument
      gotoHistoryState(<state>)
      
      // With two arguments
      gotoHistoryState(<state>, <boolean | hash>)
      
      // With three arguments
      gotoHistoryState(<state>, <boolean>, <hash>)
    
    }}}
    
    Where <state> is either a string or a Ki.State object and <hash> is a regular JS hash object.
    
    @param state {Ki.State|String} the state whose history state to go to
    @param recusive {Boolean} Optional. Indicates whether to follow history states recusively starting
           from the given state
    @param context {Hash} Optional. context object that will be supplied to all states that are exited
           entered during the state transition process
  */
  gotoHistoryState: function(state, recursive, context) {
    var fromState = null;
    
    if (this.get('isCurrentState')) {
      fromState = this;
    } else if (this.get('hasCurrentSubstates')) {
      fromState = this.get('currentSubstates')[0];
    }
    
    this.get('statechart').gotoHistoryState(state, fromState, recursive, context);
  },
  
  /**
    Resumes an active goto state transition process that has been suspended.
  */
  resumeGotoState: function() {
    this.get('statechart').resumeGotoState();
  },
  
  /**
    Used to check if a given state is a current substate of this state. Mainly used in cases
    when this state is a concurrent state.
    
    @param state {State|String} either a state object or the name of a state
    @returns {Boolean} true is the given state is a current substate, otherwise false is returned
  */
  stateIsCurrentSubstate: function(state) {
    if (SC.typeOf(state) === SC.T_STRING) state = this.get('statechart').getState(state);
    return this.get('currentSubstates').indexOf(state) >= 0;
  }, 
  
  /**
    Indicates if this state is the root state of the statechart.
    
    @property {Boolean}
  */
  isRootState: function() {
    return this.getPath('statechart.rootState') === this;
  }.property(),
  
  /**
    Indicates if this state is a current state of the statechart.
    
    @property {Boolean} 
  */
  isCurrentState: function() {
    return this.stateIsCurrentSubstate(this);
  }.property().cacheable(),
  
  /**
    Indicates if this state is a concurrent state
    
    @property {Boolean}
  */
  isConcurrentState: function() {
    return this.getPath('parentState.substatesAreConcurrent');
  }.property(),
  
  /**
    Indicate if this state has any substates
    
    @propety {Boolean}
  */
  hasSubstates: function() {
    return this.getPath('substates.length') > 0;
  }.property('substates'),
  
  /**
    Indicates if this state has any current substates
  */
  hasCurrentSubstates: function() {
    var current = this.get('currentSubstates');
    return !SC.none(current) && current.get('length') > 0;
  }.property('currentSubstates'),
  
  /**
    Used to re-enter this state. Call this only when the state a current state of
    the statechart.  
  */
  reenter: function() {
    var statechart = this.get('statechart');
    if (this.get('isCurrentState')) {
      statechart.gotoState(this);
    } else {
       SC.Logger.error('Can not re-enter state %@ since it is not a current state in the statechart'.fmt(this));
    }
  },
  
  /**
    Called by the statechart to allow a state to try and handle the given event. If the
    event is handled by the state then YES is returned, otherwise NO.
    
    There is a particular order in how an event is handled by a state:
    
      1) Basic function whose name matches the event
      2) Registered event handler that is associated with an event represented as a string
      3) Registered event handler that is associated with events matching a regular expression
      4) The unknownEvent function
      
    Use of event handlers that are associated with events matching a regular expression may
    incur a performance hit, so they should be used sparingly.
    
    The unknownEvent function is only invoked if the state has it, otherwise it is skipped. Note that
    you should be careful when using unknownEvent since it can be either abused or cause unexpected
    behavior.
    
    Example of a state using all four event handling techniques:
    
    {{{
    
      Ki.State.extend({
      
        // Basic function handling event 'foo'
        foo: function(arg1, arg2) { ... },
        
        // event handler that handles 'frozen' and 'canuck'
        eventHandlerA: function(event, arg1, arg2) {
          ...
        }.handleEvent('frozen', 'canuck'),
        
        // event handler that handles events matching the regular expression /num\d/
        //   ex. num1, num2
        eventHandlerB: function(event, arg1, arg2) {
          ...
        }.handleEvent(/num\d/),
        
        // Handle any event that was not handled by some other
        // method on the state
        unknownEvent: function(event, arg1, arg2) {
        
        }
      
      })
    
    }}}
  */
  tryToHandleEvent: function(event, arg1, arg2) {

    var trace = this.get('trace');

    // First check if the name of the event is the same as a registered event handler. If so,
    // then do not handle the event.
    if (this._registeredEventHandlers[event]) {
      this.stateLogWarning("state %@ can not handle event %@ since it is a registered event handler".fmt(this, event));
      return NO;
    }    
    
    // Now begin by trying a basic method on the state to respond to the event
    if (SC.typeOf(this[event]) === SC.T_FUNCTION) {
      if (trace) this.stateLogTrace("will handle event %@".fmt(event));
      return (this[event](arg1, arg2) !== NO);
    }
    
    // Try an event handler that is associated with an event represented as a string
    var handler = this._registeredStringEventHandlers[event];
    if (handler) {
      if (trace) this.stateLogTrace("%@ will handle event %@".fmt(handler.name, event));
      return (handler.handler.call(this, event, arg1, arg2) !== NO);
    }
    
    // Try an event handler that is associated with events matching a regular expression
    
    var len = this._registeredRegExpEventHandlers.length,
        i = 0;
        
    for (; i < len; i += 1) {
      handler = this._registeredRegExpEventHandlers[i];
      if (event.match(handler.regexp)) {
        if (trace) this.stateLogTrace("%@ will handle event %@".fmt(handler.name, event));
        return (handler.handler.call(this, event, arg1, arg2) !== NO);
      }
    }
    
    // Final attempt. If the state has an unknownEvent function then invoke it to 
    // handle the event
    if (SC.typeOf(this['unknownEvent']) === SC.T_FUNCTION) {
      if (trace) this.stateLogTrace("unknownEvent will handle event %@".fmt(event));
      return (this.unknownEvent(event, arg1, arg2) !== NO);
    }
    
    // Nothing was able to handle the given event for this state
    return NO;
  },
  
  /**
    Called whenever this state is to be entered during a state transition process. This 
    is useful when you want the state to perform some initial set up procedures. 
    
    If when entering the state you want to perform some kind of asynchronous action, such
    as an animation or fetching remote data, then you need to return an asynchronous 
    action, which is done like so:
    
    {{{
    
      enterState: function() {
        return this.performAsync('foo');
      }
    
    }}}
    
    After returning an action to be performed asynchronously, the statechart will suspend
    the active state transition process. In order to resume the process, you must call
    this state's resumeGotoState method or the statechart's resumeGotoState. If no asynchronous 
    action is to be perform, then nothing needs to be returned.
    
    When the enterState method is called, an optional context value may be supplied if
    one was provided to the gotoState method.
    
    @param context {Hash} Optional value if one was supplied to gotoState when invoked
  */
  enterState: function(context) { },
  
  /**
    Called whenever this state is to be exited during a state transition process. This is 
    useful when you want the state to peform some clean up procedures.
    
    If when exiting the state you want to perform some kind of asynchronous action, such
    as an animation or fetching remote data, then you need to return an asynchronous 
    action, which is done like so:
    
    {{{
    
      exitState: function() {
        return this.performAsync('foo');
      }
    
    }}}
    
    After returning an action to be performed asynchronously, the statechart will suspend
    the active state transition process. In order to resume the process, you must call
    this state's resumeGotoState method or the statechart's resumeGotoState. If no asynchronous 
    action is to be perform, then nothing needs to be returned.
    
    When the exitState method is called, an optional context value may be supplied if
    one was provided to the gotoState method.
    
    @param context {Hash} Optional value if one was supplied to gotoState when invoked
  */
  exitState: function(context) { },
  
  /**
    Call when an asynchronous action need to be performed when either entering or exiting
    a state.
    
    @see enterState
    @see exitState
  */
  performAsync: function(func, arg1, arg2) {
    return Ki.Async.perform(func, arg1, arg2);
  },
  
  /** @override
  
    Returns YES if this state can respond to the given event, otherwise
    NO is returned
  
    @param event {String} the value to check
    @returns {Boolean}
  */
  respondsToEvent: function(event) {
    if (this._registeredEventHandlers[event]) return false;
    if (SC.typeOf(this[event]) === SC.T_FUNCTION) return true;
    if (this._registeredStringEventHandlers[event]) return true;
    
    var len = this._registeredRegExpEventHandlers.length,
        i = 0,
        handler;
        
    for (; i < len; i += 1) {
      handler = this._registeredRegExpEventHandlers[i];
      if (event.match(handler.regexp)) return true;
    }
    
    return SC.typeOf(this['unknownEvent']) === SC.T_FUNCTION;
  },
  
  /**
    Returns the path for this state relative to the statechart's
    root state. 
    
    The path is a dot-notation string representing the path from
    this state to the statechart's root state, but without including
    the root state in the path. For instance, if the name of this
    state if "foo" and the parent state's name is "bar" where bar's
    parent state is the root state, then the full path is "bar.foo"
  
    @property {String}
  */
  fullPath: function() {
    var root = this.getPath('statechart.rootState');
    if (!root) return this.get('name');
    return this.pathRelativeTo(root);
  }.property('name', 'parentState').cacheable(),
  
  toString: function() {
    var className = SC._object_className(this.constructor);
    return "%@<%@, %@>".fmt(className, this.get('fullPath'), SC.guidFor(this));
  },
  
  /** @private */
  _statechartTraceDidChange: function() {
    this.notifyPropertyChange('trace');
  },
  
  /** @private */
  _statechartOwnerDidChange: function() {
    this.notifyPropertyChange('owner');
  },
  
  /** 
    Used to log a state trace message
  */
  stateLogTrace: function(msg) {
    var sc = this.get('statechart');
    sc.statechartLogTrace("%@: %@".fmt(this, msg));
  },

  /** 
    Used to log a state warning message
  */
  stateLogWarning: function(msg) {
    var sc = this.get('statechart');
    sc.statechartLogWarning(msg);
  },
  
  /** 
    Used to log a state error message
  */
  stateLogError: function(msg) {
    var sc = this.get('statechart');
    sc.statechartLogError(msg);
  }
  
});

/**
  Use this when you want to plug-in a state into a statechart. This is beneficial
  in cases where you split your statechart's states up into multiple files.
  
  Example:
  
    {{{
    
      MyApp.statechart = Ki.Statechart.create({
      
        rootState: Ki.State.design({
        
          initialSubstate: 'a',
          
          a: Ki.State.plugin('path.to.a.state.class'),
          
          b: Ki.State.pluing('path.to.another.state.class)
        
        })
      
      })
    
    }}}
  
  @param value {String} property path to a state class
*/
Ki.State.plugin = function(value) {
  var func = function() {
    return SC.objectForPropertyPath(value);
  };
  func.statePlugin = YES;
  return func;
};

Ki.State.design = Ki.State.extend;

/**
  Extends the JS Function object with the handleEvents method that
  will provide more advanced event handling capabilities when constructing
  your statechart's states.
  
  By default, when you add a method to a state, the state will react to 
  events that matches a method's name, like so:
  
  {{{
  
    state = Ki.State.extend({
    
      // Will be invoked when a event named "foo" is sent to this state
      foo: function(event, sender, context) { ... }
    
    })
  
  }}}
  
  In some situations, it may be advantageous to use one method that can react to 
  multiple events instead of having multiple methods that essentially all do the
  same thing. In order to set a method to handle more than one event you use
  the handleEvents method which can be supplied a list of string and/or regular
  expressions. The following example demonstrates the use of handleEvents:
  
  {{{
  
    state = Ki.State.extend({
    
      eventHandlerA: function(event, sender, context) {
      
      }.handleEvents('foo', 'bar'),
      
      eventHandlerB: function(event, sender, context) {
      
      }.handleEvents(/num\d/, 'decimal')
    
    })
  
  }}}
  
  Whenever events 'foo' and 'bar' are sent to the state, the method eventHandlerA
  will be invoked. When there is an event that matches the regular expression
  /num\d/ or the event is 'decimal' then eventHandlerB is invoked. In both 
  cases, the name of the event will be supplied to the event handler. 
  
  It should be noted that the use of regular expressions may impact performance
  since that statechart will not be able to fully optimize the event handling logic based
  on its use. Therefore the use of regular expression should be used sparingly. 
  
  @param {(String|RegExp)...} args
*/
Function.prototype.handleEvents = function() {
  this.isEventHandler = YES;
  this.events = arguments;
  return this;
};

/**
  Represents a history state that can be assigned to a Ki.State object's
  initialSubstate property. 
  
  If a Ki.HistoryState object is assigned to a state's initial substate, 
  then after a state is entered the statechart will refer to the history 
  state object to determine the next course of action. If the state has 
  its historyState property assigned then the that state will be entered, 
  otherwise the default state assigned to history state object will be entered.
  
  An example of how to use:
  
  {{{
  
    stateA: Ki.State.design({
    
      initialSubstate: Ki.HistoryState({
        defaultState: 'stateB'
      }),
      
      stateB: Ki.State.design({ ... }),
      
      stateC: Ki.State.design({ ... })
    
    })
  
  }}}
  
  
*/
Ki.HistoryState = SC.Object.extend({

  /**
    Used to indicate if the statechart should recurse the 
    history states after entering the this object's parent state
    
    @property {Boolean}
  */
  isRecursive: NO,
  
  /**
    The default state to enter if the parent state does not
    yet have its historyState property assigned to something 
    other than null.
    
    The value assigned to this property must be the name of an
    immediate substate that belongs to the parent state. The
    statechart will manage the property upon initialization.
    
    @property {String}
  */
  defaultState: null,
  
  /** @private
    Managed by the statechart 
    
    The statechart that owns this object.
  */
  statechart: null,
  
  /** @private
    Managed by the statechart 
  
    The state that owns this object
  */
  parentState: null,
  
  /**
    Used by the statechart during a state transition process. 
    
    Returns a state to enter based on whether the parent state has
    its historyState property assigned. If not then this object's
    assigned default state is returned.
  */
  state: function() {
    var defaultState = this.get('defaultState'),
        historyState = this.getPath('parentState.historyState');
    return !!historyState ? historyState : defaultState;
  }.property().cacheable(),
  
  /** @private */
  parentHistoryStateDidChange: function() {
    this.notifyPropertyChange('state');
  }.observes('*parentState.historyState')
  
});

/** 
  The default name given to an empty state
*/
Ki.EMPTY_STATE_NAME = "__EMPTY_STATE__";

/**
  Represents an empty state that gets assigned as a state's initial substate 
  if the state does not have an initial substate defined.
*/
Ki.EmptyState = Ki.State.extend({
  
  name: Ki.EMPTY_STATE_NAME,
  
  enterState: function() {
    this.stateLogWarning("No initial substate was defined for state %@. Entering default empty state".fmt(this.get('parentState')));
  }
  
});; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('ki');