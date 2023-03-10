class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :body
      t.bigint :author_id
      t.bigint :trail_id

      t.timestamps
    end
  end
end
