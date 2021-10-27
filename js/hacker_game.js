$(document).ready(
function()
{
	var nrow = 12; // SOROK SZÁMA (át lehet írni (de max csak 30-ig))
	var ncell = 12; // OSZLOPOK SZÁMA (át lehet írni (de max csak 30-ig))
	var nszenzor = 5; // SZENZOROK SZÁMA (nyugodtan át lehet őket írni, de nem biztos, hogy képes lesz elhelyezni annyi szenzort a táblán, mert különben nem lehetne nyerni)
	var lepes = 0;
	
	var mezo  = [];
	var newrow;
	
	if( nrow > 30 )
	{
		nrow = 30;
		alert("A maximum sorok száma 30!");
	}
	
	if( ncell > 30)
	{
		ncell = 30;
		alert("A maximum oszlopok száma 30!");
	}
	
	for( var i = 0; i < nrow; i++ )
	{
		newrow = document.getElementById("tabla").insertRow(i);
		mezo[i] = new Array(ncell);
		
		for( var j = 0; j < ncell; j++ )
		{
			mezo[i][j] = newrow.insertCell(j);
			mezo[i][j].id = i * ncell + j;
			mezo[i][j].onclick = function(){ arrebblep(this); };
			$( mezo[i][j] ).addClass("mezo");
		}
	}
	
	var hackerid = ( nrow - 1 ) * ncell;
	var hacker = document.getElementById( hackerid.toString() );
	$( hacker ).addClass("hacker");
	hacker.innerHTML = "H";
	
	
	var celid = ncell -1;
	var cel = document.getElementById( celid.toString() );
	$( cel ).addClass("cel");
	cel.innerHTML = "C";
	
	var szenzorid = [];
	var szenzor = [];
	var rossz_mezo = [];
	var proba = 20; // Ennyiszer próbálkozik lerakni egy szenzort, ha előtte nem sikerült neki. (Ezt is át lehet írni)
					// Figyel arra, hogy el lehessen két szenzor mellett menni, mert másképp le tudná úgy generálni a játékot, hogy vagy a hackert, vagy a célt bezárrják a szenzorok.
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
				proba -= 1;
				if( proba == 0 )
				{
					i = nszenzor;
				}
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
					proba -= 1;
					if( proba == 0 )
					{
						i = nszenzor;
					}
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
				proba -= 1;
				if( proba == 0 )
				{
					i = nszenzor;
				}
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
		
		for( var i = 0; i < szenzor.length; i++ )
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
	
	function arrebblep(obj)
	{
        var nid = parseInt( obj.id );
		var nhacker = parseInt( hackerid );
		
		if( nid == celid )
		{
			if( celid - 1 == nhacker || celid + ncell == nhacker || celid + ncell - 1 == nhacker )
			{
				lepes++;
				hacker.innerHTML = "";
				$( hacker ).removeClass("hacker");
				$( cel ).addClass("hacker");
				$( cel ).removeClass("cel");
				cel.innerHTML = "H";
				setTimeout(
				function()
				{
					alert("Ügyes vagy! A megtett lépések száma: "+lepes );
					location.reload();
				}, 500);
			}
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
			if( rossz_mezo.indexOf( nid ) != -1 )
			{
				osszes_mutat();
				$(".szenzor_mutato").show();
				hacker.innerHTML = obj.innerHTML;
				$( hacker ).removeClass("hacker");
				$( obj ).addClass("hacker");
				obj.innerHTML = "H";
				obj.style.background = "darkred";
				hackerid = obj.id;
				hacker = document.getElementById( hackerid.toString() );
				lepes++;
				$(".lepesszamlalo").html("Megtett lépések száma: "+lepes );
				radar();
				setTimeout(
				function()
				{
					alert("Egy szenzor észrevett! A megtett lépések száma: "+lepes );
					location.reload();
				}, 500);
			}
			else
			{
				hacker.innerHTML = obj.innerHTML;
				$( hacker ).removeClass("hacker");
				$( obj ).addClass("hacker");
				obj.innerHTML = "H";
				hackerid = obj.id;
				hacker = document.getElementById( hackerid.toString() );
				lepes++;
				$(".lepesszamlalo").html("Megtett lépések száma: "+lepes );
				radar();
			}
		}
	}
	
	function osszes_mutat()
	{
		for( var i = 0; i < szenzor.length; i++ )
		{
			mutat(i);
		}
	};
	
	$(".szenzor_mutato").click(
	function()
	{
		radar();
		var i = kozelseg.indexOf( legkozelebb );
		mutat(i);
	});
		
	function mutat(i)
	{
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
	};
	
});