class Api::TrailsController < ApplicationController
    def index
        puts "HI2"
        @trails = Trail.all;
        render :index
    end

    def show
        @trail = Trail.find_by(id: params[:id])
        render :show
    end
end
