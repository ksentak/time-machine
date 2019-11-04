$(document).ready(function () {

    //Set global variables
    var year = "";

    //Function that clears all info so nothing appends/prepends 
    function clear() {
        $("#yearDump").empty();
        $("#topmovies").empty();
        $("#topshows").empty();
        $("#top-news").empty();
        $("#gifDump").empty();
    }

    //Function that hides original index layout until search is initially started
    function hideSearch() {
        $("#navigation").hide();
        $("#image").hide();
        $("#top-news").hide();
        $("#moviesandshows").hide();
    }

    //Function that shows homepage 
    function showHome() {
        $("#headline").show();
        $("#search").show();


    }
    hideSearch();
    showHome();

    //Function that hides original index layout until search is initially started
    function showSearch() {
        $("#navigation").show();
        $("#image").show();
        $("#top-news").show();
        $("#moviesandshows").show();
    }

    //Function that hides homepage
    function hideHome() {
        $("#headline").hide();
        $("#search").hide();


    }


    //On click of the search bar at top of page
    $("#searchButton").on("click", function (event) {
        event.preventDefault();

        clear();
        hideHome();
        showSearch();


        //Sets year variable to the year that was searched on index.html
        year = $("#searchYear").val().trim();
        console.log(year);
        
        //===================================================================================================
        //okay, so this code will take an input variable named "year". it will expect a string like "YYYY".
        //It will output a phrase declaring the passage of time.
        //it will create an <h3> and put that <h3> in a place called "yearDump"
        var year2 = "01/01/" + year;
        var year3 = moment().diff(moment(year2), "years");
        var yearDisplay = "A snapshot of " + year3 + " years ago";
        var yearsAgo = $("<h3>");
        yearsAgo.text(yearDisplay);
        $("#yearDump").prepend(yearsAgo);
        console.log(yearsAgo);
        //===================================================================================================

        //changes css class depending on year searched
        // if (1960 <= year && year < 1980) {
        //     $("body").removeClass();
        //     $("body").addClass("theme1");
        // } else if (1980 <= year && year < 2000) {
        //     $("body").removeClass();
        //     $("body").addClass("theme2");
        // } else if (2000 <= year && year < 2020) {
        //     $("body").removeClass();
        //     $("body").addClass("theme3");
        // }

        //On click movie section
        //===================================================================================================
        var moviedbURL = "https://api.themoviedb.org/3/discover/movie?primary_release_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";

        //Ajax call to themoviedb to get a year's most popular movies
        $.ajax({
            url: moviedbURL,
            method: "GET"
        }).then(function (movieResponse) {
            console.log(movieResponse);

            //For loop that grabs title of top 10 movies of searched year
            for (i = 0; i < 10; i++) {
                var movieTitle = movieResponse.results[i].title;
                console.log(movieTitle);
                var movieTitleText = $("<p>").text((i + 1) + ": " + movieTitle);

                $("#topmovies").append(movieTitleText);

            }
        });
        //===================================================================================================

        //On click tv shows
        //===============================================================================================
        var tvURL = "https://api.themoviedb.org/3/discover/tv?first_air_date_year=" + year + "&sort_by=popularity.desc&api_key=5519798d319118490262dd96bcfc5e34";

        //Ajax call to themoviedb to get a year's most popular tv shows
        $.ajax({
            url: tvURL,
            method: "GET"
        }).then(function (tvResponse) {
            console.log(tvResponse);

            //For loop that grabs title of top 10 movies of searched year
            for (i = 0; i < 10; i++) {
                var showTitle = tvResponse.results[i].name;
                console.log(showTitle);
                var showTitleText = $("<p>").text((i + 1) + ": " + showTitle);

                $("#topshows").append(showTitleText);

            }
        });
        //===================================================================================================

        //On click nyt headline section
        //===================================================================================================
        var nytURL = "https://api.nytimes.com/svc/archive/v1/" + year + "/11.json?api-key=0ArbXCzxyFGrfyavgsWmMGmFxb0qoVTb";

        //Ajax call to nyt to get some of the year's headlines
        $.ajax({
            url: nytURL,
            method: "GET"
        }).then(function (newsResponse) {
            console.log(newsResponse);
            for (var i = 0; i < 3; i++) {
                var headline = newsResponse.response.docs[i].headline.main;;
                var snippet = newsResponse.response.docs[i].snippet;
                var URL = newsResponse.response.docs[i].web_url;


                console.log(headline);
                console.log(snippet);
                console.log(URL);

                var newsDiv = $("<div>");
                newsDiv.append("<h4><span>" + (i + 1) + ". " + " </span> " + headline + "</h4>");
                newsDiv.append("<p>" + snippet + "</p>");
                newsDiv.append("<p id='url'>" + "Continue reading: " + URL + "</p>");
                $("#top-news").append(newsDiv);
            }
        });
        //===================================================================================================

        //On click giphy section
        //===================================================================================================
        var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=BYBsCAYxfGcNZA0LGOL6tw6AMo0HxPrS&tag=" + year + "&rating=G";

        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            
            var movingGif = response.data.images.fixed_height.url;
            var stillGif = response.data.images.fixed_height_still.url;
            var pageGif = $("<img>");
           
            pageGif.attr("class", "gif");
            pageGif.attr("src", stillGif);
            pageGif.attr("alt", "A random image from an appropriate year");
            pageGif.attr("data-still", stillGif);
            pageGif.attr("data-moving", movingGif);
            pageGif.attr("data-state", "still");

            //Prepending the pageGif to the images div
            $("#gifDump").prepend(pageGif);
        });
        //===============================================================================================



    }); //End of on click submit=============================================================================

    //Function that starts/stops a gif when it is clicked
    function startStop(){
		var state = $(this).attr("data-state");
		var movingImage = $(this).attr("data-moving");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
            $(this).attr("src", movingImage);
            $(this).attr("data-state", "moving");
		}

		else if (state == "moving") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
	}
    
    //On click that will start/stop a gif when clicked
    $(document).on("click", ".gif", startStop);

});
