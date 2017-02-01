/**
 * Created by Akiva on 2/1/17.
 */
var JSONObject=require('../lib/iqp_exam (2).json');

//gets number of employees in JSON file
function getNumberOfEmployees(){
    return JSONObject.NumberOfEmployees;
}

//gets number of managers in JSON file
function getNumberOfManagers(){
    return getNumberOfManagersAux(JSONObject, 0)
}

//auxiliary to getNumberOfManagers to help get number of managers
function getNumberOfManagersAux(department, number){
    if(department.SubDepartments==null){
        if(department.Manager!=null){
            number++;
        }
        return number;
    }else{
        if(department.Manager!=null){
            number++;
        }
        department.SubDepartments.forEach(function (subDeparment){
            number=getNumberOfManagersAux(subDeparment, number)

        });
        return number;
    }
}

//checks if there are duplicates
function checkAllUniqueElements(employees){
    var comparisonArray=[];
    employees.forEach(function (element){
        if(comparisonArray.indexOf(element.EmployeeID) > -1) {
            return false;
        }else{
            comparisonArray.push(element.EmployeeID);
        }

    });
    return true;

}

//checks if undefined elements are in array
function checkUndefineds(employees){
    employees.forEach(function (element){
        if (element === 'undefined'){
            return false;
        }

    });
    return true;

}


//goes through JSON file and confirms every item is in the result
function confirmEveryItemFromJSONInArray(result){
   return confirmEveryItemFromJSONInArrayAux(JSONObject, result);
}

//auxiliary method to help search that every item is in result
function confirmEveryItemFromJSONInArrayAux(department, result){
    if(department.SubDepartments==null){
        if(department.Manager!=null){
            if(!checkElementinArray(department.Manager, result)){
                return false;
            }
        }
        if(department.Employees!=null){
            department.Employees.forEach(function (employee) {
                    if (!checkElementinArray(employee, result)) {
                        return false;
                    }
                }
            );
        }
        return true;
    }else{
        if(department.Manager!=null){
            if(!checkElementinArray(department.Manager, result)){
                return false;
            }
        }
        if(department.Employees!=null){
            department.Employees.forEach(function (employee) {
                    if (!checkElementinArray(employee, result)) {
                        return false;
                    }
                }
            );
        }
        department.SubDepartments.forEach(function (subDeparment){
            if(!confirmEveryItemFromJSONInArrayAux(subDeparment, result)){
                return false;
            }
        });
        return true;
    }
}
//auxiliary method that takes a given element from the confirmEveryItemFromJSONInArrayAux and confirms its in the result
function checkElementinArray(element, result){
    var check=result.filter(function(curr){
        return element.EmployeeID==curr.EmployeeID
    })
    if(check.length > 0){
        return true;
    }else{
        return false;
    }
}





exports.getNumberOfEmployees=getNumberOfEmployees;
exports.getNumberOfManagers=getNumberOfManagers;
exports.checkAllUniqueElements=checkAllUniqueElements;
exports.checkUndefineds=checkUndefineds;
exports.confirmEveryItemFromJSONInArray=confirmEveryItemFromJSONInArray;