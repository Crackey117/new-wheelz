# README
[![Codeship Status for Crackey117/new-wheelz](https://app.codeship.com/projects/640e25f1-731f-4fd6-bb8c-877ede9ae0e2/status?branch=master)](https://app.codeship.com/projects/415776)


Ruby version

  ruby 2.6.5

To avoid configuration issues, run the two commands below before creating the database: 
  
  bundle exec bundle install 
  yarn install

To create the database, run the command below:

  bundle exec rake db:create 

Once the database is created, run the migration and also the seed if example data is desired:

  bundle exec rake db:migrate 
  bundle exec rake db:seed 

To run test suite: 

  bundle exec rspec

Services: 

  Google Maps Javascript API
  Geocoding API 


To add new locations:

  User must sign in and then fill out the location form

To add a new comment: 

  User must sign in and add a comment through the location details page

To create an admin account: 

  Clone the repo into your machine, and before seeding, create a user with "admin" as their role (which normally defaults to "member"), then seed, and sign in as that user 

To delete a location: 

  User must be signed in as an admin, then go to "/locations/:location_id/destroy", where they will be asked if they want to delete a location 

To delete a comment: 

  User must be signed in as an admin, then go to "/locations/:location_id/comments" to see an indexed list of all comments for that location. Going to "/locations/:location_id/comments/:comment_id/destroy" will give the option to destroy that particular comment 

