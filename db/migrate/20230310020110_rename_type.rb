class RenameType < ActiveRecord::Migration[7.0]
  def change
    rename_column :trails, :type, :trail_type
  end
end
