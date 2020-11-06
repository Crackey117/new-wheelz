require 'open-uri'
class Api::V1::LocationsController < ApiController 
 
  before_action :authenticate_user!, except: [:index, :show]
  def index
    locations = Location.all
    render json: locations
  end

  def show
    location = Location.find(params[:id])
    render json: {
      location: serialized_data(location, LocationShowSerializer),
      comments: serialized_data(location.comments, CommentSerializer)
    }
  end 

  def create
    new_location = Location.new(location_params)
    if(new_location.street_address && new_location.city && new_location.state)
      street_address = new_location.street_address
      city = new_location.city 
      state = new_location.state 
      street_address_array = street_address.split(" ")
      formatted_address = street_address_array.join("+")
      city_array = city.split(" ")
      formatted_city = city_array.join("+")
      state = new_location.state
      url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{formatted_address},+#{formatted_city},+#{state}&key=#{ENV["GEOCODING_API_KEY"]}"
      data = JSON.load(open(url))
      if(data["status"] != "ZERO_RESULTS")
        new_location.lat = data["results"][0]["geometry"]["location"]["lat"]
        new_location.lng = data["results"][0]["geometry"]["location"]["lng"]
      end 
    end 
    if new_location.save
      render json: new_location
    else
      render json: { errors: new_location.errors }
    end
  end

  def destroy
    location = Location.find(params[:id])
    if location.destroy
      render json: {destroyed: true}
    end
  end 

  private
  def location_params
    params.require(:location).permit([:title, :street_address, :city, :state, :description, :size, :traffic_level, :smoothness])
  end

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end 