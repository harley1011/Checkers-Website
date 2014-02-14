function validateForm()
{
var errors = new Array("first name", "last name", "phone number", "email", "password");
var inputs = document.getElementsByTagName('input');
for(var i = 0; i < inputs.length; i +=1)
{
  if (inputs[i].value ==null || inputs[i].value =="")
  {
  	alert("The field " + errors[i] + " can not be blank." + i );
  	return false;
  }
  if ( i == 2 && !inputs[2].value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
  {
      alert("Invalid phone number.")
      return false;
  }
  if ( i == 3 )
  {
  	var x=inputs[i].value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
  	{
  		alert("Not a valid e-mail address");
  		return false;
  	}
  }
  if ( i == 4 && inputs[i].value != inputs[i+1].value)
  {
  	alert("Passwords do not match" + inputs[i].value + " " + inputs[i+1].value);
  	return false;
  }

}
  
}