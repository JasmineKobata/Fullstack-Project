# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

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
      firstname: 'John', 
      lastname: 'Smith',
      email: 'js@user.io',
      password: 'password'
    )

    User.create!(
      firstname: 'Jane', 
      lastname: 'Brown',
      email: 'jb@user.io',
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
      lat: '37.747422815254055',
      long: '-121.70834166373278'
    )

    park2 = Park.create!(
      name: "Los Vaqueros Reservoir and Watershed",
      description: "Hours: September 7 a.m. to 7 p.m. October 7 a.m. to 6 p.m. Nov. - Feb. 7 a.m. to 5 p.m. March 7 a.m. to 6 p.m. April-August 6 a.m. to 8 p.m.",
      lat: "37.81113167563203",
      long: "-121.74927592246908"
    )

    puts "Creating trail 1..."
    trail1 = park.trails.create!(
      name: "Laughlin Loop Trail",
      difficulty: "Moderate",
      description: "Head out on this 1.9-mile loop trail near Livermore, California. Generally considered a moderately challenging route, it takes an average of 55 min to complete. This is a popular trail for birding, hiking, and mountain biking, but you can still enjoy some solitude during quieter times of day. The best times to visit this trail are April through October. Dogs are welcome, but must be on a leash.",
      length: "1.9",
      time: '55 min',
      elevation: '357',
      lat: '37.747422815254055',
      long: '-121.70834166373278',
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
      lat: '37.747422815254055',
      long: '-121.70834166373278',
      trail_type: "Loop"
    )

    trail3 = park2.trails.create!(
      name: "Badger Pass and Oak Savannah Loop Trail",
      difficulty: "Hard",
      description: "SHORT TERM CLOSURE: This area is temporarily closed due to storm damage.",
      length: '8.0',
      time: '4h 10min',
      elevation: '1811',
      lat: "37.81113167563203",
      long: "-121.74927592246908",
      trail_type: "Loop"
    )

    trail4 = park2.trails.create!(
      name: "Los Vaqueros Dam Trail",
      difficulty: "Moderate",
      description: "SHORT TERM CLOSURE: This area is temporarily closed due to storm damage.",
      length: '2.5',
      time: '1h 36min',
      elevation: '823',
      lat: "37.81113167563203",
      long: "-121.74927592246908",
      trail_type: "Loop"
    )

    trail5 = park2.trails.create!(
      name: "Los Vaqueros Shoreline Loop Trail",
      difficulty: "Moderate",
      description: "SHORT TERM CLOSURE: This area is temporarily closed due to storm damage.",
      length: '8.9',
      time: '3h 20min',
      elevation: '761',
      lat: "37.81113167563203",
      long: "-121.74927592246908",
      trail_type: "Loop"
    )

    trail6 = park2.trails.create!(
      name: "Eagle Ridge and Vista Grande",
      difficulty: "Moderate",
      description: "True to its name, this is a hike of big vistas and wide-open spaces. The loop runs along two ridgetops with superb views of the rolling, blue oak-sprinkled hills around the reservoir and the endless plain of the Central Valley. You will encounter some cattle guards along this trail. Most of this hike is in the sun, so it is a good idea to bring plenty of water and precautions against the sun. ",
      length: '5.3',
      time: '2h 45min',
      elevation: '1158',
      lat: "37.81113167563203",
      long: "-121.74927592246908",
      trail_type: 'Loop'
    )

    puts "Create Review..."
    trail1.reviews.create!(
      rating: '5',
      body: "Pretty trails.",
      author_id: 2
    )

    trail1.reviews.create!(
      rating: '3',
      body: "The view is nice, but the hill is very steep.",
      author_id: 4
    )

    puts "Seed Image 1..."

    # filestr = URI.parse("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-loop-1.jpeg").to_s
    trail1.image.attach(
      # io: URI.open(filestr),
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-loop-1.jpeg"),
      filename: "laughlin-loop-1.jpeg"
    )

    puts "Seed Images 1..."

    (1..4).each do |i|
      trail1.images.attach(
        io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-loop-#{i}.jpeg"),
        filename: "laughlin-loop-#{i}.jpeg"
      )
    end

    puts "Seed Image 2..."

    trail2.image.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-tamcan-brushy-1.jpeg"),
      filename: "laughlin-tamcan-brushy-1.jpeg"
    )

    puts "Seed Images 2..."

    (1..4).each do |i|
      trail2.images.attach(
        io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/laughlin-tamcan-brushy-#{i}.jpeg"),
        filename: "laughlin-loop-#{i}.jpeg"
      )
    end

    trail3.image.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/badgerpass.jpeg"),
      filename: "badgerpass.jpeg"
    )
    trail3.images.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/badgerpass.jpeg"),
      filename: "badgerpass.jpeg"
    )

    trail4.image.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/damtrail.jpeg"),
      filename: "damtrail.jpeg"
    )
    trail4.images.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/damtrail.jpeg"),
      filename: "damtrail.jpeg"
    )

    trail5.image.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/shorelineloop.jpeg"),
      filename: "shorelineloop.jpeg"
    )
    trail5.images.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/shorelineloop.jpeg"),
      filename: "shorelineloop.jpeg"
    )

    trail6.image.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/eagleridge.jpeg"),
      filename: "eagleridge.jpeg"
    )
    trail6.images.attach(
      io: URI.open("https://trailblazer-seeds.s3.us-west-1.amazonaws.com/eagleridge.jpeg"),
      filename: "eagleridge.jpeg"
    )
  
    puts "Done!"
  # end