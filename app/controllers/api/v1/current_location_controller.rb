class Api::V1::CurrentLocationController < ApiController 
  def create
    new_location = Location.new(location_params)
    lat = ""
    lng = ""
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
        lat = data["results"][0]["geometry"]["location"]["lat"]
        lng = data["results"][0]["geometry"]["location"]["lng"]
      end 
    end 
    position = { lat: lat, lng: lng}
    render json: position

  end

  private
  def location_params
    params.require(:current_location).permit([:street_address, :city, :state])
  end
end 