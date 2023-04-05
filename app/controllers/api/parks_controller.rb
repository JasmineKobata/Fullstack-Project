class Api::ParksController < ApplicationController
    def index
        puts "HI"
        @parks = Park.all;
        render :index
    end

    def show
        @park = Park.find_by(id: params[:id])
        render :show
    end
end
