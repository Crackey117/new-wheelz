require "rails_helper"

RSpec.describe Api::V1::CurrentLocationController, type: :controller do 
  describe "POST#create" do
    context "when a request correct params is made" do
      let!(:good_current_location_data) { { current_location: {street_address: "139 Tremont Street", city: "Boston", state: "MA"} } }

      it "returns the new location object as json" do
        post :create, params: good_current_location_data

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq("application/json")
        expect(returned_json).to be_kind_of(Hash)
        expect(returned_json).to_not be_kind_of(Array)
        expect(returned_json["lat"].to_f).to eq 42.3554551
        expect(returned_json["lng"].to_f).to eq -71.0638676
      end
    end

    context "when parameters are not filled out" do
      let!(:bad_current_location_data) { { current_location: {street_address: "139 Tremont Street", state: "MA"} } }

      it "does not successfully find a location" do
        post :create, params: bad_current_location_data

        returned_response = JSON.parse(response.body)
        expect(returned_response["lat"].to_f).to eq 0.0
        expect(returned_response["lng"].to_f).to eq 0.0
      end
    end
  end 
end