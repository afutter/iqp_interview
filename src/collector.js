var Collector = (function () {
    //instance of the singleton
    var instance;

    //creates instance of Collector Object
    function createInstance() {
        //private methods and variables

        /*This private variable starts empty but is populated with the result of the LoadAndParseJSON() call.
        * If CollectAllEmployees() is called before LoadAndParseJSON(), the CollectAllEmployees() method will
        * first call the LoadAndParseJSON() method and store the result in this variable.
        * */
        var privateJSONObject='';

        //private method that serves a final check on the CollectAllEmployeesArray to make sure
        function privateRemoveDuplicatesAndUndefineds(employees){
            var comparisonArray=[];
            var toReturn=[];
            employees.forEach(function (element){
               if(element !=='undefined' && !comparisonArray.indexOf(element.EmployeeID) > -1){
                   comparisonArray.push(element.EmployeeID)
                   toReturn.push(element)
               }
            });
            return toReturn;

        }

        //private method that collects all the employees (and managers) recursively and returns as array
        function privateCollectAllEmployeesAux(department){
            if(department.SubDepartments==null){
                var result=[];
                result= result.concat(department.Employees);
                if(department.Manager!=null){
                    result = result.concat([department.Manager]);
                }
                return result;
            }else{
                var result=[];
                if(department.Manager!=null){
                    result= result.concat([department.Manager]);
                }
                if(department.Employees!=null){
                    result=result.concat(Employees)
                }
                department.SubDepartments.forEach(function (subDeparment){
                   var toAdd=privateCollectAllEmployeesAux(subDeparment)
                   result=result.concat(toAdd);
                });
                return privateRemoveDuplicatesAndUndefineds(result);
            }
        };
        return {
            // Public methods and variables

            //Gets JSON file from directory
            LoadAndParseJSON: function () {
                privateJSONObject=require('./iqp_exam (2).json');
            },
            CollectAllEmployees: function () {
                if(typeof (privateJSONObject) =='string'){
                    this.LoadAndParseJSON();
                }
                return privateCollectAllEmployeesAux(privateJSONObject);
            }
        };
    };
    return {
        getInstance: function () {
            //if instance doesnt exist yet create it, otherwise return the one already there
            if ( !instance ) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

//export for use in testing
exports.Collector=Collector;
