$(document).ready(
function()
{
	var nrow = 12;
	var ncell = 12;
	var nszenzor = 6;
	
	var tt  = new Array(nrow);
	var newrow;

	for( var i = 0; i < nrow; i++ )
	{
		newrow = document.getElementById("puzzle").insertRow(i);
		tt[i] = new Array(ncell);
		
		for( var j = 0; j < ncell; j++ )
		{
			tt[i][j]=newrow.insertCell(j);
			tt[i][j].id = i * ncell + j;
			tt[i][j].onclick = function(){ mystep(this); };
			tt[i][j].style.width = "50px";
			tt[i][j].style.height = "50px";
			tt[i][j].style.color = "white";
			tt[i][j].style.background = "gray";
		}
	}
	
	var hackerid = ( nrow - 1 ) * ncell;
	var hacker = document.getElementById( hackerid.toString() );
	hacker.style.background = "black";
	hacker.innerHTML = "H";
	
	
	var celid = ncell -1
	var cel = document.getElementById( celid.toString() );
	cel.style.background = "black";
	cel.innerHTML = "C";
	
	var szenzorid = [];
	var szenzor = [];
	var rossz_mezo = [];
	
	for( var i = 0; i < nszenzor; i++ )
	{
		szenzorid[i] = Math.floor ( Math.random() * nrow * ncell - 1 );
		if( szenzorid[i] == -1 )
		{
			szenzorid[i] = Math.floor ( Math.random() * 100 )
		}
		
		if( i != 0 )
		{
			if
			(
				celid == szenzorid[i] || hackerid  == szenzorid[i] ||
				celid - 1 == szenzorid[i] || celid + ncell == szenzorid[i] || celid + ncell - 1 == szenzorid[i] || 
				hackerid + 1 == szenzorid[i] || hackerid - ncell == szenzorid[i] || hackerid - ncell + 1 == szenzorid[i]
			)
			{
				i -= 1;
			}
			else
			{
				var jo = true;
				for( var j = 1; j <= i; j++ )
				{
					for( var k = 1; k < 4; k++ )
					{
						for( var l = 1; l < 4; l++ )
						{
							if
							(
								szenzorid[i-j] == szenzorid[i] ||
								szenzorid[i-j] - k == szenzorid[i] || szenzorid[i-j] + k == szenzorid[i] ||
								szenzorid[i-j] - k * ncell == szenzorid[i] || szenzorid[i-j] + k * ncell == szenzorid[i] ||
								
								szenzorid[i-j] - k * ncell - l == szenzorid[i] || szenzorid[i-j] + k * ncell + l == szenzorid[i] ||
								szenzorid[i-j] + k * ncell - l == szenzorid[i] || szenzorid[i-j] - k * ncell + l == szenzorid[i] ||
								
								szenzorid[i-j] - k * ncell - l == szenzorid[i] || szenzorid[i-j] + k * ncell + l == szenzorid[i] ||
								szenzorid[i-j] + k * ncell - l == szenzorid[i] || szenzorid[i-j] - k * ncell + l == szenzorid[i] ||
								
								szenzorid[i-j] - k * ncell - l == szenzorid[i] || szenzorid[i-j] + k * ncell + l == szenzorid[i] ||
								szenzorid[i-j] + k * ncell - l == szenzorid[i] || szenzorid[i-j] - k * ncell + l == szenzorid[i]
							)
							{
								if( k != 3 || l != 3)
								jo = false;
							}
						}
					}
				}
				
				if( jo )
				{
					szenzor[i] = document.getElementById( szenzorid[i].toString() );
					//szenzor[i].style.background = "crimson";
					//szenzor[i].innerHTML = "X";
					
					if( szenzorid[i] % ncell == 0 )
					{
						rossz_mezo.push( szenzorid[i] - ncell , szenzorid[i] - ncell + 1 , szenzorid[i] , szenzorid[i] + 1 , szenzorid[i] + ncell , szenzorid[i] + ncell + 1);
					}
					else if( ( szenzorid[i] + 1 ) % ncell == 0 )
					{
						rossz_mezo.push( szenzorid[i] - ncell - 1 , szenzorid[i] - ncell , szenzorid[i] - 1 , szenzorid[i] , szenzorid[i] + ncell - 1 , szenzorid[i] + ncell);
					}
					else
					{
					rossz_mezo.push( szenzorid[i] - ncell - 1 , szenzorid[i] - ncell , szenzorid[i] - ncell + 1 , szenzorid[i] - 1 , szenzorid[i] , szenzorid[i] + 1 , szenzorid[i] + ncell - 1 , szenzorid[i] + ncell , szenzorid[i] + ncell + 1);
					}
				}
				else
				{
					i -= 1;
				}
			}
		}
		else
		{
			if
			(
				celid == szenzorid[i] || hackerid  == szenzorid[i] ||
				celid - 1 == szenzorid[i] || celid + ncell == szenzorid[i] || celid + ncell - 1 == szenzorid[i] || 
				hackerid + 1 == szenzorid[i] || hackerid - ncell == szenzorid[i] || hackerid - ncell + 1 == szenzorid[i]
			)
			{
				i -= 1;
			}
			else
			{
				szenzor[i] = document.getElementById( szenzorid[i].toString() );
				//szenzor[i].style.background = "crimson";
				//szenzor[i].innerHTML = "X";
				
				if( szenzorid[i] % ncell == 0 )
				{
					rossz_mezo.push( szenzorid[i] - ncell , szenzorid[i] - ncell + 1 , szenzorid[i] , szenzorid[i] + 1 , szenzorid[i] + ncell , szenzorid[i] + ncell + 1);
				}
				else if( ( szenzorid[i] + 1 ) % ncell == 0 )
				{
					rossz_mezo.push( szenzorid[i] - ncell - 1 , szenzorid[i] - ncell , szenzorid[i] - 1 , szenzorid[i] , szenzorid[i] + ncell - 1 , szenzorid[i] + ncell);
				}
				else
				{
				rossz_mezo.push( szenzorid[i] - ncell - 1 , szenzorid[i] - ncell , szenzorid[i] - ncell + 1 , szenzorid[i] - 1 , szenzorid[i] , szenzorid[i] + 1 , szenzorid[i] + ncell - 1 , szenzorid[i] + ncell , szenzorid[i] + ncell + 1);
				}
			}
		}
	}
	
	var kozelseg = [];
	var legkozelebb;
	radar();
	
	function radar()
	{
		kozelseg = [];
		hackerid = parseInt( hackerid );
		
		for( var i = 0; i < nszenzor; i++ )
		{
			if( szenzorid[i] % ncell == 0 )
			{
				if( hackerid % ncell == 0 )
				{
					var x = Math.abs( hackerid % ncell - szenzorid[i] % ncell );
					var y = Math.abs( Math.ceil( hackerid / ncell ) - Math.ceil( szenzorid[i] / ncell ) );
				}
				else
				{
					var x = Math.abs( hackerid % ncell - szenzorid[i] % ncell );
					var y = Math.abs( Math.ceil( ( hackerid ) / ncell ) - Math.ceil( ( szenzorid[i] + 1 ) / ncell ) );
				}
			}
			else if( hackerid % ncell == 0 )
			{
				var x = Math.abs( hackerid % ncell - szenzorid[i] % ncell );
				var y = Math.abs( Math.ceil( ( hackerid + 1 ) / ncell ) - Math.ceil( szenzorid[i] / ncell ) );
			}
			else
			{
				var x = Math.abs( hackerid % ncell - szenzorid[i] % ncell );
				var y = Math.abs( Math.ceil( hackerid / ncell ) - Math.ceil( szenzorid[i] / ncell ) );
			}
			
			if( x > y)
			kozelseg.push( x );
			else
			kozelseg.push( y );
		}
		
		legkozelebb = Math.min.apply(Math, kozelseg);
		$(".radar").html("Legközelebbi szenzor: "+legkozelebb );
	}
	
	function mystep(obj)
	{
        var nid = parseInt( obj.id );
		var nhacker = parseInt( hackerid );
		
		if( nid == celid )
		{
			if( celid - 1 == nhacker || celid + ncell == nhacker || celid + ncell - 1 == nhacker )
			{
				alert("Ügyes vagy!");
				hacker.innerHTML = "";
				hacker.style.background = "gray";
				cel.style.background = "black";
				cel.innerHTML = "H";
				location.reload();
			}
		}
		else if( rossz_mezo.indexOf( nid ) != -1 )
		{
			alert("Egy szenzor észrevett!");
			location.reload();
		}
		else if
		(
			nid + ncell == nhacker || nid - ncell == nhacker ||
			nid + ncell + 1 == nhacker || nid - ncell + 1 == nhacker ||
			nid + ncell - 1 == nhacker || nid - ncell - 1 == nhacker ||
			nid + 1 == nhacker && nhacker % ncell != 0 ||
			nid - 1 == nhacker && nid % ncell != 0 
		)
		{
			hacker.innerHTML = obj.innerHTML;
			hacker.style.background = obj.style.background;
			obj.style.background = "black";
			obj.innerHTML = "H";
			hackerid = obj.id;
			hacker = document.getElementById( hackerid.toString() );
			radar();
		}
	}
	
	$(".szenzor_mutato").click(
	function()
	{
		radar();
		var i = kozelseg.indexOf( legkozelebb );
		szenzor[i].style.background = "darkred";
		szenzor[i].innerHTML = "X";
		
		if( szenzorid[i] >= ncell * (nrow - 1) )
		{
			document.getElementById( szenzorid[i] - ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] - ncell - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] - ncell + 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + 1 ).style.background = "crimson";
		}
		else if( szenzorid[i] < ncell )
		{
			document.getElementById( szenzorid[i] - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell + 1 ).style.background = "crimson";
		}
		else if( szenzorid[i] % ncell == 0 )
		{
			document.getElementById( szenzorid[i] - ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] + 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell + 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] - ncell + 1 ).style.background = "crimson";
		}
		else if( ( szenzorid[i] + 1 ) % ncell == 0 )
		{
			document.getElementById( szenzorid[i] - ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] - ncell - 1 ).style.background = "crimson";
		}
		else
		{
			document.getElementById( szenzorid[i] - ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] - ncell - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] - ncell + 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell - 1 ).style.background = "crimson";
			document.getElementById( szenzorid[i] + ncell + 1 ).style.background = "crimson";
		}
		
		$(".szenzor_mutato").hide();
	});
});
