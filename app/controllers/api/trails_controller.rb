class Api::TrailsController < ApplicationController
    def index
        @trails = Trail.all;
        render :index
    end

    def show
        @trail = Trail.find_by(id: params[:id])
        render :show
    end
end
