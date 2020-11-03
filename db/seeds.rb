# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

location1 = Location.create(street_address: "139 Tremont Street", city: "Boston", state: "MA", size: "medium", description: "Park in the middle of downtown. A lot of poeple, but good sidewalk areas.", traffic_level: "very low", smoothness: 3, lat: 42.3554, lng: -71.0640, title: "Boston Common")
location2 = Location.create(street_address: "1 Franklin Park Rd", city: "Boston", state: "MA", size: "large", description: "Decent sized park, long sidewalks going all around", traffic_level: "low", smoothness: 2, lat: 42.3031, lng: -71.0868, title: "Franklin Park")  
location3 = Location.create(street_address: "Bremen Street", city: "Boston", state: "MA", size: "small", description: "Long park on a bike path", traffic_level: "low", smoothness: 4, lat: 42.3751, lng: -71.0310, title: "Bremen Park")  
location4 = Location.create(street_address: "95 Marginal St.", city: "East Boston", state: "MA", size: "small", description: "park with water views, really pretty just dont send your board into the water", traffic_level: "medium", smoothness: 2, lat: 42.3650, lng: -71.0361, title: "Peirs Park")
location5 = Location.create(street_address: "55 Davis Square", city: "Sommerville", state: "MA", size: "large", description: "Pretty area to go around, lots of restaurants if you would like to grab a bike", traffic_level: "high", smoothness: 3, lat: 42.3967, lng: -71.1223, title: "Davis Square")    
