class Api::ReviewsController < ApplicationController
    def index
        @reviews = Review.all
        puts @reviews
        render :index
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            redirect_to api_trail_reviews_url(@review.trail)
        else
            render :new
        end
    end

    # def new
    #     @review = Review.new
    #     render :new
    # end

    def update
        @review = Review.find(paras[:id])
        if @review.update(review_params)
            render :edit
        else
            render :edit
        end
    end

    # def edit
    #     @review = Review.find(params[:id])
    #     render :edit
    # end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
    end

    private
    def review_params
        params.require(:review).permit(:rating, :body, :type, :trail_id, :author_id)
    end
end