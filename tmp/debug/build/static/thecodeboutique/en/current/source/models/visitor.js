// ==========================================================================
// Project:   Thecodeboutique.Visitor
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Thecodeboutique */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Thecodeboutique.Visitor = SC.Record.extend({

	name: SC.Record.attr(String),
	email: SC.Record.attr(String),
	message:SC.Record.attr(String),

});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('thecodeboutique');