/**
 * Created by Akiva on 2/1/17.
 */
var expect = require('chai').expect;
var Collector= require('../src/collector').Collector;
var getNumEmployees=require('./util').getNumberOfEmployees; //function
var getNumManagers=require('./util').getNumberOfManagers; //function
var checkAllUniqueElements = require('./util').checkAllUniqueElements; //function
var checkUndefineds=require('./util').checkUndefineds //function
var confirmEveryItemFromJSONInArray= require('./util').confirmEveryItemFromJSONInArray //function


describe('Collector', function() {
    describe('collectAllEmployees', function() {

        it('should return an array of same length as number of employees and managers', function() {
            expect((Collector.getInstance().CollectAllEmployees()).length).to.be.equal(getNumEmployees()+getNumManagers());
        });

        it('should have only unique items in the array', function() {
            expect(checkAllUniqueElements(Collector.getInstance().CollectAllEmployees())).to.be.equal(true);
        });
        it('should have no undefined items in the array', function() {
            expect(checkUndefineds(Collector.getInstance().CollectAllEmployees())).to.be.equal(true);
        });

        it('should have all the same elements as JSON file', function() {
            expect(confirmEveryItemFromJSONInArray(Collector.getInstance().CollectAllEmployees())).to.be.equal(true);
        });
    });
});