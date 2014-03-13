# fullPage.js with Rails and Bootstrap tutorial

### Disclaimer
Firstly, I'm not a rails developer, I'm learning rails for fun and only really just getting started. I've basically just run through [Michael Hart's rails tutorial](http://ruby.railstutorial.org) and that's it.

I'd really appreciate any feedback from _proper_ rails developers. Your feedback will be appreciated in improving this tutorial, even if it is simple. Please keep this in mind if you're following this tutorial, this may be a really bad way to do things or maybe some ways of doing things are not the 'ruby/rails way'.

## Tutorial

### A rails app with bootstrap
First we need to get a rails app up and running

    $ gem install bundler
    $ gem install rails
    $ rails new "fullPage rails test"
    $ cd fullPage\ rails\ test/

Next we will add the bootstrap-sass and rails_layout gems to the Gemfile, I just added it to the end

    gem 'bootstrap-sass'
    
    group :development do
      gem 'rails_layout'
    end

Install the Gems

    $ bundle install

Generate a *bootstrap v3* layout for the new rails app

    $ rails generate layout:install bootstrap3 --force

Check everything is working by first running the rails server locally

    $ rails server

Browse to the local rails server ([http://localhost:3000](http://localhost:3000)), you should see the default rails “Welcome aboard” page

### Some static pages

Next we'll add some static pages, the Home page being the one we'll add fullPage.js to, and the Help page for the sake of it. I'm not using a test framework for this tutorial, but recommended reading is [Michael Hart's rails tutorial](http://ruby.railstutorial.org) if you'd like to go into more detail about this. 

    $ rails generate controller StaticPages home help --no-test-framework

Now we'll fix the static page routes to something more useful. Replace the top lines of routes.rb with the following:

    FullPageRailsTest::Application.routes.draw do
      root  'static_pages#home'
      match '/help',    to: 'static_pages#help',    via: 'get'

This will take the user to the home static page for the root url (www.example.com/) and to the help static page for the /help url (www.example.com/help).

We can also add a navigation link to the Help page by including the following line to app/views/layouts/\_navigation\_links.html.erb

    <%= link_to 'Help', help_path, class: 'navbar-brand' %>

Check everything is working again by running the rails server locally

    $ rails server

Browse to the local rails server ([http://localhost:3000/](http://localhost:3000/)) and this time it should show the default static home page rails created for us. You can also browse to the help page with the navigation link or going directly to [http://localhost:3000/help](http://localhost:3000/help).

### Adding fullPage.js

We need to use jquery-ui-rails gem, so we'll add this to the Gemfile too

    gem 'jquery-rails'
    gem 'jquery-ui-rails'

Install the gems!

    $ bundle install

Add jquery.ui stylesheet to app/assets/stylesheets/application.css.scss:

     *= require_self
     *= require jquery.ui.all
     *= require_tree .

Add jquery.ui javascripts to app/assets/javascripts/application.js

    //= require jquery_ujs
    //= require jquery.ui.all
    //= require turbolinks

Now download and add [jquery.fullPage.css](https://github.com/alvarotrigo/fullPage.js/tree/master) to the app/assets/stylesheets folder, plus download and add [jquery.fullPage.js](https://github.com/alvarotrigo/fullPage.js/tree/master) to the app/assets/javascripts folder.

Also add some backgrounds (in this case called bg1.jpg, bg2.jpg, bg3.jpg, bg4.jpg) to the app/assets/images folder. I got some examples myself from [unsplash.com](http://unsplash.com).

Next we add the initalise function to a new javascript file I've called home.js and included in app/assets/javascripts. I used the following initialisation of fullPage.js.

    $(document).ready(function() {
      $.fn.fullpage({
        menu: '.navbar',
        verticalCentered: true,
        resize : false,
        anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips:['firstPageTooltip', 'secondPageTooltip', 'thirdPageTooltip', 'fourthPageTooltip'],
        css3: true
      });
    });

Unfortunately turbolinks don't play nicely with fullPage.js, so I've removed all references of them from my project. I removed the turbolinks gem from the Gemfile, the reference to the turbolinks javascripts from app/assets/javascripts/application.js, and both instances in app/views/layouts/application.html.erb of:

    , "data-turbolinks-track" => true 

Now we need to update the home page with the sections with full page backgrounds and some example titles and paddings. The details here all came from the fullPage.js examples and the github site.

Edit app/views/home.html.erb and replace what is there with the following

    <div class="section" id="section1"><h1>Title 1</h1></div>
    <div class="section" id="section2"><h1>Title 2</h1></div>
    <div class="section" id="section3"><h1>Title 3</h1></div>
    <div class="section" id="section4"><h1>Title 4</h1></div>

Update the section and heading styles by adding the following to app/assets/stylesheets/static_pages.css.scss

    h1 {
      font-size: 5em;	
      font-family: arial,helvetica;
      color: #fff;
      margin: 0;
      padding: 0;
    }

    .section {
      text-align:center;
    }

    #section1,
    #section2,
    #section3,
    #section4 {
       background-size: cover;
    }

    #section1 {
      background-image: image-url("bg1.jpg");
    }

    #section2 {
      background-image: image-url("bg2.jpg");
    }

    #section3 {
      background-image: image-url("bg3.jpg");
    }

    #section4 {
      background-image: image-url("bg4.jpg");
    }
 
Try it out again by running the rails server

    $ rails server

Browse again to [http://localhost:3000/](http://localhost:3000/).

The bootstrap framework and overrides stylesheet is putting in some unwanted padding, so we'll override that in app/assets/stylesheets/framework\_and\_overrides.css.scss

    main {
      @extend .container;
      background-color: #eee;
      padding: 0;
      width: 100%;

Save that and if the rails server is still running just refresh the browser window. Looking better!

Now though, it seems this script will run on every page, which we maybe don't want if we're using 'sections' in other pages for example. To address this I've just wrapped the front page in a div with a class name and only call the initialisation of fullPage.js when that class name is present on the page.

So the updated app/assets/javascripts/home.js is as follows

    $(document).ready(function() {
      if ( $('.fullpage-home').length ) {
        $.fn.fullpage({
          menu: '.navbar',
          verticalCentered: true,
          resize : false,
          anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
          navigation: true,
          navigationPosition: 'right',
          navigationTooltips:['firstPageTooltip', 'secondPageTooltip', 'thirdPageTooltip', 'fourthPageTooltip'],
          css3: true
        });
      }
    });

And the updated app/views/static_pages/home.html.erb is as follows

    <div class="fullpage-home">
      <div class="section" id="section1"><h1>Title 1</h1></div>
      <div class="section" id="section2"><h1>Title 2</h1></div>
      <div class="section" id="section3"><h1>Title 3</h1></div>
      <div class="section" id="section4"><h1>Title 4</h1></div>
    </div>

No we can use a debugger like firebug, put a breakpoint on the home.js line at "$.fn.fullpage", and see it won't run when you go to the help page but it will run if you go to the home page.

## Thanks

* [Michael Hart's rails tutorial](http://ruby.railstutorial.org) for getting me started.
* [George](https://github.com/fuzzmonkey) and [Matt](https://github.com/mattmacleod) for helping me with turbolinks and generally when I was being a newb.
* [unsplash.com](http://unsplash.com) for some example images.
* [Alvaro Trigo](https://github.com/alvarotrigo/fullPage.js) for his fullPage.js plugin.

## The end

I hope this helps someone, despite being a really basic tutorial ...
