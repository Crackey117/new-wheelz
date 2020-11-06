class Api::V1::CommentsController < ApiController  
  before_action :authenticate_user, only: [:create]
  before_action :authorize_user, only: [:show, :destroy]
  def show
    comment = Comment.find(params[:id])
    render json: comment
  end 

  def create
    location = Location.find(params[:location_id])
    new_comment = Comment.new(comment_params)
    new_comment.location = location 
    new_comment.user = current_user 
    if new_comment.save
      render json: new_comment  
    else 
      render json: { errors: new_comment.errors}
    end
  end

  def destroy 
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: {destroyed: true}
    end
  end 

  private
  def comment_params
    params.require(:comment).permit([:body])
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end 