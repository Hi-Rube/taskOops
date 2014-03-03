/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/6/14
 * Time: 6:40 PM
 * To change this template use File | Settings | File Templates.
 */
var filePath=require('../Data/filePath.js');
var httpConfig=require('../Data/httpConfig.js');
var global=require('../../Cache');
Global['filePath']=filePath.data;
Global['httpConfig']=httpConfig.data;