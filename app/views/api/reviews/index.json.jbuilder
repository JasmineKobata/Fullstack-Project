# json.array! @reviews do |review|
    # json.extract! review, :id, :rating, :body, :author_id, :author, :trail_id, :trail, :created_at, :updated_at
# end

@reviews.each do |review|
    json.set! review.id do
        json.extract! review, :id, :rating, :body, :author_id, :author, :trail_id, :trail, :created_at, :updated_at
    end
end