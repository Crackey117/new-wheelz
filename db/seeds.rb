# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user2 = User.create(
    email: "blah@gmail.com", 
    first_name: "blah",
    last_name: "blah",
    password: "blahblah",
    username: "blah"
  )
user1 = User.create(
    email: "davy.jones@thelocker.com", 
    first_name: "davy",
    last_name: "jones",
    password: "blahblahblah",
    username: "squidguy"
  )

location1 = Location.create(street_address: "139 Tremont Street", city: "Boston", state: "MA", size: "medium", description: "Park in the middle of downtown. A lot of poeple, but good sidewalk areas.", traffic_level: "very low", smoothness: 3, lat: 42.3554, lng: -71.0640, title: "Boston Common")
location2 = Location.create(street_address: "1 Franklin Park Rd", city: "Boston", state: "MA", size: "large", description: "Decent sized park, long sidewalks going all around", traffic_level: "low", smoothness: 2, lat: 42.3031, lng: -71.0868, title: "Franklin Park")  
location3 = Location.create(street_address: "Bremen Street", city: "Boston", state: "MA", size: "small", description: "Long park on a bike path", traffic_level: "low", smoothness: 4, lat: 42.3751, lng: -71.0310, title: "Bremen Park")  
location4 = Location.create(street_address: "95 Marginal St.", city: "East Boston", state: "MA", size: "small", description: "park with water views, really pretty just dont send your board into the water", traffic_level: "medium", smoothness: 2, lat: 42.3650, lng: -71.0361, title: "Peirs Park")
location5 = Location.create(street_address: "55 Davis Square", city: "Sommerville", state: "MA", size: "large", description: "Pretty area to go around, lots of restaurants if you would like to grab a bike", traffic_level: "high", smoothness: 3, lat: 42.3967, lng: -71.1223, title: "Davis Square")   

comment1 = Comment.create(body: "It was fun, lot of cars though", location: location5, user: user1)
comment2 = Comment.create(body: "Would go again!", location: location3, user: user2)
comment3 = Comment.create(body: "Pavement had a lot of cracks but if you have thicker wheels its a good place", location: location2, user: user2)
comment4 = Comment.create(body: "Got the stink eye from a lot of families :(", location: location3, user: user1)
comment5 = Comment.create(body: "Fell off my board and was laughed at by a five year old, thats how it went", location: location1, user: user2)

