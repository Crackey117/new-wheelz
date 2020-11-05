class Comment < ApplicationRecord
  belongs_to :location
  belongs_to :user 
  validates :body, presence: true
  validates :user, presence: true
  validates :location, presence: true
end 