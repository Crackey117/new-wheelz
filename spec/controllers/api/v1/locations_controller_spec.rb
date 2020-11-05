require "rails_helper"

RSpec.describe Api::V1::LocationsController, type: :controller do 

  let!(:location1) {Location.create(
    street_address: "139 Tremont Street", 
    city: "Boston", 
    state: "MA", 
    size: "medium", 
    description: "Park in the middle of downtown. A lot of poeple, but good sidewalk areas.", 
    traffic_level: "very low", 
    smoothness: 3, 
    lat: 42.3554,
    lng: -71.0640, 
    title: "Boston Common"
  )}
  let!(:location2) { Location.create(
    street_address: "1 Franklin Park Rd", 
    city: "Boston", 
    state: "MA", 
    size: "large", 
    description: "Decent sized park, long sidewalks going all around", 
    traffic_level: "low", 
    smoothness: 2, 
    lat: 42.3031, 
    lng: -71.0868, 
    title: "Franklin Park"
  ) }
  let!(:user1) {User.create(
    email: "blah@gmail.com", 
    first_name: "blah",
    last_name: "blah",
    password: "blahblah",
    username: "blah"
  )}
  let!(:user2) {User.create(
    email: "davy.jones@thelocker.com", 
    first_name: "davy",
    last_name: "jones",
    password: "blahblahblah",
    username: "squidguy"
  )}
  let!(:comment1) {Comment.create(
    body: "Great place, would come again!",
    location: location2,
    user: user1
  ) }
  let!(:comment2) {Comment.create(
    body: "Too many people, too thin sidewalks",
    location: location2,
    user: user2
  ) }
  
  describe "GET#index" do
    it "should return a list of all the locations" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      
      expect(returned_json.length).to eq 2
 
      expect(returned_json[0]["street_address"]).to eq "139 Tremont Street"
      expect(returned_json[0]["city"]).to eq "Boston"
      expect(returned_json[0]["state"]).to eq "MA"
      expect(returned_json[0]["description"]).to eq "Park in the middle of downtown. A lot of poeple, but good sidewalk areas."
      expect(returned_json[0]["size"]).to eq "medium"
      expect(returned_json[0]["traffic_level"]).to eq "very low"
      expect(returned_json[0]["smoothness"]).to eq 3
      expect(returned_json[0]["lat"].to_f).to eq 42.3554
      expect(returned_json[0]["lng"].to_f).to eq -71.0640
      expect(returned_json[0]["title"]).to eq "Boston Common"

      expect(returned_json[1]["street_address"]).to eq "1 Franklin Park Rd"
      expect(returned_json[1]["city"]).to eq "Boston"
      expect(returned_json[1]["state"]).to eq "MA"
      expect(returned_json[1]["size"]).to eq "large"
      expect(returned_json[1]["description"]).to eq "Decent sized park, long sidewalks going all around"
      expect(returned_json[1]["traffic_level"]).to eq "low"
      expect(returned_json[1]["smoothness"]).to eq 2
      expect(returned_json[1]["lat"].to_f).to eq 42.3031
      expect(returned_json[1]["lng"].to_f).to eq -71.0868
      expect(returned_json[1]["title"]).to eq "Franklin Park"
    end
  end

  describe "GET#show" do
    
    it "should return an location with all its attributes" do
      sign_in user1
      get :show, params: {id: location2.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 2
      expect(returned_json["location"]["street_address"]).to eq "1 Franklin Park Rd"
      expect(returned_json["location"]["city"]).to eq "Boston"
      expect(returned_json["location"]["state"]).to eq "MA"
      expect(returned_json["location"]["size"]).to eq "large"
      expect(returned_json["location"]["description"]).to eq "Decent sized park, long sidewalks going all around"
      expect(returned_json["location"]["traffic_level"]).to eq "low"
      expect(returned_json["location"]["smoothness"]).to eq 2
      expect(returned_json["location"]["lat"].to_f).to eq 42.3031
      expect(returned_json["location"]["lng"].to_f).to eq -71.0868
      expect(returned_json["location"]["title"]).to eq "Franklin Park"
      
      expect(returned_json["comments"][0]["body"]).to eq "Great place, would come again!"
      expect(returned_json["comments"][1]["body"]).to eq "Too many people, too thin sidewalks"
    end
  end

  describe "POST#create" do
    context "when a request correct params is made" do
      let!(:good_location_data) { { location: {street_address: "139 Tremont Street", city: "Boston", state: "MA", size: "medium", description: "Park in the middle of downtown. A lot of poeple, but good sidewalk areas.", traffic_level: "very low", smoothness: 3, lat: 42.3554, lng: -71.0640, title: "Boston Common"} } }

      it "adds the location to the database" do 
        sign_in user1
        previous_count = Location.count

        post :create, params: good_location_data

        new_count = Location.count

        expect(new_count).to eq previous_count + 1
      end

      it "returns the new location object as json" do
        sign_in user1
        post :create, params: good_location_data

        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json["street_address"]).to eq "139 Tremont Street"
        expect(returned_json["city"]).to eq "Boston"
        expect(returned_json["state"]).to eq "MA"
        expect(returned_json["size"]).to eq "medium"
        expect(returned_json["description"]).to eq "Park in the middle of downtown. A lot of poeple, but good sidewalk areas."
        expect(returned_json["traffic_level"]).to eq "very low"
        expect(returned_json["smoothness"]).to eq 3
        expect(returned_json["lat"].to_f).to eq 42.3554
        expect(returned_json["lng"].to_f).to eq -71.0640
        expect(returned_json["title"]).to eq "Boston Common"
      end
    end

    context "when parameters are not filled out but user is signed in" do
      let!(:bad_location_data) { { location: {street_address: "139 Tremont Street", state: "MA", size: "medium", description: "Park in the middle of downtown. A lot of poeple, but good sidewalk areas.", traffic_level: "very low", smoothness: 3, lat: 42.3554, title: "Boston Common"} } }

      it "should not should not save to the database" do
        sign_in user1
        previous_count = Location.count

        post :create, params: bad_location_data

        new_count = Location.count

        expect(new_count).to eq previous_count
      end

      it "does not successfully create a location object" do
        sign_in user1
        post :create, params: bad_location_data

        returned_response = JSON.parse(response.body)
  
        expect(returned_response["errors"]["city"][0]).to eq "can't be blank"
        expect(returned_response["errors"]["lng"][0]).to eq "can't be blank"
      end
    end
    
    context "when the parameters are correct but user is not signed it" do
      let!(:bad_location_data) { { location: {street_address: "139 Tremont Street", state: "MA", size: "medium", description: "Park in the middle of downtown. A lot of poeple, but good sidewalk areas.", traffic_level: "very low", smoothness: 3, lat: 42.3554, title: "Boston Common"} } }

      it "should not should not save to the database" do
        previous_count = Location.count

        post :create, params: bad_location_data

        new_count = Location.count

        expect(new_count).to eq previous_count
      end

      it "we are redirected to the sign in page" do
        post :create, params: bad_location_data
        
        response_body = response.body
        expect(response.status).to eq 302 
        expect(response_body).to eq "<html><body>You are being <a href=\"http://test.host/users/sign_in\">redirected</a>.</body></html>"
      end
    end
  end

end