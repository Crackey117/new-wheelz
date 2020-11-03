class Api::V1::LocationsController < ApiController  
  def index
    locations = Location.all
    render json: locations
  end

  def show
    location = Location.find(params[:id])
    render json: location
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

end 