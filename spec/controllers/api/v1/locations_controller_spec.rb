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

  describe "GET#index" do
    it "should return a list of all the movies" do

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

    it "should return an movie with all its attributes" do
      
      get :show, params: {id: location2.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 11
      expect(returned_json["street_address"]).to eq "1 Franklin Park Rd"
      expect(returned_json["city"]).to eq "Boston"
      expect(returned_json["state"]).to eq "MA"
      expect(returned_json["size"]).to eq "large"
      expect(returned_json["description"]).to eq "Decent sized park, long sidewalks going all around"
      expect(returned_json["traffic_level"]).to eq "low"
      expect(returned_json["smoothness"]).to eq 2
      expect(returned_json["lat"].to_f).to eq 42.3031
      expect(returned_json["lng"].to_f).to eq -71.0868
      expect(returned_json["title"]).to eq "Franklin Park"
    end
  end

end