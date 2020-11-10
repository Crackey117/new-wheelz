class AddHillsToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :hills, :string
  end
end
