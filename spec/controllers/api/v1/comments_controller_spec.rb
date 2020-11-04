require "rails_helper"

RSpec.describe Api::V1::CommentsController, type: :controller do 
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
  describe "POST#create" do
    context "when a good request (with body) is made" do
      let!(:good_comment_data) {
        { comment: {body: "Pavement was recently redone!"}, location_id: location2.id}
      }
      it "adds the rating to the database" do
        previous_count = Comment.count

        post :create, params: good_comment_data

        new_count = Comment.count

        expect(new_count).to eq previous_count+1
      end

      it "returns the new comment object as json" do
        post :create, params: good_comment_data

        returned_json = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(response.content_type).to eq ("application/json") 
        expect(returned_json). to be_kind_of(Hash) 
        expect(returned_json).to_not be_kind_of(Array) 
        expect(returned_json["body"]).to eq "Pavement was recently redone!"
      end
    end 
    
    context "when a bad request is made" do
      let!(:bad_comment_data) {
        { comment: { body: "" }, location_id: location2.id } }
      it "should not should not save to the database" do
        previous_count = Comment.count

        post :create, params: bad_comment_data

        new_count = Comment.count

        expect(new_count).to eq previous_count
      end
    
      it "does not successfully create a comment object" do
        post :create, params: bad_comment_data

        returned_response = JSON.parse(response.body)

        expect(returned_response["errors"]["body"][0]).to eq "can't be blank"
      end
    end 
  end
end