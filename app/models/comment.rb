class Comment < ApplicationRecord
  belongs_to :location
  validates :body, presence: true
end 