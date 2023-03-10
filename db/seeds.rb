# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Review.destroy_all
    Trail.destroy_all
    Park.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      firstname: 'Demo', 
      lastname: 'User',
      email: 'demo@user.io',
      password: 'password'
    )

    User.create!(
      firstname: 'Jasmine', 
      lastname: 'Kobata',
      email: 'jk@gmail.com',
      password: 'password'
    )

    puts "Creating parks..."
    park = Park.create!(
      name: 'Brushy Peak Regional Preserve',
      description: "Brushy Peak and the surrounding area has been recognized as sacred by generations of native Californians. It was once home to the Ssaoam people, a tribelet of the Ohlone peoples who lived and traded in the lands surrounding the peak. The park’s open grasslands support a diversity of wildlife, especially ground squirrels and cottontails that are prey for a variety of hawks, and golden eagles. South-facing slopes of the peak host a coastal sage community of plants. Park Hours: Jan 1 – 31: 8am – 5pm; Feb 1 – Mar 12: 8am – 6pm; Mar 13 – Apr 17: 8am – 7pm; Apr 18 – Sep 5: 8am – 8pm; Sep 6 – Nov 5: 8am – 7pm; Nov 6 – Dec 31: 8am -5pm Fees: None",
      long: '37.747422815254055',
      lat: '-121.70834166373278'
    )

    puts "Creating trail 1..."
    trail1 = park.trails.create!(
      name: "Laughlin Loop Trail",
      difficulty: "Moderate",
      description: "Head out on this 1.9-mile loop trail near Livermore, California. Generally considered a moderately challenging route, it takes an average of 55 min to complete. This is a popular trail for birding, hiking, and mountain biking, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are April through October. Dogs are welcome, but must be on a leash.",
      length: "1.9",
      time: '55 min',
      elevation: '357',
      long: '37.747422815254055',
      lat: '-121.70834166373278',
      trail_type: "Loop"
    )

    puts "Creating trail 2..."
    trail2 = park.trails.create!(
      name: "Laughlin, Tamcan, Brushy Peak Loop",
      difficulty: "Easy",
      description: "Enjoy this 2.0-mile loop trail near Livermore, California. Generally considered an easy route, it takes an average of 54 min to complete. This is a popular trail for birding, hiking, and running, but you can still enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful to visit anytime.",
      length: '2.0',
      time: '54 min',
      elevation: '324',
      long: '37.747422815254055',
      lat: '-121.70834166373278',
      trail_type: "Loop"
    )

    puts "Create Review..."
    trail1.reviews.create!(
      rating: '5',
      body: "Pretty trails.",
      author_id: 1
    )

    trail1.reviews.create!(
      rating: '3',
      body: "test1",
      author_id: 2
    )

    require "open-uri"

    puts "Seed Image 1..."

    trail1.image.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-loop-1.jpeg"),
      filename: "laughlin-loop-1.jpeg",
      content_type: 'image/jpeg'
    )

    puts "Seed Images 1..."

    (1..4).each do |i|
      trail1.images.attach(
        io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-loop-#{i}.jpeg"),
        filename: "laughlin-loop-#{i}.jpeg"
      )
    end

    puts "Seed Image 1..."

    trail2.image.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-tamcan-brushy-1.jpeg"),
      filename: "laughlin-tamcan-brushy-1.jpeg"
    )

    puts "Seed Images 1..."

    (1..4).each do |i|
      trail2.images.attach(
        io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-tamcan-brushy-#{i}.jpeg"),
        filename: "laughlin-loop-#{i}.jpeg"
      )
    end
  
    puts "Done!"
  # end