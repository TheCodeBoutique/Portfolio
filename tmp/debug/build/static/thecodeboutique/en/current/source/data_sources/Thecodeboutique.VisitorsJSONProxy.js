Thecodeboutique.VisitorsJSONProxy = SC.Object.create({
          normalize_task_data: function(data) {
               result = new Array();
               if (data.length == undefined)
               {
                    array_name = 'data.visitor';
                    eval(array_name).guid = eval(array_name).id;
                    result.push(eval(array_name));
               }
               else
               {
                    for(var i=0; i<data.length; i++) {
                         array_name = 'data[i].visitor';
                         eval(array_name).guid = eval(array_name).id;
                         result.push(eval(array_name));
                    }  
               }
               return result;
          } 
     }) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('thecodeboutique');