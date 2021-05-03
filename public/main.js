
// Perform CSS-related JQuery
$(function(){
	
	
	$("#transactionHistory").hide();

	$(".buy").click(function(){
		$('#searchDiv').css("visibility", "hidden");
	    $("#buyStock").fadeIn(1000);
	    $('#stock').find('input:number').val('2');

	});
	$(".sell").click(function(){
		$('#searchDiv').css("visibility", "hidden");
	    $("#sellStock").fadeIn(1000);
	    $('#stock').find('input:number').val('2');

	});
	$(".cancel").click(function(){
		$("#buyStock").hide();
		$("#sellStock").hide();
		$('#searchDiv').css("visibility", "visible")
		$('#stock').find('input:number').val('2');
	});

	$(".show").click(function(){
		$("#transactionHistory").show();
		
	});
	$(".hide").click(function(){
		$("#transactionHistory").hide();
		
	});

})


// Get an array of dates by calling an ajax
var getDatesRangeArray = function() {
   	var ticker = "TCS";
   	var date_array1 = [];
	var date_array = [];

	var string1 = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:";
	var string2 = "&outputsize=compact&apikey=apikey=J95GKO8QPX9RFU7K";
	var url = "".concat(string1,ticker, string2);

	jQuery.ajax({
	    url: url,
	    dataType: 'json',
	    contentType: "application/json",
	    async: false,  
	    success: function(data){
	    	// Get the historical 100 days transaction
			for(var key in data["Time Series (Daily)"]) {
				date_array1.push(key);
			}
			
		}
		
	});
	date_array[0]=date_array1[0];
    return date_array;
}


var date_array = getDatesRangeArray();

console.log(date_array);
console.log(date_array[0]);
// Portfolio Date
var startDate = date_array[0];
// console.log(startDate);
var endDate = date_array[99];

var portfolioDays = date_array;

console.log("Portfolio days: ", portfolioDays);


// For Single Stock Graph 
var startDate2 = date_array[0];
endDate2 = date_array[99];
var historyDays = date_array;


// Global Variables CurrentDate
var currentDate = portfolioDays[0];
console.log("currentDate: ",currentDate);
document.querySelector("#date").innerHTML = currentDate;
document.querySelector("#stockDate").innerHTML = currentDate;


var stockPrice = 0;
var ticker = "";
var currentPrice = 0;

var Prices = {};
var historyPrices = {};

// Transaction History
var History = [];

//
// Create Portfolio 
var Portfolio = {
    [startDate]:{

    },

}


console.log("Myportfolio: ", Portfolio);




function search(){
	// ticker Symbol -> call API
	// get date[price]
	// move along with Current Date

	var ticker = document.querySelector("#ticker").value.trim().toUpperCase();

	// ticker = "AAPL";

	if(ticker == ""){
		alert("Please enter a ticker symbol");

	}else{
		// compact will give 100 history day
		var string1 = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:";
		var string2 = "&outputsize=compact&apikey=apikey=J95GKO8QPX9RFU7K";
		var url = "".concat(string1,ticker, string2);

		jQuery.ajax({
		    url: url,
		    dataType: 'json',
		    contentType: "application/json",
		    success: function(data){
		  		// console.log(data);
		    	console.log(data["Time Series (Daily)"]);
		    	// Get the historical 100 days transaction
		    	var date_array = [];
   				for(var key in data["Time Series (Daily)"]) date_array.push(key);
   				console.log(date_array);
				date_array.reverse();
				var currentDate = document.querySelector("#date").innerHTML.trim();
				
		        var dayLength = historyDays.indexOf(currentDate) + 1;
				var dayLength2 = portfolioDays.length;
		        if(data["Time Series (Daily)"] == undefined){
		            alert("Invalid Ticker Name");
		        }else{
		    		currentPrice = data["Time Series (Daily)"][currentDate]["4. close"];

		            currentPrice = parseFloat(currentPrice).toFixed(2);
		    		

		            // SAVE Historical Prices for the stock
		            var stockPriceArray = [];

		    		for(var i = 0; i < date_array.length; i++){
		    			// Create a date and price pair
		    			var date_price_pair = []	
		    			date_price_pair.push(date_array[i]);
		    			date_price_pair.push(parseFloat(data["Time Series (Daily)"][date_array[i]]["4. close"]));
		    			stockPriceArray.push(date_price_pair);	
		    		}
		    		historyPrices[ticker] = {};
		    		for(var i =0; i < dayLength; i++){
		    			var date = portfolioDays[i];
		    			var price = parseFloat(data["Time Series (Daily)"][date]["4. close"]);
		    			historyPrices[ticker][date] = price;
		    		}


		    		Prices[ticker] = {};
		    		for(var i =0; i < dayLength2; i++){
		    			var date = portfolioDays[i];
		    			var price = parseFloat(data["Time Series (Daily)"][date]["4. close"]);
		    			Prices[ticker][date] = price;
		    		}
		    	
		    		document.querySelector("#buyPrice").innerHTML = "₹ "+currentPrice;
		    		document.querySelector("#sellPrice").innerHTML = "₹ "+currentPrice;
		    		document.querySelector("#buyTicker").innerHTML = ticker;
		    		
		    		
		    	 	// Highcharts

		    	    Highcharts.chart('summary', {
		    	        chart: {
		    	            zoomType: 'x'
		    	        },
		    	        title: {
		    	            text:  ticker +' Current Price ₹'+ currentPrice
		    	        },
		    	        subtitle: {
		    	            text: document.ontouchstart === undefined ?
		    	                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
		    	        },
		    	        xAxis: {
		    	            type: 'datetime',
		    	            labels: {
		    		            formatter: function() {
		    		                return Highcharts.dateFormat('%b.%d.%y',date);
		    		         	}
		    		         },
		    	        },
		    	        yAxis: {
		    	            title: {
		    	                text: ticker+' Price' 
		    	            }
		    	        },
		    	        legend: {
		    	            enabled: false
		    	        },
		    	        plotOptions: {
		    	            area: {
		    	                fillColor: {
		    	                    linearGradient: {
		    	                        x1: 0,
		    	                        y1: 0,
		    	                        x2: 0,
		    	                        y2: 1
		    	                    },
		    	                    stops: [
		    	                        [0, Highcharts.getOptions().colors[0]],
		    	                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
		    	                    ]
		    	                },
		    	                marker: {
		    	                    radius: 2
		    	                },
		    	                lineWidth: 1,
		    	                states: {
		    	                    hover: {
		    	                        lineWidth: 1
		    	                    }
		    	                },
		    	                threshold: null
		    	            }
		    	        },

		    	        series: [{
		    	            type: 'area',
		    	            name: 'price',
		    	            data: stockPriceArray
		    	        }]
		    	    });

			   }

		    }
		});

		
	}
	
}



function buyStock(){
	// Update Portfolio

	var currentDate = document.querySelector("#date").innerHTML.trim();
	console.log(currentDate);
	var sharePrice = document.querySelector("#buyPrice").innerHTML.trim();
	console.log("asdasd")
	sharePrice = parseFloat(sharePrice.slice(2,11));
	var totalPrice = document.querySelector("#buyTotalPrice").innerHTML.trim();
	var totalLength = totalPrice.length;

	console.log(totalPrice)
	totalPrice = parseFloat(totalPrice.slice(2,totalLength+4));

	var shareNum = document.querySelector("#buyNum").value;
	shareNum = parseInt(shareNum);
	
	var ticker = document.querySelector("#buyTicker").innerHTML.trim();

	var buyingPower = document.querySelector("#buyingPower").innerHTML.trim();
	buyingPower = parseFloat(buyingPower);


	// console.log("share", currentDate, ticker, shareNum, sharePrice, totalPrice, buyingPower);
	
	if(totalPrice == 0){
		alert("Cannot buy 0 shares!");
	}else if (totalPrice <= buyingPower){
		// console.log("inside buyStock", Portfolio);
		if(ticker in Portfolio[currentDate]){
			console.log("found");
			Portfolio[currentDate][ticker]["shareNum"] += shareNum;
			Portfolio[currentDate][ticker]["total"] += totalPrice;



		}else{
			console.log("not found");
			Portfolio[currentDate][ticker] = {
				"price": sharePrice,
				"shareNum": shareNum,
				"total": totalPrice,
				"returns": 0,
			};
		}
		 
		var tickerArray = Object.keys(Portfolio[currentDate])
		var wholeMsg =  "<tr><td>Stock</td><td>Shares</td><td>Total</td><td>Return</td></tr>";
		// console.log(Portfolio[currentDate][ticker]["total"]);
		for(var i=0; i < tickerArray.length; i++){
			var ticker = tickerArray[i];
			var msg = "<tr><td onclick='getStockGraph(\""+ticker+"\");'>"+ticker+"</td><td>"
					+ Portfolio[currentDate][ticker]["shareNum"]
					+" Shares</td><td> ₹"
					+ parseFloat(Portfolio[currentDate][ticker]["total"]).toFixed(2)
					+"</td><td>"
					+ Portfolio[currentDate][ticker]["returns"]
					+"</td></tr>"
			
			 wholeMsg += msg;

		}
		alert("Success!");
		document.getElementById("ticker").value = "";
		var history = "--> " + currentDate + ": " + ticker+ "<br> Market Buy: " + shareNum + " shares at ₹" + sharePrice + "<br> Total: " + totalPrice + "<hr><br/>";
		History.push(history);
		document.querySelector("#transactionHistory").innerHTML += history;
		
		// Reduce Buying Power
		buyingPower -= totalPrice;

		document.querySelector("#buyingPower").innerHTML = buyingPower.toFixed(2);
		document.querySelector("#portfolioTable").innerHTML = wholeMsg;
	
		$("#buyStock").fadeOut();
		$('#searchDiv').css("visibility", "visible");
		
			
		}else{
			alert("Not Enough Money");
		}

}

// For Portfolio Grpah
var dataArray=[];
var dayLength = historyDays.indexOf(currentDate) + 1;

for(var i =0; i < dayLength; i++){

	var dataPair = []
	
	getDate = 0;

	dataPair.push(getDate);
	dataPair.push(10000);
	dataArray.push(dataPair);

}

// updatePortfolio(currentDate,dataArray);

function sellStock(){
	var currentDate = document.querySelector("#date").innerHTML.trim();

	var sharePrice = document.querySelector("#sellPrice").innerHTML.trim();
	//alert(sharePrice);
	sharePrice = parseFloat(sharePrice.slice(1,6));
	var totalPrice = document.querySelector("#sellTotalPrice").innerHTML.trim();
	
	totalLength = totalPrice.length;
	//alert(totalPrice);
	totalPrice = parseFloat(totalPrice.slice(1,totalLength + 1).replaceAll(",",""));
	//alert("Hello");
	var shareNum = document.querySelector("#sellNum").value;
	shareNum = parseInt(shareNum);

	var buyingPower = document.querySelector("#buyingPower").innerHTML.trim();
	buyingPower = parseFloat(buyingPower);
	
	var ticker = document.querySelector("#buyTicker").innerHTML.trim();
	console.log("share", currentDate, ticker, shareNum, sharePrice, totalPrice);
	if(ticker in Portfolio[currentDate]){
		
		var ownShareNum = Portfolio[currentDate][ticker]["shareNum"];
		console.log("found", ownShareNum,shareNum);
		if(ownShareNum >= shareNum){
			console.log("Sell")
			Portfolio[currentDate][ticker]["shareNum"] -= shareNum;
			Portfolio[currentDate][ticker]["total"] -= totalPrice;

		}else{
			console.log("Cannot Sell");
			alert("Not enough Shares.");
		}
	


	}else{
		console.log("not found");
		alert("Your Portfolio does not have the stock.");


	}

	var tickerArray = Object.keys(Portfolio[currentDate])
	var wholeMsg =  "<tr><td>Stock</td><td>Shares</td><td>Total</td><td>Return</td></tr>";
	console.log(Portfolio[currentDate][ticker]["total"]);
	for(var i=0; i < tickerArray.length; i++){
		var ticker = tickerArray[i];
		var msg = "<tr><td onclick='getStockGraph();'>"+ticker+"</td><td>"
				+ Portfolio[currentDate][ticker]["shareNum"]
				+" Shares</td><td> ₹"
				+ parseFloat(Portfolio[currentDate][ticker]["total"]).toFixed(2)
				+"</td><td>"
				+ Portfolio[currentDate][ticker]["returns"]
				+"</td></tr>"
		
		 wholeMsg += msg;

	}
	alert("Success!");
	document.getElementById("ticker").value = "";

	var history = currentDate + " " + ticker+" Market Sell: " + shareNum + " shares at ₹ " + sharePrice + " -- Total: ₹ " + totalPrice + "<br/>";
	History.push(history);
	document.querySelector("#transactionHistory").innerHTML += history;
	buyingPower += totalPrice;

	document.querySelector("#buyingPower").innerHTML = buyingPower.toFixed(2);
	document.querySelector("#portfolioTable").innerHTML = wholeMsg;

	$("#sellStock").fadeOut();
	$('#searchDiv').css("visibility", "visible");
	
	addprice();

}
var ch=null;
function latestval(){
	var portfolioTickers = Object.keys(Portfolio[currentDate]);
	 console.log(portfolioTickers.length);
	 for (var i =0; i < portfolioTickers.length ; i++)
	 {
		var ticker = portfolioTickers[i];
		var shareNum = Portfolio[currentDate][ticker]["shareNum"];
		console.log(i, ticker,shareNum);
		if(shareNum==0)
		{
			delete portfolioTickers[i];
		}
	 }
	if(portfolioTickers.length>0)
	{
		portlatest();
	}
	else{
		clearInterval(ch);
	}
}
var j=0;
function portlatest(){
	ch=setInterval (function(){
		j++;
		var portfolioTickers = Object.keys(Portfolio[currentDate]);
		console.log(portfolioTickers.length);
	// update currentDate value 
	// update portfolio Graph
	// update the portfolio Table

	previousDate = document.querySelector("#date").innerHTML.trim();
	var index = portfolioDays.indexOf(previousDate);
	{

		var prevPortfolioValue = document.querySelector("#portfolioValue").innerHTML.trim();
		prevPortfolioValue = parseFloat(prevPortfolioValue);
		

		var portfolioValue = 0;
		var stockTotalValue = 0;
		var buyingPower = document.querySelector("#buyingPower").innerHTML.trim();
		buyingPower = parseFloat(buyingPower);


		// currentDate = portfolioDays[index];
		document.querySelector("#date").innerHTML = currentDate;
		document.querySelector("#stockDate").innerHTML = currentDate;
		

		// Append previous Portfolio to currentDate
		Portfolio[currentDate]= Portfolio[previousDate];

		var portfolioTickers = Object.keys(Portfolio[currentDate]);
		
		var wholeMsg =  "<tr><td>Stock</td><td>Shares</td><td>Total</td><td>Return</td></tr>";
	
		var returnArray = [];
		var postiveReturns = true;
		var currenTotal;
		for (var i =0; i < portfolioTickers.length ; i++){
	
			var ticker = portfolioTickers[i];
			var prevPrice = Portfolio[currentDate][ticker]["price"];

			var shareNum = Portfolio[currentDate][ticker]["shareNum"];
			var prevTotal = Portfolio[currentDate][ticker]["total"];
			console.log(i, ticker, prevPrice, shareNum);
			var chance = Math.round(Math.random()) * 2 - 1;
			currentPrice = prevPrice+(chance);
			currentPrice = parseFloat(currentPrice).toFixed(2);
			currentPrice = parseFloat(currentPrice);

			currenTotal = currentPrice * shareNum;
			currenTotal = parseFloat(currenTotal).toFixed(2);
			currenTotal = parseFloat(currenTotal);
			console.log(currenTotal);
			stockTotalValue += currenTotal;
			console.log(prevTotal,currenTotal);
			var profit=prevTotal-currenTotal;
			Portfolio[currentDate][ticker]["price"] = currentPrice;
			Portfolio[currentDate][ticker]["total"] = currenTotal;
			
			var returns = (currenTotal - prevTotal)*100/prevTotal;
			
			if(returns >= 0){
				postiveReturns = true;

			}else{
				postiveReturns = false;
			}
			returnArray.push([ticker, postiveReturns]);
	

			returns = returns.toFixed(2) + "%";
			console.log(ticker, currentPrice, shareNum, currenTotal, returns);
			Portfolio[currentDate][ticker]["returns"] = returns;
			
			var msg = "<tr id="+ticker+"><td onclick='getStockGraph();'>"+ticker+"</td><td>"
							+ Portfolio[currentDate][ticker]["shareNum"]
							+" Shares</td><td>₹"
							+ Portfolio[currentDate][ticker]["total"]
							+"</td><td>"
							+ Portfolio[currentDate][ticker]["returns"]
							+"</td></tr>" ;			
			wholeMsg += msg;
		

		}
		portfolioValue = buyingPower+stockTotalValue
		
		document.querySelector("#portfolioValue").innerHTML = portfolioValue.toFixed(2);

		getDate = j;
		dataArray.push([getDate, portfolioValue]);
		
		var portfolioReturns = (portfolioValue - prevPortfolioValue)*100/prevPortfolioValue;
	
		Returns = portfolioReturns.toFixed(2) + "%";
		document.querySelector("#portfolioReturn").innerHTML = Returns;
			if (portfolioReturns >= 0){
			document.getElementById("portfolioReturn").classList.add('up');
			document.getElementById("portfolioReturn").classList.remove('down');
		}else{
			document.getElementById("portfolioReturn").classList.add('down');
			document.getElementById("portfolioReturn").classList.remove('up');
		}


		document.querySelector("#portfolioTable").innerHTML = wholeMsg;

		for(var i =0; i<returnArray.length; i++){
			if(returnArray[i][1]==true){
				document.getElementById(returnArray[i][0]).classList.add('up');

			}else{
				document.getElementById(returnArray[i][0]).classList.add('down');
			}
		}

		console.log(dataArray);	
		updatePortfolio(currentDate,dataArray);

	}
},3000);}

function addprice() {
	var d = document.querySelector("#portfolioValue").innerHTML.trim();
	d = parseFloat(d);
	var e = document.querySelector("#sellPrice").innerHTML.trim();
	e = parseFloat(e);
	d += e;
	document.querySelector("#portfolioValue").innerHTML = d;
}

function updatePortfolio(currentDate,dataArray){
	// Highcharts
	var currentValue = dataArray[dataArray.length-1][1].toFixed(2);
	console.log(dataArray);

    Highcharts.chart('portfolioGraph', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text:  "₹ "+currentValue,
        },
       
       
       
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'price',
            data: dataArray,
        }]
    });
}




function getStockGraph(ticker){
	console.log("here", ticker, historyDays);

	currentDate = document.querySelector("#date").innerHTML;
	var dayLength = historyDays.indexOf(currentDate) + 1;

	var stockPriceArray = [];

	for(var i = 0; i < dayLength; i++){
		var dataPair = [];
		var price = 0;
		getDate = moment(historyDays[i]).valueOf()
		dataPair.push(getDate);
		console.log(i, historyDays[i]);
		var date = historyDays[i];
		console.log(historyPrices, historyPrices[ticker][date]);

		price = historyPrices[ticker][date];

		dataPair.push(price);
		stockPriceArray.push(dataPair);	
	}
	console.log(stockPriceArray);
	updateStockGraph(currentDate,stockPriceArray);

}	


function updateStockGraph(currentDate,dataArray){
	// Highcharts
	var currentValue = dataArray[dataArray.length-1][1].toFixed(2);

    Highcharts.chart('summary', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text:  "₹ "+currentValue,
        },
       
        xAxis: {
            type: 'datetime',
            labels: {
	            formatter: function() {
	                return Highcharts.dateFormat('%b.%d.%y', this.value);
	         	}
	         },
        },
       
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'price',
            data: dataArray,
        }]
    });
}


// Angular
var tradeApp = angular.module('tradeApp', []);

tradeApp.controller('tradeController', function($scope){

	$scope.buyTotal = function(){
		var sharePrice = document.querySelector("#buyPrice").innerHTML.trim();
		//alert(sharePrice);
		sharePrice = parseFloat(sharePrice.slice(2, 11));
		var buyTotal = 0;
		buyTotal = sharePrice * $scope.buyNum;
		buyTotal = buyTotal.toFixed(2);
		return buyTotal;
	}
	$scope.sellTotal = function(){
		var sharePrice = document.querySelector("#sellPrice").innerHTML.trim();
		sharePrice = parseFloat(sharePrice.slice(1,6));
		var sellTotal = 0;
		sellTotal = currentPrice * $scope.sellNum;
		sellTotal = sellTotal.toFixed(2);
		return sellTotal;
	}	

	$scope.reset = function() {
        $scope.buyNum = 0;
        $scope.sellNum = 0;
    }

	
});

