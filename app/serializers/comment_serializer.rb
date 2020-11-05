class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body

  belongs_to :location 
  belongs_to :user 
end
