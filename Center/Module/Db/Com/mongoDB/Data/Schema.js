/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/23/14
 * Time: 6:24 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var date=new Schema({
    year:{type:Number,default:2013},
    month:Number,
    day:Number,
    hour:Number,
    min:Number,
    sec:Number
});

var user=new Schema({
     name:String,
     pwd:String,
     age:Number,
     bir:[date]
});

var board=new Schema({
    name:String,
    ins:{type:Date,default:Date.now}
});
var schemaArray=new Array();
var schemaArrayName=new Array();
schemaArray.push(user);
schemaArray.push(board);
schemaArrayName.push('user');
schemaArrayName.push('board');
exports.schemaArray=schemaArray;
exports.schemaArrayName=schemaArrayName;