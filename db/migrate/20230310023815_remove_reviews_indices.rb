class RemoveReviewsIndices < ActiveRecord::Migration[7.0]
  def change
    rename_column :reviews, :trail_id_id, :trail_id
    remove_index :reviews, :author_id
  end
end
