class Location < ApplicationRecord
  validates :street_address, presence: true 
  validates :city, presence: true
  validates :state, presence: true
  validates :lat, presence: true
  validates :lng, presence: true
  validates :size, presence: true
  validates :description, presence: true

end