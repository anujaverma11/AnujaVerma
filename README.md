# fullPage.js with Rails and Bootstrap tutorial

### Disclaimer
Firstly, I'm not a rails developer, I'm learning rails for fun and only really just getting started. I've basically just run through [Michael Hart's rails tutorial](http://ruby.railstutorial.org) and that's it.

I'd really appreciate any feedback from _proper_ rails developers, and I already have problems in here that I need some help with. Your feedback will be appreciated in improving this tutorial. But please keep this in mind if you're following this tutorial, this may be a really bad way to do things or maybe some ways of doing things are not the 'ruby/rails way'.

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

Add jquery.ui stylesheet to app/assets/stylesheets/application.css.scss:

     *= require_self
     *= require jquery.ui.all
     *= require_tree .

Add jquery.ui javascripts to app/assets/javascripts/application.js

    //= require jquery_ujs
    //= require jquery.ui.all
    //= require turbolinks

Now download and add [jquery.fullPage.css](https://github.com/alvarotrigo/fullPage.js/tree/master) to the app/assets/stylesheets folder, plus download and add [jquery.fullPage.js](https://github.com/alvarotrigo/fullPage.js/tree/master) to the app/assets/javascripts folder.

Also add some backgrounds (in this case called bg1.jpg, bg2.jpg, bg3.jpg, bg4.jpg) to the app/assets/images folder. I got some examples myself from [http://unsplash.com](http://unsplash.com).

We then need to include the fullPage.js javascripts. I've elected to do it like this, because it works alongside turbolinks, but I'd appreciate some advice on better ways to do this (without taking out turbolinks which some people might advise too).

    //= require jquery.ui.all
    //= require jquery.fullPage
    
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
    //= require turbolinks

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

## Now I need help

1. By making the window thinner, you can see the bootstrap responsive layout in action. Unfortunately making it thinner causes the navigation button to appear which should, when clicked, drop down the navigation menu with the "Help" link listed. This isn't working alongside fullPage.js.

2. There is padding to the left and right of the 'full page' images, as well as between the images while scrolling. Which styles or what else is causing this padding?

I hope this helps some others, despite being a really basic tutorial ...