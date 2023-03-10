class AddNullToReviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :rating
    add_column :reviews, :rating, :integer, null: false
    remove_column :reviews, :body
    add_column :reviews, :body, :text, null: false
    remove_column :reviews, :author_id
    add_reference :reviews, :author, foreign_key: {to_table: :users}, null: false
    remove_column :reviews, :trail_id
    add_reference :reviews, :trail_id, null: false
  end
end
