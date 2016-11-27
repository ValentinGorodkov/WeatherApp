/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var services_1 = __webpack_require__(4);
	var weatherService = new services_1.WeatherService();
	var map = new google.maps.Map(document.getElementById('map'), {
	    center: { lat: -34.397, lng: 150.644 },
	    zoom: 8
	});
	var markers = [];
	function locate() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function (position) {
	            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	            map.setCenter(pos);
	            weatherService.getWeather(position, 50, true).then(function (response) {
	                var infoWindowOptions = {
	                    map: map
	                };
	                var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	                infoWindow.close();
	                var bounds = new google.maps.LatLngBounds();
	                response.list.forEach(function (city) {
	                    var marker = new google.maps.Marker({
	                        position: {
	                            lat: city.coord.lat,
	                            lng: city.coord.lon
	                        },
	                        map: map,
	                        title: 'Click to view weather information',
	                    });
	                    marker.addListener('click', function () {
	                        infoWindow.setContent("\n                        <div>" + city.name + " " + city.main.temp + "&#8451;</div>\n                        ");
	                        infoWindow.open(map, marker);
	                    });
	                    markers.push(marker);
	                    bounds.extend(marker.getPosition());
	                });
	                map.fitBounds(bounds);
	            });
	        }, function () { return errorHendler('The Geolocation service failed.'); });
	    }
	    else {
	        errorHendler('Your browser doesn\'t support geolocation.');
	    }
	}
	function errorHendler(message) {
	    document.getElementById('errors').textContent = message;
	}
	locate();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/raw-loader/index.js!./app.css", function() {
				var newContent = require("!!./../node_modules/raw-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "html,\r\nbody {\r\n    height: 100%;\r\n    margin: 0;\r\n}\r\n\r\n#map {\r\n    flex: 1;\r\n}\r\n\r\n.weather-app {\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n}\r\n\r\n.weather-app__header {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 0 10px;\r\n    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.24), 0 0 4px rgba(0, 0, 0, 0.12);\r\n    z-index: 1;\r\n}\r\n\r\n.weather-app__map-errors {\r\n    margin: 0 0 0 50px;\r\n    color: red;\r\n    font-size: 20px;\r\n}"

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(5));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mockWeatherData_1 = __webpack_require__(6);
	var WeatherService = (function () {
	    function WeatherService() {
	        this.weatherApi = 'http://api.openweathermap.org/data/2.5/find';
	    }
	    WeatherService.prototype.getWeather = function (position, citiesCount, isMock) {
	        if (isMock) {
	            return new Promise(function (resolve) {
	                resolve(mockWeatherData_1.mockWeatherData);
	            });
	        }
	        var url = this.weatherApi + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&cnt=" + citiesCount + "&appid=a8f5a2be89e408a117d1cbf534303578&units=metric";
	        return this.sendRequest(url);
	    };
	    WeatherService.prototype.sendRequest = function (url) {
	        var promise = new Promise(function (resolve, reject) {
	            var http = new XMLHttpRequest();
	            http.open("GET", url, true);
	            http.onreadystatechange = function () {
	                if (http.readyState === 4 && http.status === 200) {
	                    resolve(JSON.parse(http.responseText));
	                }
	                if (http.readyState === 4 && http.status !== 200) {
	                    reject('api error');
	                }
	            };
	            http.send();
	        });
	        return promise;
	    };
	    return WeatherService;
	}());
	exports.WeatherService = WeatherService;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	exports.mockWeatherData = {
	    "message": "accurate",
	    "cod": "200",
	    "count": 50,
	    "list": [
	        {
	            "id": 625665,
	            "name": "Mahilyow",
	            "coord": {
	                "lon": 30.33639,
	                "lat": 53.913891
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288213,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 700924,
	            "name": "Mogilëv",
	            "coord": {
	                "lon": 30.35,
	                "lat": 53.900002
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288357,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 627631,
	            "name": "Karabanovka",
	            "coord": {
	                "lon": 30.364721,
	                "lat": 53.946388
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288358,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 620853,
	            "name": "Tishovka",
	            "coord": {
	                "lon": 30.283333,
	                "lat": 53.883331
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288358,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 623255,
	            "name": "Polykovichi",
	            "coord": {
	                "lon": 30.335278,
	                "lat": 53.965832
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288358,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 816214,
	            "name": "Gay",
	            "coord": {
	                "lon": 30.298332,
	                "lat": 53.96389
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288359,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 629471,
	            "name": "Buynichy",
	            "coord": {
	                "lon": 30.263889,
	                "lat": 53.850555
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288359,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 620205,
	            "name": "Veyno",
	            "coord": {
	                "lon": 30.383329,
	                "lat": 53.833328
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288359,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 618768,
	            "name": "Zhukovo",
	            "coord": {
	                "lon": 30.291389,
	                "lat": 53.985832
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288360,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 816218,
	            "name": "Palykavichy Pyershyya",
	            "coord": {
	                "lon": 30.349167,
	                "lat": 53.993057
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288360,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 625072,
	            "name": "Mahilyowski Rayon",
	            "coord": {
	                "lon": 30.25,
	                "lat": 53.833328
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288360,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 622341,
	            "name": "Selets",
	            "coord": {
	                "lon": 30.241112,
	                "lat": 53.826942
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288360,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 624318,
	            "name": "Kadino",
	            "coord": {
	                "lon": 30.520281,
	                "lat": 53.883888
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288361,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 626360,
	            "name": "Kupely",
	            "coord": {
	                "lon": 30.316668,
	                "lat": 54.033333
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288361,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 620182,
	            "name": "Vil’chitsy",
	            "coord": {
	                "lon": 30.34499,
	                "lat": 53.7812
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288361,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 815847,
	            "name": "Ramanavichy",
	            "coord": {
	                "lon": 30.560989,
	                "lat": 53.872292
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288362,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 626634,
	            "name": "Krasnitsa Pervaya",
	            "coord": {
	                "lon": 30.191,
	                "lat": 53.79768
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288362,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 630391,
	            "name": "Barsuki",
	            "coord": {
	                "lon": 30.320278,
	                "lat": 54.055557
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288362,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 626638,
	            "name": "Krasnitsa",
	            "coord": {
	                "lon": 30.184723,
	                "lat": 53.789165
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288363,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 625881,
	            "name": "Lubnishche",
	            "coord": {
	                "lon": 30.104179,
	                "lat": 53.96764
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288363,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 626633,
	            "name": "Krasnitsa Vtoraya",
	            "coord": {
	                "lon": 30.183332,
	                "lat": 53.783333
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288363,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 625245,
	            "name": "Myazhysyatki",
	            "coord": {
	                "lon": 30.168056,
	                "lat": 53.770557
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288364,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 629163,
	            "name": "Dashkawka",
	            "coord": {
	                "lon": 30.261021,
	                "lat": 53.736969
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288364,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 627664,
	            "name": "Kamennyye Lavy",
	            "coord": {
	                "lon": 30.301666,
	                "lat": 54.091667
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288364,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 815261,
	            "name": "Pushcha",
	            "coord": {
	                "lon": 30.128056,
	                "lat": 53.753056
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288365,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 625642,
	            "name": "Makhovoye",
	            "coord": {
	                "lon": 30.299999,
	                "lat": 54.116669
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288365,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 620141,
	            "name": "Vishow",
	            "coord": {
	                "lon": 29.97098,
	                "lat": 53.982609
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288365,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 814948,
	            "name": "Podbrod’ye",
	            "coord": {
	                "lon": 30.098333,
	                "lat": 53.726112
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288366,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 626005,
	            "name": "Litovsk",
	            "coord": {
	                "lon": 30.316668,
	                "lat": 54.147221
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288366,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 625073,
	            "name": "Mahilyowskaya Voblasts’",
	            "coord": {
	                "lon": 30.75,
	                "lat": 54
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288366,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 628776,
	            "name": "Dubrovka",
	            "coord": {
	                "lon": 30.083332,
	                "lat": 53.700001
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288367,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 812538,
	            "name": "Dan’kovichi",
	            "coord": {
	                "lon": 30.327499,
	                "lat": 54.173058
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288367,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 621849,
	            "name": "Slasteny",
	            "coord": {
	                "lon": 30.77194,
	                "lat": 53.996109
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288368,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 622455,
	            "name": "Ryzhkovichi",
	            "coord": {
	                "lon": 30.316668,
	                "lat": 54.183334
	            },
	            "main": {
	                "temp": -3.67,
	                "temp_min": -3.67,
	                "temp_max": -3.67,
	                "pressure": 987.84,
	                "sea_level": 1009.71,
	                "grnd_level": 987.84,
	                "humidity": 81
	            },
	            "dt": 1480288368,
	            "wind": {
	                "speed": 1.69,
	                "deg": 291.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 623228,
	            "name": "Poplavshchina",
	            "coord": {
	                "lon": 30.045834,
	                "lat": 53.691113
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288368,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 814943,
	            "name": "Rudki",
	            "coord": {
	                "lon": 30.027222,
	                "lat": 53.676388
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288369,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 622034,
	            "name": "Shklow",
	            "coord": {
	                "lon": 30.291945,
	                "lat": 54.210835
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288369,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 628402,
	            "name": "Glukhaya Seliba",
	            "coord": {
	                "lon": 30.021944,
	                "lat": 53.659168
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288369,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 619095,
	            "name": "Zarovtsy",
	            "coord": {
	                "lon": 30.245832,
	                "lat": 54.232498
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288370,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 621563,
	            "name": "Stakhovshchina",
	            "coord": {
	                "lon": 30.016666,
	                "lat": 53.639721
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288370,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 812490,
	            "name": "Nizovtsy",
	            "coord": {
	                "lon": 30.239721,
	                "lat": 54.25111
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288371,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 628549,
	            "name": "Gal’kovka",
	            "coord": {
	                "lon": 30.010834,
	                "lat": 53.621113
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288371,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 621769,
	            "name": "Slobodka",
	            "coord": {
	                "lon": 30.250834,
	                "lat": 54.277222
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288371,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 618716,
	            "name": "Zolotva",
	            "coord": {
	                "lon": 29.983334,
	                "lat": 53.599998
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288372,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 629395,
	            "name": "Chavusy",
	            "coord": {
	                "lon": 30.97122,
	                "lat": 53.807529
	            },
	            "main": {
	                "temp": -2.38,
	                "temp_min": -2.38,
	                "temp_max": -2.38,
	                "pressure": 986.3,
	                "sea_level": 1009.47,
	                "grnd_level": 986.3,
	                "humidity": 89
	            },
	            "dt": 1480288372,
	            "wind": {
	                "speed": 1.44,
	                "deg": 248.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 68
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 630245,
	            "name": "Byalynichy",
	            "coord": {
	                "lon": 29.712629,
	                "lat": 53.998348
	            },
	            "main": {
	                "temp": -3.05,
	                "temp_min": -3.05,
	                "temp_max": -3.05,
	                "pressure": 988.16,
	                "sea_level": 1010,
	                "grnd_level": 988.16,
	                "humidity": 84
	            },
	            "dt": 1480288373,
	            "wind": {
	                "speed": 2.51,
	                "deg": 334.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 88
	            },
	            "weather": [
	                {
	                    "id": 804,
	                    "main": "Clouds",
	                    "description": "overcast clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 629447,
	            "name": "Bykhaw",
	            "coord": {
	                "lon": 30.246929,
	                "lat": 53.519348
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288373,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 619917,
	            "name": "Vsenezh’ye",
	            "coord": {
	                "lon": 29.916668,
	                "lat": 53.599998
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288373,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 625240,
	            "name": "Mezhniki",
	            "coord": {
	                "lon": 30.258333,
	                "lat": 54.311668
	            },
	            "main": {
	                "temp": -2.27,
	                "temp_min": -2.27,
	                "temp_max": -2.27,
	                "pressure": 986.3,
	                "sea_level": 1010.48,
	                "grnd_level": 986.3,
	                "humidity": 95
	            },
	            "dt": 1480288374,
	            "wind": {
	                "speed": 4.09,
	                "deg": 352.001
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 64
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        },
	        {
	            "id": 628756,
	            "name": "Dubrovo",
	            "coord": {
	                "lon": 29.9,
	                "lat": 53.583332
	            },
	            "main": {
	                "temp": 0.05,
	                "temp_min": 0.05,
	                "temp_max": 0.05,
	                "pressure": 991.08,
	                "sea_level": 1009.59,
	                "grnd_level": 991.08,
	                "humidity": 96
	            },
	            "dt": 1480288374,
	            "wind": {
	                "speed": 1.44,
	                "deg": 287.501
	            },
	            "sys": {
	                "country": ""
	            },
	            "clouds": {
	                "all": 76
	            },
	            "weather": [
	                {
	                    "id": 803,
	                    "main": "Clouds",
	                    "description": "broken clouds",
	                    "icon": "04n"
	                }
	            ]
	        }
	    ]
	};


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map