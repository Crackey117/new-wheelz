class HomesController < ApplicationController
  before_action :authenticate_user!, only: [:authenticated]
  before_action :authorize_user, only: [:authorized]
  
  def index
  end

  def authenticated
  end

  def authorized
  end 

  private 

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
