class LocationShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :street_address, :city, :state, :description, :size, :lat, :lng, :traffic_level, :smoothness, :hills

  has_many :comments 
end

