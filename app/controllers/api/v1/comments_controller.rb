class Api::V1::CommentsController < ApiController  


  def create
    location = Location.find(params[:location_id])
    new_comment = Comment.new(comment_params)
    new_comment.location = location 
    if new_comment.save
      render json: new_comment  
    else 
      render json: { errors: new_comment.errors}
    end
  end

  private
  def comment_params
    params.require(:comment).permit([:body])
  end

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, each_serializer: serializer)
  end
end 