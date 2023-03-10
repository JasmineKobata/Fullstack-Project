class RemoveReviewsTrailIndex < ActiveRecord::Migration[7.0]
  def change
    remove_index :reviews, :trail_id
  end
end
