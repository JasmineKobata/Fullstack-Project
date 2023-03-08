class Review < ApplicationRecord
    validates :rating, :body, :author_id, :trail_id, presence: true
    belongs_to :trail
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
end
