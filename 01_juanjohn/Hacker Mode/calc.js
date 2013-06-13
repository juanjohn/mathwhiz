var value,pos,tempstr;
var inputstring='';
var pi,euler,i,j;
var eulerval="2.7182818284590452353602874713526";
var pivalue="3.14159265358979323846";
var substr1,substr2;
var numopen,numclose;
var k,l;
var position2=0;
function changedisplay()
{
	inputstring=document.forms[0].display.value;
}
function updatestring(value)
{
	if(value=="del")
	{
		var len=inputstring.length;
		if(/[a-z]{4}$/.test(inputstring))
		inputstring=inputstring.substring(0,len-4);
		else if(/[a-z]{3}$/.test(inputstring))
		inputstring=inputstring.substring(0,len-3);
		else
		inputstring=inputstring.substring(0,len-1);
		document.forms[0].display.value=inputstring;
	}
	else if(value=='clear')
	{
		inputstring='';
		document.forms[0].display.value="";
	}
	else if(value=="=")
	{
		pi=document.getElementById("_pi").value;
		euler=document.getElementById("_euler").value;
		compute();
	}
	else
	{
		inputstring+=value;
		document.forms[0].display.value=inputstring;
	}
}
/*----------------*//*----------------*//*----------------*//*----------------*/
function compute()
{
	tempstr=inputstring.split("").reverse().join("");
	pos=tempstr.search(/[a-z]{3}|\^/);
	position2=inputstring.lastIndexOf("^")+1;
	if(pos!=-1 && tempstr.charAt(pos)!="^")
	{
		inputstring=logntrig(inputstring);
		compute();
	}
	else if(tempstr.charAt(pos)=="^")
	{
		caret();
	}
	else
	{
		inputstring=inputstring.replace(euler,eulerval);
		inputstring=inputstring.replace(pi,pivalue);		
		window.alert(eval(inputstring));
		inputstring='';
		document.forms[0].display.value=inputstring;
		//if(!eval(inputstring))
	}
}
/*----------------*//*----------------*//*----------------*//*----------------*/
function logntrig(tempstrfortrig)
{
		var len=tempstrfortrig.split("").length;
		i=(len-pos+1);
		j=i-1;
		stringrep(tempstrfortrig);
		substr1=tempstrfortrig.substring(j-3,i);
		substr2=tempstrfortrig.substring(j,i);
		if(tempstrfortrig.charAt(j-3)=="s")
		{
			substr2=substr2.replace(euler,eulerval);
			substr2=substr2.replace(pi,pivalue);
			tempstrfortrig=tempstrfortrig.replace(substr1,(Math.sin(eval(substr2))));
		}
		else if(tempstrfortrig.charAt(j-3)=="c")
		{
			substr2=substr2.replace(euler,eulerval);
			substr2=substr2.replace(pi,pivalue);
			tempstrfortrig=tempstrfortrig.replace(substr1,(Math.cos(eval(substr2))));
		}
		else if(tempstrfortrig.charAt(j-3)=="t")
		{
			substr2=substr2.replace(euler,eulerval);
			substr2=substr2.replace(pi,pivalue);
			tempstrfortrig=tempstrfortrig.replace(substr1,(Math.tan(eval(substr2))));
		}
		else if(tempstrfortrig.charAt(j-3)=="l")
		{
			substr2=substr2.replace(euler,eulerval);
			substr2=substr2.replace(pi,pivalue);
			if(eval(substr2)<0)
			{
				document.write("Invalid Output"); die();
			}
			else
				{tempstrfortrig=tempstrfortrig.replace(substr1,(Math.log(eval(substr2))));
				}
		}
		else if(tempstrfortrig.charAt(j-3)=="a")
		{
			if(eval(substr2)>0 && (eval(substr2)-Math.round(eval(substr2)))==0){
			substr2=substr2.replace(euler,eulerval);
			substr2=substr2.replace(pi,pivalue);
			fact=eval(substr2);//fact stores the factorial. Variable declaration prior to factorial()	
			tempstrfortrig=tempstrfortrig.replace(tempstrfortrig.substring(j-4,i),factorial(fact));
			}
			else
			{document.write("Invalid Input"); die();}
		}
		else
		{}
		if(tempstrfortrig.search(/[a-z]{3}/)+1 && tempstrfortrig.search(/\^/)+1)
		{
			if(tempstrfortrig.split("").reverse().join("").search(/[a-z]{3}/) < tempstrfortrig.split("").reverse().join("").search(/\^/))
			{
				pos=tempstrfortrig.split("").reverse().join("").search(/[a-z]{3}/);
				logntrig(tempstrfortrig);
			}
			else
			{
				return tempstrfortrig;}
		}
		else
		{
			return tempstrfortrig;
		}
		compute();

}
/*----------------*//*----------------*//*----------------*//*----------------*/
function caret()
{
		pos=position2;
		pos-=1;
		i=pos+2;
		j=i;
		stringrep(inputstring);
		k=i-1;
		substr1=inputstring.substring(j,k);
		substr1=substr1.replace(euler,eulerval);
		substr1=substr1.replace(pi,pivalue);
		substr2=eval(substr1);
		if(inputstring.charAt(j-3)==")")
		{
			tempstr=inputstring.split("").reverse().join("");
			pos=tempstr.indexOf("^");
			i=pos+2;
			l=i;
			stringrepforrev(tempstr);
			i=i-1;
			var substr3=tempstr.substring(l,i);
			substr3=substr3.split("").reverse().join("");
			substr3=substr3.replace(euler,eulerval);
			substr3=substr3.replace(pi,pivalue);
			var pos_1=substr3.search(/[a-z]{3}|\^/);
			var substr10=substr2;
			if(pos_1+1)
			{
				substr10=substr2;
				pos=(substr3.split("").reverse().join("")).search(/[a-z]{3}|\^/);
				substr3=logntrig(substr3);}
			var lengt=substr3.length;
			var substr4=eval(substr3);
			var computedexpo=Math.pow(substr4,substr10);
			var substr5=inputstring.substring(j-3-lengt-1,k+1);
			inputstring=inputstring.replace(substr5,computedexpo);
			compute();
		}
		else if(inputstring.indexOf("^")+1)
		{
			if(inputstring.charAt(inputstring.lastIndexOf("^")-1)==euler||inputstring.charAt(inputstring.lastIndexOf("^")-1)==pi)
			{
				var variable=inputstring.charAt(inputstring.lastIndexOf("^")-1);
				if(variable==euler){inputstring=inputstring.replace(inputstring.charAt(inputstring.lastIndexOf("^")-1),eulerval);}
				else{inputstring=inputstring.replace(inputstring.charAt(inputstring.lastIndexOf("^")-1),pivalue);}
				compute();
			}
			tempstr=inputstring.split("").reverse().join("");
			pos=tempstr.indexOf("^");		
			var strpart=tempstr.substring(tempstr.indexOf("^")+1);
				strpart=strpart.replace(euler,eulerval);
				strpart=strpart.replace(pi,pivalue);			
			var pos1=strpart.search(/[^0-9\.]/);
			pos1+=pos+1;
			if(pos1-pos)
			{			
				var substr6=tempstr.substring(pos+1,pos1);
				substr6=substr6.split("").reverse().join("");
				var computedexpo=Math.pow(eval(substr6),substr2);
					substr6=substr6.replace(euler,eulerval);
					substr6=substr6.replace(pi,pivalue);
				var lengt=substr6.length;
				var substr5=inputstring.substring(j-3-lengt+1,k+1);
				inputstring=inputstring.replace(substr5,computedexpo);
			}
			else if(pos1-pos-1==-1)
			{
				var substr6=strpart;			
				substr6=substr6.split("").reverse().join("");
				var computedexpo=Math.pow(eval(substr6),substr2);
				var lengt=substr6.length;
				var substr5=inputstring.substring(j-3-lengt+1,k+1);
				inputstring=inputstring.replace(substr5,computedexpo);
			}
			compute();
		}
		else
		compute();
}
/*----------------*//*----------------*//*----------------*//*----------------*/
var num;var fact;
function factorial(num)
{
  if(num>1 && (Math.ceil(num)-num)==0)
  {
	  for(var i=2;i<num;i++)
	  fact*=i;
      return fact;
  }
}
/*----------------*//*----------------*//*----------------*//*----------------*/
var passedstring;
function stringrep(passedstring)
{
	numopen=1;numclose=0;
	for(;numopen>numclose;i++)
		{
			if(passedstring.charAt(i)=="(")
			numopen++;
			else if(passedstring.charAt(i)==")")
			numclose++;
			else
			continue;
		}
}
/*----------------*//*----------------*//*----------------*//*----------------*/
function stringrepforrev(passedstring)
{
	numclose=1;numopen=0;
	for(;numclose>numopen;i++)
		{
			if(passedstring.charAt(i)=="(")
			numopen++;
			else if(passedstring.charAt(i)==")")
			numclose++;
			else
			continue;
		}
}