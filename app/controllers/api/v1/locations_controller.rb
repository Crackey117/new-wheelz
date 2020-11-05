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
    if new_location.save
      render json: new_location
    else
      render json: { errors: new_location.errors }
    end
  end

  private
  def location_params
    params.require(:location).permit([:title, :street_address, :city, :state, :description, :size, :lat, :lng, :traffic_level, :smoothness])
  end

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer, scope: current_user)
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end 