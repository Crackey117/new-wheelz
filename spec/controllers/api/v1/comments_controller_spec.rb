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
  )}

  let!(:user1) {User.create(
    email: "blah@gmail.com", 
    first_name: "blah",
    last_name: "blah",
    password: "blahblah",
    username: "blah"
  )}
  describe "POST#create" do
    context "when a good request (with body) is made" do
      let!(:good_comment_data) {
        { comment: {body: "Pavement was recently redone!"}, location_id: location2.id, user_id: user1.id}
      }
      it "adds the rating to the database" do
        sign_in user1
        previous_count = Comment.count
        post :create, params: good_comment_data
        new_count = Comment.count
        expect(new_count).to eq previous_count+1
      end

      it "returns the new comment object as json" do
        sign_in user1
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
        { comment: { body: "" }, location_id: location2.id, user_id: user1.id } }
      it "should not should not save to the database" do
        sign_in user1
        previous_count = Comment.count
        post :create, params: bad_comment_data
        new_count = Comment.count
        expect(new_count).to eq previous_count
      end
    
      it "does not successfully create a comment object" do
        sign_in user1
        post :create, params: bad_comment_data
        returned_response = JSON.parse(response.body)
        expect(returned_response["errors"]["body"][0]).to eq "can't be blank"
      end
    end 

    context "when a good request (with body) is made but user isnt signed in" do
      let!(:good_comment_data) {
        { comment: {body: "Pavement was recently redone!"}, location_id: location2.id}
      }
      it "does not add comment to the database" do 
        previous_count = Comment.count
        post :create, params: good_comment_data
        new_count = Comment.count
        expect(new_count).to eq previous_count
      end

      it "does not successfully create a comment object" do
        post :create, params: good_comment_data
        returned_json = JSON.parse(response.body)
        expect(returned_json["error"][0]).to eq "You need to be signed in first"
      end
    end 
  end


  describe "DELETE#destroy" do 
    let!(:good_comment_data) {
      { comment: {body: "Pavement was recently redone!"}, location_id: location2.id, user_id: user1.id}
    }
    let!(:good_comment_data_2) {
      { comment: {body: "Pavement was recently redone!"}, location_id: location2.id, user_id: user1.id}
    }
    it "deletes a location from the database" do
      
      sign_in user1
      post :create, params: good_comment_data 
      post :create, params: good_comment_data_2 
      comment_2_copy = Comment.last 
      previous_count = Comment.count
      Comment.last.destroy 

      new_count = Comment.count
      last_comment = Comment.last 
      expect(new_count).to eq previous_count -1 
      expect(last_comment.id).not_to eq comment_2_copy.id
    end 
  end   
end