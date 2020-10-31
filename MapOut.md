The point of this doc is how to map out the design of this app

index: map page displaying all the location marker 
show: when a user clicks on a marker - ideally big pop up box 
new: the form for adding a new location 

name ideas:
- spot sharz 
- Spotz 

landing page:

on screen: two choices (find a spot, share a spot), location field (youll need this both for finding and sharing), pictures near the top and sides and maybe bottom 

functionality: renders pictures, renders form with buttons and field for address (each button could use same field), depending on which button is clicked, different redirects 

style: two big buttons, exciting colors, images of longboarding

thoughts: maybe user selects with option they want (then the button changes color), then enters an address in a field, then hits a go button, maybe some pictures on the bottom but dont want it to be overwhemeling 




index page: 

on screen: google map with markers for each of the locations, fun header

functionality: index container component with a map as a child component (locations are an array handed down), each spot has a link to show page with its id handed down when its created  

style: each marker could be a skateboard or something fun, nice surrounding color scheme 

thoughts: maybe some pictures, but dont want it be discracting 




show page: 

on screen: all the details of a spot, ideally a picture too 

functionality: option to redirect back to map (or close popup box if its a popup)

style: calmer color scheme, but if a pop-up box is used, make sure it doesnt clash (want users to be able to read the details and not be discrated by bright colors)

thoughts: i need to do more research on how a pop-up box could work if thats how you choose to display the show page 



new page:

on screen: input fields for each field of a location 

functionality: ideally i want the address input field to put suggestions to make it easier for users to find it, some fields will be required (and errors output if they arent filled out)

style: also a pretty calm color scheme, but slightly energetic, a few pictures 

thoughts: 




compontents: 

app.js (router) 
landing_page_container: header (has redirect state elements)
land_page_form: form in which user chooses if they want to find or share a spot (sends redirect choices up to container)
index_page_container: header and decoration (fetch for all the locations and passes it down to map componeent)
map_compontent: map that is displayed on page
new_spot_container: header for new spot (has fetch post for adding a new location)
new_spot_form: form with each of the fields, error handeling
show_page: displays each of the fields for a spot if they exist 


controllers:

locations controller: 

index: locations.all 
show: location.find(params[:id])
new: location.new 
create: usual create stuff 


routes: 
need to figure out more depending on how you want the show page to work 

log-in restrictions: 

all users can see: index and landing 
logged in users can: create, edit (their own), maybe delete their own 
if users isnt logged in, maybe hide the create new spot links (if possible) 
