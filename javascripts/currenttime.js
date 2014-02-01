function setTime()
{
setInterval(function(){getTime()},1000);
}
function getTime()
{
var _date = new Date();
var _dateFormat = _date.toDateString() + ' ' + _date.getHours() + 
':' + _date.getMinutes() + ':' + _date.getSeconds();
document.getElementById("ptime").innerHTML = _dateFormat;
}